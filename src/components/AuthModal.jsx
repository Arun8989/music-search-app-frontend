import { LogIn, UserPlus, X } from 'lucide-react'

function AuthModal({
  isOpen,
  mode,
  form,
  error,
  isSubmitting,
  onModeChange,
  onFormChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null

  const isRegister = mode === 'register'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">Account access</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {isRegister ? 'Create your account' : 'Sign in to continue'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isRegister
                ? 'Register to manage playlists, like tracks, and join the conversation.'
                : 'Sign in to unlock playlist actions, likes, and comments.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => onModeChange('login')}
            className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
              !isRegister ? 'bg-white text-slate-950' : 'text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onModeChange('register')}
            className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
              isRegister ? 'bg-orange-400 text-slate-950' : 'text-slate-300'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {isRegister ? (
            <input
              value={form.name}
              onChange={(event) => onFormChange('name', event.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
            />
          ) : null}
          <input
            type="email"
            value={form.email}
            onChange={(event) => onFormChange('email', event.target.value)}
            placeholder="Email address"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => onFormChange('password', event.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
          />

          {error ? (
            <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-400 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRegister ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {isSubmitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          Demo account: <span className="text-slate-300">demo@musicapp.com</span> /{' '}
          <span className="text-slate-300">demo1234</span>
        </p>
      </div>
    </div>
  )
}

export default AuthModal
