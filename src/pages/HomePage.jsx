import { useEffect, useMemo, useRef, useState } from 'react'
import { Disc3, Radio, Waves } from 'lucide-react'
import CommentDrawer from '../components/CommentDrawer'
import HeroSection from '../components/HeroSection'
import PlayerBar from '../components/PlayerBar'
import PlaylistPanel from '../components/PlaylistPanel'
import SectionHeader from '../components/SectionHeader'
import TrackCard from '../components/TrackCard'
import {
  addTrackComment,
  addTrackToPlaylist,
  createPlaylist,
  getDashboardData,
  removeTrackFromPlaylist,
  togglePlaylistLike,
  toggleTrackLike,
} from '../services/api'
import { formatLargeNumber } from '../utils/formatters'

const defaultStats = [
  { icon: Disc3, label: 'Curated Tracks', value: '0' },
  { icon: Radio, label: 'Playlist Moments', value: '0' },
  { icon: Waves, label: 'Total Streams', value: '0' },
]

function HomePage() {
  const audioRef = useRef(null)
  const [tracks, setTracks] = useState([])
  const [recommended, setRecommended] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [volume, setVolume] = useState(0.65)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playlistDraft, setPlaylistDraft] = useState('')
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [commentDraft, setCommentDraft] = useState('')
  const [highlightedTrack, setHighlightedTrack] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await getDashboardData(searchTerm)
        setTracks(data.tracks)
        setRecommended(data.recommended)
        setPlaylists(data.playlists)
        setGenres(data.genres)
        if (!currentTrack && data.tracks.length) {
          setCurrentTrack(data.tracks[0])
        }
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = window.setTimeout(loadData, 250)
    return () => window.clearTimeout(timeoutId)
  }, [searchTerm])

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    audioRef.current.src = currentTrack.audioUrl
    audioRef.current.load()
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  const handleAdvanceTrack = () => {
    const allTracks = [...tracks, ...recommended.filter((track) => !tracks.some((item) => item._id === track._id))]
    if (!allTracks.length || !currentTrack) return
    const currentIndex = allTracks.findIndex((track) => track._id === currentTrack._id)
    if (currentIndex === -1) return

    const nextIndex = shuffle
      ? Math.floor(Math.random() * allTracks.length)
      : (currentIndex + 1) % allTracks.length

    setCurrentTrack(allTracks[nextIndex])
    setIsPlaying(true)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedData = () => setDuration(audio.duration || currentTrack?.duration || 0)
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play()
        return
      }

      handleAdvanceTrack()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, repeat, shuffle, tracks, recommended])

  const visibleTracks = useMemo(() => {
    const collection = searchTerm ? tracks : recommended
    if (activeGenre === 'All') return collection
    return collection.filter((track) => track.genre === activeGenre)
  }, [activeGenre, recommended, searchTerm, tracks])

  const mergedTracks = useMemo(() => {
    const map = new Map()
    ;[...tracks, ...recommended].forEach((track) => {
      map.set(track._id, track)
    })
    return Array.from(map.values())
  }, [tracks, recommended])

  const stats = useMemo(() => {
    if (!mergedTracks.length) return defaultStats

    return [
      {
        icon: Disc3,
        label: 'Curated Tracks',
        value: `${mergedTracks.length}`,
      },
      {
        icon: Radio,
        label: 'Playlist Moments',
        value: `${playlists.length}`,
      },
      {
        icon: Waves,
        label: 'Total Streams',
        value: formatLargeNumber(
          mergedTracks.reduce((total, track) => total + track.streams, 0),
        ),
      },
    ]
  }, [mergedTracks, playlists.length])

  const syncTrackAcrossState = (updatedTrack) => {
    setTracks((prev) => prev.map((track) => (track._id === updatedTrack._id ? updatedTrack : track)))
    setRecommended((prev) =>
      prev.map((track) => (track._id === updatedTrack._id ? updatedTrack : track)),
    )
    setSelectedTrack((prev) => (prev?._id === updatedTrack._id ? updatedTrack : prev))
    setCurrentTrack((prev) => (prev?._id === updatedTrack._id ? updatedTrack : prev))
    setHighlightedTrack((prev) => (prev?._id === updatedTrack._id ? updatedTrack : prev))
  }

  const handlePlayTrack = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setHighlightedTrack(track)
  }

  const handleTogglePlay = () => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    audioRef.current.play().catch(() => {
      setIsPlaying(false)
    })
    setIsPlaying(true)
  }

  const handlePreviousTrack = () => {
    if (!mergedTracks.length || !currentTrack) return
    const currentIndex = mergedTracks.findIndex((track) => track._id === currentTrack._id)
    const previousIndex = currentIndex <= 0 ? mergedTracks.length - 1 : currentIndex - 1
    setCurrentTrack(mergedTracks[previousIndex])
    setIsPlaying(true)
  }

  const handleSeek = (value) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = value
    setCurrentTime(value)
  }

  const handleTrackLike = async (trackId) => {
    const updatedTrack = await toggleTrackLike(trackId)
    syncTrackAcrossState(updatedTrack)
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    if (!selectedTrack || !commentDraft.trim()) return

    const updatedTrack = await addTrackComment(selectedTrack._id, {
      user: 'You',
      content: commentDraft.trim(),
    })
    setCommentDraft('')
    syncTrackAcrossState(updatedTrack)
  }

  const handleCreatePlaylist = async () => {
    if (!playlistDraft.trim()) return
    const newPlaylist = await createPlaylist({ name: playlistDraft.trim() })
    setPlaylists((prev) => [newPlaylist, ...prev])
    setPlaylistDraft('')
  }

  const handleAddTrackToPlaylist = async (track) => {
    if (!track) return
    setHighlightedTrack(track)
    if (!playlists.length) return

    const updatedPlaylist = await addTrackToPlaylist(playlists[0]._id, track._id)
    setPlaylists((prev) =>
      prev.map((playlist) => (playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist)),
    )
  }

  const handleRemoveTrackFromPlaylist = async (playlistId, trackId) => {
    const updatedPlaylist = await removeTrackFromPlaylist(playlistId, trackId)
    setPlaylists((prev) =>
      prev.map((playlist) => (playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist)),
    )
  }

  const handleTogglePlaylistLike = async (playlistId) => {
    const updatedPlaylist = await togglePlaylistLike(playlistId)
    setPlaylists((prev) =>
      prev.map((playlist) => (playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist)),
    )
  }

  return (
    <main className="relative px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <HeroSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeGenre={activeGenre}
          onGenreChange={setActiveGenre}
          genres={genres}
        />

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <item.icon className="mb-4 h-10 w-10 rounded-2xl bg-white/10 p-2 text-orange-200" />
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Fresh rotation"
              title={searchTerm ? 'Search Results' : 'Recommended Tracks'}
              description="Browse high-energy anthems, soft-focus instrumentals, and soundtrack picks with fast actions for likes, comments, downloads, and playlists."
            />

            {loading ? (
              <div className="grid gap-5 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[420px] animate-pulse rounded-[28px] border border-white/10 bg-white/5"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {visibleTracks.map((track) => (
                  <TrackCard
                    key={track._id}
                    track={track}
                    isCurrent={currentTrack?._id === track._id}
                    onPlay={handlePlayTrack}
                    onLike={handleTrackLike}
                    onQueueToPlaylist={handleAddTrackToPlaylist}
                    onOpenComments={setSelectedTrack}
                  />
                ))}
              </div>
            )}
          </div>

          <PlaylistPanel
            playlists={playlists}
            tracks={mergedTracks}
            draftName={playlistDraft}
            onDraftNameChange={setPlaylistDraft}
            onCreatePlaylist={handleCreatePlaylist}
            onToggleLike={handleTogglePlaylistLike}
            onRemoveTrack={handleRemoveTrackFromPlaylist}
            highlightedTrack={highlightedTrack}
            onAddHighlightedTrack={() => handleAddTrackToPlaylist(highlightedTrack)}
          />
        </section>

        <PlayerBar
          track={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          shuffle={shuffle}
          repeat={repeat}
          onTogglePlay={handleTogglePlay}
          onPrev={handlePreviousTrack}
          onNext={handleAdvanceTrack}
          onSeek={handleSeek}
          onVolumeChange={setVolume}
          onToggleShuffle={() => setShuffle((prev) => !prev)}
          onToggleRepeat={() => setRepeat((prev) => !prev)}
        />
      </div>

      <audio ref={audioRef} preload="metadata" />

      <CommentDrawer
        track={selectedTrack}
        draftComment={commentDraft}
        onDraftChange={setCommentDraft}
        onSubmit={handleSubmitComment}
        onClose={() => setSelectedTrack(null)}
      />
    </main>
  )
}

export default HomePage
