<script setup>
import MushTable from './components/MushTable.vue'
import { useI18n } from './composables/useI18n.js'

const { locale, t, toggleLocale } = useI18n()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>{{ t('title') }}</h1>
      <button class="lang-btn" @click="toggleLocale">
        {{ locale === 'zh-TW' ? 'EN' : '中' }}
      </button>
    </header>
    <MushTable />
  </div>
</template>

<style scoped>
.app {
  max-width: 768px;
  margin: 0 auto;
  padding: 20px 16px;
}

.app-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.app-header::before {
  content: '';
  width: 40px;
  flex-shrink: 0;
}

h1 {
  flex: 1;
  text-align: center;
  font-size: 1.4em;
  margin: 0;
  color: #eee;
  line-height: 1.6;
}

.lang-btn {
  background: #333;
  color: #ccc;
  border: 1px solid #555;
  border-radius: 6px;
  width: 40px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85em;
  font-weight: bold;
  line-height: 1;
}

.lang-btn:active {
  background: #555;
}
</style>
