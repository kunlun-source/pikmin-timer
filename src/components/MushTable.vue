<script setup>
import { ref, computed } from 'vue'
import MushRow from './MushRow.vue'
import { useStorage } from '../composables/useStorage.js'
import { useI18n } from '../composables/useI18n.js'

const { items, addItem, toggleDelete } = useStorage()
const { t } = useI18n()

const rawInput = ref('')

function parseHhmmss(raw) {
  const str = String(raw)
  const digits = str.replace(/\D/g, '')
  if (!digits) return { h: 0, m: 0, s: 0 }
  const padded = digits.padStart(6, '0')
  const h = Number(padded.slice(0, -4))
  const m = Number(padded.slice(-4, -2))
  const s = Number(padded.slice(-2))
  if (m > 59 || s > 59) return null
  return { h, m, s }
}

const parsed = computed(() => parseHhmmss(rawInput.value))
const isInvalid = computed(() => rawInput.value !== '' && parsed.value === null)
const hasInput = computed(() => String(rawInput.value).replace(/\D/g, '').length > 0)

const prettyTime = computed(() => {
  if (!parsed.value) return null
  const { h, m, s } = parsed.value
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function handleAdd() {
  if (!parsed.value) return
  const totalSeconds = parsed.value.h * 3600 + parsed.value.m * 60 + parsed.value.s
  addItem(totalSeconds)
  rawInput.value = ''
}

const sortedItems = computed(() => {
  const now = Date.now()
  return [...items.value].sort((a, b) => {
    const aExpired = a.respawnTs <= now
    const bExpired = b.respawnTs <= now
    if (aExpired !== bExpired) return aExpired ? 1 : -1
    return a.respawnTs - b.respawnTs
  })
})
</script>

<template>
  <div class="mush-table">
    <div class="input-area">
      <div :class="['pretty-time', { placeholder: !hasInput, invalid: isInvalid }]">
        {{ isInvalid ? t('invalidFormat') : (prettyTime ?? '00:00:00') }}
      </div>
      <div class="input-bar">
        <div class="input-spacer"></div>
        <input
          v-model="rawInput"
          type="number"
          min="0"
          :placeholder="t('placeholder')"
          :class="{ 'input-invalid': isInvalid }"
          @keyup.enter="handleAdd"
        />
        <button class="add-btn" :disabled="isInvalid" @click="handleAdd">{{ t('add') }}</button>
      </div>
    </div>

    <table v-if="sortedItems.length">
      <colgroup>
        <col />
        <col />
        <col style="width: 120px" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>{{ t('killTime') }}</th>
          <th>{{ t('respawnTime') }}</th>
          <th>{{ t('countdown') }}</th>
          <th>{{ t('action') }}</th>
        </tr>
      </thead>
      <tbody>
        <MushRow
          v-for="item in sortedItems"
          :key="item.id"
          :item="item"
          @toggle-delete="toggleDelete"
        />
      </tbody>
    </table>

    <p v-else class="empty-hint">{{ t('emptyHint') }}</p>
  </div>
</template>

<style scoped>
.input-area {
  margin-bottom: 16px;
}

.pretty-time {
  text-align: center;
  margin-bottom: 6px;
  font-size: 1.4em;
  font-weight: bold;
  color: #5b9bd5;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
}

.pretty-time.placeholder {
  color: #444;
}

.pretty-time.invalid {
  color: #ff4d4d;
  font-size: 0.9em;
}

.input-bar {
  display: flex;
  gap: 8px;
}

.input-bar input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid #555;
  border-radius: 8px;
  background: #2a2a2a;
  color: #eee;
  font-size: 1.1em;
  line-height: 1.4;
  text-align: center;
}

.input-bar input::placeholder {
  color: #777;
  font-size: 0.85em;
}

.add-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  line-height: 1.4;
  cursor: pointer;
  font-weight: bold;
  background: #4cdf6b;
  color: #111;
  white-space: nowrap;
}

.add-btn:disabled {
  background: #555;
  color: #888;
  cursor: not-allowed;
}

.add-btn:active:not(:disabled) {
  background: #38b554;
}

.input-invalid {
  border-color: #ff4d4d !important;
}

.input-spacer {
  width: 40px;
  flex-shrink: 0;
}

@media (max-width: 430px) {
  .input-bar {
    flex-wrap: wrap;
  }

  .input-spacer {
    display: none;
  }

  .input-bar input {
    flex: 1 1 100%;
  }

  .add-btn {
    flex: 1 1 100%;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead th {
  padding: 10px 12px;
  border-bottom: 2px solid #555;
  color: #aaa;
  font-size: 0.9em;
  line-height: 1.4;
  text-align: center;
}

.empty-hint {
  text-align: center;
  color: #777;
  margin-top: 40px;
  font-size: 1em;
}
</style>
