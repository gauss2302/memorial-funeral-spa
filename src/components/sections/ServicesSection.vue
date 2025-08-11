<template>
  <section id="services" class="services-section section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Наши услуги</h2>
        <p class="section-subtitle">
          Полный комплекс ритуальных услуг с гарантией качества и фиксированными ценами
        </p>
      </div>

      <!-- Main Services Grid -->
      <div class="services-grid">
        <div
          v-for="service in mainServices"
          :key="service.id"
          class="service-card"
          :class="{ popular: service.isPopular }"
        >
          <div v-if="service.isPopular" class="popular-badge">Популярно</div>

          <div class="service-icon">
            <img
              :src="getServiceIcon(service.category)"
              :alt="`Иконка ${service.title}`"
              width="32"
              height="32"
              @error="handleImageError"
              @load="handleImageLoad"
            />
          </div>

          <div class="service-content">
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>

            <div class="service-price">{{ service.price }}</div>

            <ul class="service-features">
              <li
                v-for="feature in service.features.slice(0, 4)"
                :key="feature"
                class="feature-item"
              >
                <span class="feature-check">✓</span>
                {{ feature }}
              </li>
              <li v-if="service.features.length > 4" class="feature-more">
                и ещё {{ service.features.length - 4 }} услуг
              </li>
            </ul>

            <div class="service-actions">
              <button class="btn btn-primary" @click="openServiceModal(service)">Подробнее</button>
              <a :href="`tel:${contactInfo.phone}`" class="btn btn-secondary"> Заказать </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="services-cta">
        <div class="cta-content">
          <h3>Не нашли нужную услугу?</h3>
          <p>Мы предоставляем индивидуальные решения для каждой семьи</p>
          <div class="cta-actions">
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-primary btn-lg">
              <span class="btn-icon">📞</span>
              Получить консультацию
            </a>
            <RouterLink to="/contact" class="btn btn-secondary"> Написать нам </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <ServiceModal v-if="selectedService" :service="selectedService" @close="closeServiceModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useServiceStore } from '@/stores/services'
import { useCompanyStore } from '@/stores/company'
import ServiceModal from '@/components/ui/ServiceModal.vue'
import type { RitualService } from '@/types'

const { mainServices, additionalServices } = useServiceStore()
const { contactInfo } = useCompanyStore()

// Modal state
const selectedService = ref<RitualService | null>(null)

const openServiceModal = (service: RitualService) => {
  selectedService.value = service
}

const closeServiceModal = () => {
  selectedService.value = null
}

// Image loading state
const imageErrors = ref<Set<string>>(new Set())

// Service icons mapping with fallback
const getServiceIcon = (category: string) => {
  // Use the icons that actually exist in your container
  const icons = {
    burial: '/icons/burial.svg',
    cremation: '/icons/burial.svg',
    memorial: '/icons/burial.svg',
    transport: '/icons/burial.svg',
    documents: '/icons/burial.svg',
  }

  const iconPath = icons[category as keyof typeof icons] || '/icons/sky.png'

  // If this icon has failed to load before, use a different fallback
  if (imageErrors.value.has(iconPath)) {
    return '/icons/ash.png' // Use the other known working icon
  }

  return iconPath
}

// Handle image loading errors
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const src = img.src

  console.error('Failed to load image:', src)
  imageErrors.value.add(src)

  // Set a fallback image
  if (!src.includes('ash.png')) {
    img.src = '/icons/ash.png'
  } else {
    // If even the fallback fails, hide the image
    img.style.display = 'none'
  }
}

// Handle successful image loading
const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.log('Successfully loaded image:', img.src)
}
</script>

<style lang="scss" scoped>
.services-section {
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Main Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background: var(--color-background);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.service-card.popular {
  border: 2px solid var(--color-accent);
  transform: scale(1.02);
}

.popular-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-accent);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.service-icon {
  width: 60px;
  height: 60px;
  background: var(--color-background-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.service-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.service-icon img[style*='display: none'] {
  display: none !important;
}

.service-title {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.service-description {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-text);
}

.feature-check {
  color: var(--color-success);
  font-weight: bold;
  width: 16px;
  flex-shrink: 0;
}

.feature-more {
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.service-actions {
  display: flex;
  gap: 1rem;
}

/* Исправленные стили кнопок */
.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
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
  font-size: 0.9rem;
  line-height: 1;
  white-space: nowrap;
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

/* Call to Action */
.services-cta {
  background: var(--color-primary);
  border-radius: 2rem;
  padding: 3rem;
  text-align: center;
  color: white;
}

.services-cta h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.services-cta p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Специальные стили для кнопок в CTA */
.services-cta .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1;
  white-space: nowrap;
  min-width: 200px;
}

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  min-width: 250px;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .service-card {
    padding: 1.5rem;
  }

  .service-actions {
    flex-direction: column;
  }

  .services-cta {
    padding: 2rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .services-cta .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .services-cta .btn-lg {
    max-width: 320px;
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card.popular {
    transform: none;
  }

  .services-cta h3 {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
