import React, { useState } from 'react'
import { useStore } from '../store'
import WidgetCard from './WidgetCard'
import AddWidgetModal from './AddWidgetModal'

export default function CategoryPanel() {
  const categoriesObj = useStore(s => s.categories)
  const widgets = useStore(s => s.widgets)
  const categories = Object.values(categoriesObj)
  const [openFor, setOpenFor] = useState(null)

  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <div key={cat.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold">{cat.name}</h4>
            <div className="flex gap-3 items-center">
              <button
                className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-900 font-medium hover:bg-emerald-400"
                onClick={() => setOpenFor(cat.id)}
              >
                + Add Widget
              </button>
              <span className="text-sm text-slate-400">Widgets: {cat.widgetIds.length}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {cat.widgetIds.map(id => (
              <WidgetCard key={id} widget={widgets[id]} />
            ))}
            {cat.widgetIds.length === 0 && <div className="text-sm text-slate-500">No widgets in this category.</div>}
          </div>

          {openFor === cat.id && <AddWidgetModal categoryId={cat.id} onClose={() => setOpenFor(null)} />}
        </div>
      ))}
    </div>
  )
}
