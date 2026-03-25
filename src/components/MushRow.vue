<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const props = defineProps({
  item: { type: Object, required: true },
  now: { type: Number, required: true },
})
const emit = defineEmits(['toggle-delete'])

function formatTime(ts) {
  const d = new Date(ts)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

const killLabel = computed(() => formatTime(props.item.killTs))
const respawnLabel = computed(() => formatTime(props.item.respawnTs))

const remainMs = computed(() => props.item.respawnTs - props.now)

const countdownLabel = computed(() => {
  const ms = remainMs.value
  if (ms <= 0) return t('respawned')
  const totalSec = Math.ceil(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  const secStr = String(sec).padStart(2, '0')
  if (min > 0) return t('minSec', { m: String(min).padStart(2, '\u2007'), s: secStr })
  return t('secOnly', { s: secStr })
})

const countdownClass = computed(() => {
  if (props.item.deleted) return 'respawned'
  const ms = remainMs.value
  if (ms <= 0) return 'respawned'
  if (ms <= 10_000) return 'critical'
  if (ms <= 60_000) return 'warning'
  return 'normal'
})

const isExpanding = computed(() => {
  if (props.item.deleted) return false
  const ms = remainMs.value
  return ms > 0 && ms <= 60_000
})
</script>

<template>
  <tr :class="['mush-row', countdownClass, { deleted: item.deleted, expanding: isExpanding }]">
    <td>{{ killLabel }}</td>
    <td>{{ respawnLabel }}</td>
    <td class="countdown" :class="countdownClass">{{ item.deleted ? '—' : countdownLabel }}</td>
    <td>
      <button
        :class="item.deleted ? 'undo-btn' : 'delete-btn'"
        @click="emit('toggle-delete', item.id)"
      >
        {{ item.deleted ? t('undo') : t('delete') }}
      </button>
    </td>
  </tr>
</template>

<style scoped>
.mush-row td {
  padding: 10px 12px;
  border-bottom: 1px solid #333;
  text-align: center;
  line-height: 1.4;
  transition: opacity 0.3s, padding 5s ease-out, font-size 5s ease-out;
}

.mush-row.expanding td {
  padding: 55px 12px;
  font-size: 1.6em;
}

.mush-row.expanding {
  outline: 2px solid #f5a623;
}

.mush-row.deleted td {
  text-decoration: line-through;
  text-decoration-color: #888;
  opacity: 0.4;
}

.mush-row.deleted td:last-child {
  text-decoration: none;
  opacity: 0.7;
}

.countdown {
  font-variant-numeric: tabular-nums;
  min-width: 120px;
}

.countdown.normal {
  color: #ccc;
}

.countdown.warning {
  color: #f5a623;
  font-size: 1.15em;
  font-weight: bold;
}

.countdown.critical {
  color: #ff3b3b;
  font-size: 1.3em;
  font-weight: bold;
  animation: blink 0.5s ease-in-out infinite alternate;
}

.countdown.respawned {
  color: #4cdf6b;
  font-weight: bold;
}

.mush-row.respawned:not(.deleted) {
  opacity: 0.65;
}

@keyframes blink {
  from { opacity: 1; }
  to { opacity: 0.3; }
}

.delete-btn {
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 5px 14px;
  cursor: pointer;
  font-size: 0.9em;
  line-height: 1.4;
  min-width: 56px;
}

.delete-btn:active {
  background: #cc0000;
}

.undo-btn {
  background: #666;
  color: #ddd;
  border: none;
  border-radius: 6px;
  padding: 5px 14px;
  cursor: pointer;
  font-size: 0.9em;
  line-height: 1.4;
  min-width: 56px;
}

.undo-btn:active {
  background: #888;
}
</style>
