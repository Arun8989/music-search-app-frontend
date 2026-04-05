import { Heart, ListMusic, Plus, Trash2 } from 'lucide-react'

function PlaylistPanel({
  playlists,
  tracks,
  draftName,
  onDraftNameChange,
  onCreatePlaylist,
  onToggleLike,
  onRemoveTrack,
  highlightedTrack,
  onAddHighlightedTrack,
}) {
  return (
    <div className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/45 p-6 backdrop-blur">
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-white">Playlist Studio</h3>
        <p className="text-sm text-slate-400">
          Create focused sets for workouts, coding sessions, or late-night listening.
        </p>
        <div className="flex gap-3">
          <input
            value={draftName}
            onChange={(event) => onDraftNameChange(event.target.value)}
            placeholder="Create a new playlist"
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
          />
          <button
            type="button"
            onClick={onCreatePlaylist}
            className="inline-flex items-center gap-2 rounded-2xl bg-orange-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-orange-300"
          >
            <Plus className="h-4 w-4" />
            Create
          </button>
        </div>
        {highlightedTrack ? (
          <button
            type="button"
            onClick={onAddHighlightedTrack}
            className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-green-400/10 px-4 py-2 text-sm text-green-100 transition hover:bg-green-400/20"
          >
            <ListMusic className="h-4 w-4" />
            Add "{highlightedTrack.title}" to first playlist
          </button>
        ) : null}
      </div>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <article key={playlist._id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{playlist.name}</h4>
                <p className="mt-1 text-sm text-slate-400">{playlist.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onToggleLike(playlist._id)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
              >
                <Heart className={`h-4 w-4 ${playlist.liked ? 'fill-current text-rose-400' : ''}`} />
                {playlist.likes}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {playlist.trackIds.length ? (
                playlist.trackIds.map((trackId) => {
                  const track = tracks.find((item) => item._id === trackId)
                  if (!track) return null

                  return (
                    <div
                      key={`${playlist._id}-${trackId}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{track.title}</p>
                        <p className="text-xs text-slate-400">{track.artist}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveTrack(playlist._id, trackId)}
                        className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-rose-300/40 hover:text-rose-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })
              ) : (
                <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">
                  No songs yet. Use “Add to Playlist” on a track card to start building.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PlaylistPanel
