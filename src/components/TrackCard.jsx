import { Download, Heart, MessageCircle, Music2, Play, Share2 } from 'lucide-react'
import { formatDuration, formatLargeNumber } from '../utils/formatters'

function TrackCard({
  track,
  isCurrent,
  onPlay,
  onLike,
  onQueueToPlaylist,
  onOpenComments,
}) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(track.audioUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Listening to ${track.title} by ${track.artist}`)}&url=${encodeURIComponent(track.audioUrl)}`,
    instagram: 'https://www.instagram.com/',
  }

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-orange-300/40 hover:bg-white/8">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={track.coverImage}
          alt={track.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <button
          type="button"
          onClick={() => onPlay(track)}
          className={`absolute bottom-4 right-4 inline-flex h-14 w-14 items-center justify-center rounded-full transition ${
            isCurrent ? 'bg-orange-400 text-slate-950' : 'bg-white/90 text-slate-950 hover:bg-orange-300'
          }`}
        >
          <Play className="h-5 w-5 fill-current" />
        </button>
        <div className="absolute left-4 top-4 rounded-full bg-slate-950/65 px-3 py-1 text-xs tracking-[0.3em] text-slate-200 backdrop-blur">
          {track.genre}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold text-white">{track.title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {track.artist} • {track.album} • {track.movie}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>{formatDuration(track.duration)}</span>
          <span>{formatLargeNumber(track.streams)} streams</span>
          <span>{track.quality}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onLike(track._id)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-rose-300/40 hover:text-rose-200"
          >
            <Heart className={`h-4 w-4 ${track.liked ? 'fill-current text-rose-400' : ''}`} />
            {track.likes}
          </button>
          <button
            type="button"
            onClick={() => onOpenComments(track)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-orange-300/40 hover:text-orange-100"
          >
            <MessageCircle className="h-4 w-4" />
            {track.comments.length}
          </button>
          <button
            type="button"
            onClick={() => onQueueToPlaylist(track)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-green-300/40 hover:text-green-100"
          >
            <Music2 className="h-4 w-4" />
            Add to Playlist
          </button>
          <a
            href={track.audioUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/40 hover:text-sky-100"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Share2 className="h-4 w-4" />
          <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
            Facebook
          </a>
          <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white">
            Twitter
          </a>
          <a href={shareLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
            Instagram
          </a>
        </div>
      </div>
    </article>
  )
}

export default TrackCard
