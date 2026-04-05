import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'

function PlayerBar({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  shuffle,
  repeat,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
}) {
  if (!track) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="sticky bottom-0 z-30 mt-8 rounded-[28px] border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <img src={track.coverImage} alt={track.title} className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">{track.title}</p>
            <p className="truncate text-sm text-slate-400">{track.artist}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onToggleShuffle}
              className={`rounded-full p-2 ${shuffle ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button type="button" onClick={onPrev} className="rounded-full p-2 text-slate-300 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onTogglePlay}
              className="rounded-full bg-orange-400 p-4 text-slate-950 transition hover:bg-orange-300"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button type="button" onClick={onNext} className="rounded-full p-2 text-slate-300 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onToggleRepeat}
              className={`rounded-full p-2 ${repeat ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-xs text-slate-400">{Math.floor(currentTime)}s</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(event) => onSeek(Number(event.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-orange-400"
              style={{ backgroundSize: `${progress}% 100%` }}
            />
            <span className="w-12 text-right text-xs text-slate-400">{Math.floor(duration)}s</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Volume2 className="h-4 w-4" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-white/10 accent-green-400"
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerBar
