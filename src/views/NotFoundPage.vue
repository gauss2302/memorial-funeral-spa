<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Страница не найдена</h2>
        <p class="error-message">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>

        <div class="error-actions">
          <RouterLink to="/" class="btn btn-primary"> На главную </RouterLink>
          <RouterLink to="/services" class="btn btn-secondary"> Наши услуги </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

const { setPageSEO } = useSEO()

onMounted(() => {
  setPageSEO({
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не найдена на сайте ритуального агентства Мемориал.',
  })
})
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-alt);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--color-accent);
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  color: var(--color-primary);
  margin: 1rem 0;
}

.error-message {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-secondary);
}

.btn-secondary {
  background-color: var(--color-accent);
  color: white;
}

.btn-secondary:hover {
  background-color: #7a654a;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>
