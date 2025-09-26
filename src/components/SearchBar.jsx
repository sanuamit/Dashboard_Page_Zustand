import React from 'react'
import { useStore } from '../store'

export default function SearchBar() {
  const q = useStore(s => s.searchQuery)
  const setQ = useStore(s => s.setSearchQuery)

  return (
    <input
      className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 w-72 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      placeholder="Search widgets..."
      value={q}
      onChange={e => setQ(e.target.value)}
    />
  )
}
