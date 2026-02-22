import { ref } from 'vue'

const STORAGE_KEY = 'pikmin-mushrooms'

export function useStorage() {
  const items = ref(load())

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function addItem(secondsUntilKill) {
    const killTs = Date.now() + secondsUntilKill * 1000
    const respawnTs = killTs + 5 * 60_000
    items.value.push({
      id: Date.now(),
      killTs,
      respawnTs,
    })
    save()
  }

  function toggleDelete(id) {
    const item = items.value.find((item) => item.id === id)
    if (item) {
      item.deleted = !item.deleted
      save()
    }
  }

  return { items, addItem, toggleDelete }
}
