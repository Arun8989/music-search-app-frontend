import { LockKeyhole, SendHorizonal, X } from 'lucide-react'

function CommentDrawer({
  track,
  draftComment,
  isAuthenticated,
  onDraftChange,
  onSubmit,
  onClose,
  onRequireAuth,
}) {
  if (!track) return null

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">Comments</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{track.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{track.artist}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 space-y-4 overflow-y-auto pb-40">
        {track.comments.map((comment) => (
          <article key={comment._id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">{comment.user}</p>
              <span className="text-xs text-slate-500">{comment.createdAtLabel}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{comment.content}</p>
          </article>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-slate-950/98 p-6"
      >
        <div className="flex gap-3">
          <textarea
            value={draftComment}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={isAuthenticated ? 'Add your thoughts on this track...' : 'Sign in to add a comment'}
            rows={3}
            disabled={!isAuthenticated}
            className="flex-1 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
          />
          {isAuthenticated ? (
            <button
              type="submit"
              className="self-end rounded-2xl bg-orange-400 p-3 text-slate-950 transition hover:bg-orange-300"
            >
              <SendHorizonal className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onRequireAuth}
              className="self-end rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-100 transition hover:bg-white/10"
            >
              <LockKeyhole className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>
    </aside>
  )
}

export default CommentDrawer
