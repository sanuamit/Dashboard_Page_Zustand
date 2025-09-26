import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import initialData from './data.json'

export const useStore = create((set) => ({
  widgets: initialData.widgets,
  categories: initialData.categories,
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  addWidget: (categoryId, name, text) => {
    const id = uuidv4()
    const widget = { id, name, text }
    set((s) => ({
      widgets: { ...s.widgets, [id]: widget },
      categories: {
        ...s.categories,
        [categoryId]: {
          ...s.categories[categoryId],
          widgetIds: [...s.categories[categoryId].widgetIds, id]
        }
      }
    }))
  },

  removeWidgetFromCategory: (categoryId, widgetId) => {
    set((s) => ({
      categories: {
        ...s.categories,
        [categoryId]: {
          ...s.categories[categoryId],
          widgetIds: s.categories[categoryId].widgetIds.filter((w) => w !== widgetId)
        }
      }
    }))
  },

  toggleWidgetCategory: (widgetId, categoryId, checked) => {
    set((s) => {
      const cat = s.categories[categoryId]
      const inCat = cat.widgetIds.includes(widgetId)
      const newIds = checked
        ? (inCat ? cat.widgetIds : [...cat.widgetIds, widgetId])
        : cat.widgetIds.filter((w) => w !== widgetId)
      return {
        categories: {
          ...s.categories,
          [categoryId]: { ...cat, widgetIds: newIds }
        }
      }
    })
  }
}))
