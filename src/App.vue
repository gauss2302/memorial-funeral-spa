<template>
  <div id="app" class="app">
    <AppHeader />

    <main class="main-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useSEO } from './composables/useSEO'

const { setDefaultSEO } = useSEO()

onMounted(() => {
  setDefaultSEO()
})
</script>

<style lang="css">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
