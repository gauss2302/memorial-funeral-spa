<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">{{ service.title }}</h2>
        <button class="modal-close" @click="closeModal" aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="service-info">
          <p class="service-description">{{ service.description }}</p>
          <div class="service-price">{{ service.price }}</div>
        </div>

        <div class="service-features">
          <h3>Что входит в услугу:</h3>
          <ul class="features-list">
            <li v-for="feature in service.features" :key="feature" class="feature-item">
              <span class="feature-check">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="modal-actions">
          <a :href="`tel:${contactInfo.phone}`" class="btn btn-primary btn-lg">
            <span class="btn-icon">📞</span>
            Заказать услугу
          </a>
          <button class="btn btn-secondary" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import type { RitualService } from '@/types'
import { useCompanyStore } from '@/stores/company'

interface Props {
  service: RitualService
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { contactInfo } = useCompanyStore()

const closeModal = () => {
  emit('close')
}

// Close on escape key
onKeyStroke('Escape', closeModal)

// Prevent body scroll when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: var(--color-background);
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  color: var(--color-primary);
  margin: 0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--color-background-alt);
  color: var(--color-text);
}

.modal-body {
  padding: 2rem;
}

.service-info {
  margin-bottom: 2rem;
}

.service-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.service-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.service-features h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.features-list {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
}

.feature-check {
  color: var(--color-success);
  font-weight: bold;
  width: 20px;
  flex-shrink: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
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

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .service-price {
    font-size: 1.75rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
