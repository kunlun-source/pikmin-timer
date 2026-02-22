import { ref, computed } from 'vue'

const messages = {
  'zh-TW': {
    title: '🍄 蘑菇重生計時器',
    invalidFormat: '格式錯誤（分 > 59 或秒 > 59）',
    placeholder: '剩餘時間（如 530 = 5分30秒）',
    add: '新增',
    killTime: '消滅時間',
    respawnTime: '重生時間',
    countdown: '倒數計時',
    action: '操作',
    emptyHint: '尚無紀錄，輸入剩餘時間開始追蹤 🍄',
    respawned: '已重生！',
    minSec: '{m} 分 {s} 秒',
    secOnly: '{s} 秒',
    delete: '刪除',
    undo: '復原',
  },
  en: {
    title: '🍄 Mushroom Respawn Timer',
    invalidFormat: 'Invalid (min > 59 or sec > 59)',
    placeholder: 'Time left (e.g. 530 = 5m30s)',
    add: 'Add',
    killTime: 'Kill Time',
    respawnTime: 'Respawn',
    countdown: 'Countdown',
    action: 'Action',
    emptyHint: 'No records. Enter time to start tracking 🍄',
    respawned: 'Respawned!',
    minSec: '{m}m {s}s',
    secOnly: '{s}s',
    delete: 'Delete',
    undo: 'Undo',
  },
}

function detectLocale() {
  const saved = localStorage.getItem('pikmin-locale')
  if (saved && messages[saved]) return saved
  const lang = navigator.language || ''
  return lang.includes('zh') ? 'zh-TW' : 'en'
}

const locale = ref(detectLocale())

function t(key, params) {
  let str = messages[locale.value]?.[key] ?? messages['zh-TW'][key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, v)
    }
  }
  return str
}

function toggleLocale() {
  locale.value = locale.value === 'zh-TW' ? 'en' : 'zh-TW'
  localStorage.setItem('pikmin-locale', locale.value)
}

export function useI18n() {
  return { locale, t, toggleLocale }
}
