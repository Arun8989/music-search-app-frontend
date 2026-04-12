import { SlidersHorizontal } from 'lucide-react'

function MoodFilter({ moods, activeMood, onMoodChange }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-green-300/80">Mood mixer</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Tune discovery by mood</h2>
          <p className="mt-2 text-sm text-slate-400">
            Combine mood filters with search and genres to discover tracks faster.
          </p>
        </div>
        <SlidersHorizontal className="hidden h-10 w-10 rounded-2xl bg-white/10 p-2 text-green-200 md:block" />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onMoodChange('All')}
          className={`rounded-full px-4 py-2 text-sm transition ${
            activeMood === 'All'
              ? 'bg-green-300 text-slate-950'
              : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
          }`}
        >
          All moods
        </button>
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onMoodChange(mood)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeMood === mood
                ? 'bg-green-300 text-slate-950'
                : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </section>
  )
}

export default MoodFilter
