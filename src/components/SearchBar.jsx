import { Search } from 'lucide-react'

function SearchBar({ value, onChange }) {
  return (
    <label className="relative flex items-center">
      <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by song, artist, album, or movie"
        className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-orange-400 focus:bg-white/8"
      />
    </label>
  )
}

export default SearchBar
