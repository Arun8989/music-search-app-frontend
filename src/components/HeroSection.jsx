import { Headphones, Sparkles, TrendingUp } from 'lucide-react'
import SearchBar from './SearchBar'

function HeroSection({ searchTerm, onSearchChange, activeGenre, onGenreChange, genres }) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.28),rgba(15,23,42,0.92),rgba(34,197,94,0.2))] p-8 shadow-2xl shadow-black/30">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_60%)] lg:block" />
      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-orange-100">
            <Sparkles className="h-4 w-4" />
            Curated for every mood
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              Stream bold sounds, save favorites, and shape playlists that feel personal.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-200/80 md:text-lg">
              Discover cinematic scores, indie drops, and late-night lofi in one immersive player
              with downloads, likes, comments, and custom playback controls.
            </p>
          </div>
          <SearchBar value={searchTerm} onChange={onSearchChange} />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onGenreChange('All')}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeGenre === 'All'
                  ? 'bg-white text-slate-950'
                  : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => onGenreChange(genre)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeGenre === genre
                    ? 'bg-orange-400 text-slate-950'
                    : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              icon: Headphones,
              label: 'Adaptive Streaming',
              text: 'Smooth playback with adjustable volume, repeat, and shuffle controls.',
            },
            {
              icon: TrendingUp,
              label: 'Hot Picks',
              text: 'Recommended tracks based on mood, genre, and listener momentum.',
            },
            {
              icon: Sparkles,
              label: 'Playlist Studio',
              text: 'Create custom playlists and keep your best discoveries close.',
            },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-white/10 bg-slate-950/35 p-5 backdrop-blur"
            >
              <item.icon className="mb-4 h-9 w-9 rounded-2xl bg-white/10 p-2 text-orange-200" />
              <h2 className="text-lg font-semibold text-white">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
