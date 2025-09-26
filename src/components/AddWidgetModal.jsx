import React, { useState } from 'react'
import { useStore } from '../store'

export default function AddWidgetModal({ categoryId, onClose }) {
  const add = useStore(s => s.addWidget)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-[400px] border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Add Widget</h3>
        <div className="flex flex-col gap-3">
          <input
            className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none"
            placeholder="Widget name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none min-h-[80px]"
            placeholder="Widget text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600" onClick={onClose}>Cancel</button>
            <button
              className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400"
              onClick={() => { add(categoryId, name || 'Untitled', text || '...'); onClose() }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
