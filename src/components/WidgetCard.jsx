import React from 'react'
import { useStore } from '../store'

export default function WidgetCard({ widget }) {
  const remove = useStore(s => s.removeWidgetFromCategory)

  const handleRemove = () => {
    const cats = useStore.getState().categories
    Object.values(cats).forEach(c => {
      if (c.widgetIds.includes(widget.id)) {
        remove(c.id, widget.id)
      }
    })
  }

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 min-w-[220px] shadow-md">
      <div className="flex justify-between items-center">
        <strong className="text-slate-100">{widget.name}</strong>
        <button
          className="text-red-400 hover:text-red-300 font-bold"
          title="Remove"
          onClick={handleRemove}
        >
          ×
        </button>
      </div>
      <p className="text-sm text-slate-400 mt-2">{widget.text}</p>
    </div>
  )
}
