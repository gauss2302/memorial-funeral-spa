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

      <!-- Service Categories -->
      <div class="services-categories">
        <h3 class="categories-title">Дополнительные услуги</h3>

        <div class="categories-grid">
          <div v-for="service in additionalServices" :key="service.id" class="category-card">
            <div class="category-icon">
              <img
                :src="getServiceIcon(service.category)"
                :alt="`Иконка ${service.title}`"
                width="24"
                height="24"
                @error="handleImageError"
                @load="handleImageLoad"
              />
            </div>
            <div class="category-content">
              <h4 class="category-title">{{ service.title }}</h4>
              <p class="category-description">{{ service.description }}</p>
              <div class="category-price">{{ service.price }}</div>
            </div>
            <button class="category-button" @click="openServiceModal(service)">→</button>
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
  display: inline-block;
  font-family: inherit;
  font-size: 0.9rem;
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

/* Additional Services */
.services-categories {
  margin-bottom: 4rem;
}

.categories-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-size: 1.75rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--color-background);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.category-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(5px);
}

.category-icon {
  width: 50px;
  height: 50px;
  background: var(--color-background-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  overflow: hidden;
}

.category-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.category-content {
  flex: 1;
}

.category-title {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.category-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.category-price {
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

.category-button {
  background: var(--color-accent);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.category-button:hover {
  background: #7a654a;
  transform: scale(1.1);
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

.btn-lg {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

.btn-icon {
  margin-right: 0.5rem;
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

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .category-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .services-cta {
    padding: 2rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
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
