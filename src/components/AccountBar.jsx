import { LockKeyhole, LogOut } from 'lucide-react'

function AccountBar({ currentUser, statusMessage, onOpenAuth, onLogout }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">Session</p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          {currentUser ? `Welcome back, ${currentUser.name}` : 'Sign in to unlock protected actions'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {statusMessage ||
            (currentUser
              ? 'You can now like tracks, comment, and create playlists.'
              : 'Authentication is now required for likes, comments, and playlist changes.')}
        </p>
      </div>

      {currentUser ? (
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenAuth}
          className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-orange-300"
        >
          <LockKeyhole className="h-4 w-4" />
          Sign In / Register
        </button>
      )}
    </div>
  )
}

export default AccountBar
