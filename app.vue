<!-- app.vue -->
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Глобальная SEO конфигурация
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  titleTemplate: '%s | Вечная Память',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=yes' },
    { name: 'theme-color', content: '#2c3e50' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
/* Глобальные стили только для app.vue */
#app {
  min-height: 100vh;
}

/* Стили для no-js */
.no-js .js-only {
  display: none !important;
}

.js .no-js-only {
  display: none !important;
}
</style>
