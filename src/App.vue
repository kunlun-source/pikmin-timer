<script setup>
import MushTable from './components/MushTable.vue'
import { useI18n } from './composables/useI18n.js'

const { locale, t, toggleLocale } = useI18n()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>{{ t('title') }}</h1>
      <a class="github-link" href="https://github.com/kunlun-source/pikmin-timer" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      </a>
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
  width: 72px;
  flex-shrink: 0;
}

.github-link {
  color: #888;
  display: flex;
  align-items: center;
  margin-right: 8px;
  transition: color 0.2s;
}

.github-link:hover {
  color: #ccc;
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
