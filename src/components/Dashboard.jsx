import React from 'react'
import CategoryPanel from './CategoryPanel'
import SearchBar from './SearchBar'
import { useStore } from '../store'

export default function Dashboard() {
  const q = useStore(s => s.searchQuery)
  const widgets = useStore(s => s.widgets)
  const categoriesObj = useStore(s => s.categories)
  const categories = Object.values(categoriesObj)

  const allWidgets = Object.values(widgets).filter(w =>
    w.name.toLowerCase().includes(q.toLowerCase()) ||
    w.text.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <SearchBar />
      </div>

      {q ? (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h4 className="text-lg font-semibold mb-3">Search Results ({allWidgets.length})</h4>
          <div className="flex flex-wrap gap-3">
            {allWidgets.map(w => (
              <div key={w.id} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 min-w-[200px]">
                <strong className="text-slate-100">{w.name}</strong>
                <p className="text-sm text-slate-400">{w.text}</p>
              </div>
            ))}
            {allWidgets.length === 0 && <div className="text-sm text-slate-500">No results</div>}
          </div>
        </div>
      ) : (
        <CategoryPanel />
      )}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-3">Manage Widget Category Assignment</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(widgets).map(w => (
            <div key={w.id} className="p-3 border border-slate-700 rounded-lg">
              <strong>{w.name}</strong>
              <div className="text-sm text-slate-400">Assign to categories:</div>
              {categories.map(c => (
                <label key={c.id} className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={c.widgetIds.includes(w.id)}
                    onChange={e => useStore.getState().toggleWidgetCategory(w.id, c.id, e.target.checked)}
                    className="accent-emerald-500"
                  />
                  {c.name}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
