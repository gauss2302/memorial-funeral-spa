<!-- src/components/ui/HeroCarousel.vue - Fixed timeout types -->
<template>
  <div class="hero-carousel">
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-slide"
          :class="{ active: index === currentSlide }"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
            @error="handleImageError"
            @load="handleImageLoad"
          />

          <!-- Caption overlay -->
          <div v-if="image.caption" class="slide-overlay">
            <h3 class="slide-title">{{ image.caption.title }}</h3>
            <p class="slide-description">{{ image.caption.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation arrows -->
      <button
        v-if="images.length > 1"
        class="carousel-arrow carousel-arrow--prev"
        @click="prevSlide"
        aria-label="Предыдущее изображение"
      >
        ←
      </button>

      <button
        v-if="images.length > 1"
        class="carousel-arrow carousel-arrow--next"
        @click="nextSlide"
        aria-label="Следующее изображение"
      >
        →
      </button>

      <!-- Dots indicator -->
      <div v-if="images.length > 1" class="carousel-dots">
        <button
          v-for="(image, index) in images"
          :key="`dot-${index}`"
          class="carousel-dot"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
          :aria-label="`Перейти к изображению ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { CarouselImage } from '../../types'

interface Props {
  images: CarouselImage[]
  autoplay?: boolean
  autoplayDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  autoplayDelay: 5000,
})

const currentSlide = ref(0)
const isTransitioning = ref(false)
// Fix: Use number instead of NodeJS.Timeout for browser environment
let autoplayTimer: number | null = null

const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentSlide.value) return

  isTransitioning.value = true
  currentSlide.value = index

  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const nextSlide = () => {
  const nextIndex = currentSlide.value === props.images.length - 1 ? 0 : currentSlide.value + 1
  goToSlide(nextIndex)
}

const prevSlide = () => {
  const prevIndex = currentSlide.value === 0 ? props.images.length - 1 : currentSlide.value - 1
  goToSlide(prevIndex)
}

const startAutoplay = () => {
  if (!props.autoplay || props.images.length <= 1) return

  // Fix: Use window.setInterval which returns number in browser
  autoplayTimer = window.setInterval(() => {
    if (!isTransitioning.value) {
      nextSlide()
    }
  }, props.autoplayDelay)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    // Fix: Use window.clearInterval
    window.clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn(`Failed to load image: ${img.src}`)
  // You could set a fallback image here
  // img.src = '/images/placeholder.jpg'
}

const handleImageLoad = () => {
  // Image loaded successfully
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: var(--color-background-alt);
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Slide Overlay */
.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 2rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.carousel-slide:hover .slide-overlay {
  transform: translateY(0);
}

.slide-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.slide-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Navigation Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 2;
  font-size: 1.5rem;
  font-weight: bold;
}

.hero-carousel:hover .carousel-arrow {
  opacity: 1;
  visibility: visible;
}

.carousel-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.carousel-arrow--prev {
  left: 1rem;
}

.carousel-arrow--next {
  right: 1rem;
}

/* Dots Indicator */
.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot:hover,
.carousel-dot.active {
  background: white;
  border-color: white;
}

.carousel-dot.active {
  transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-arrow {
    width: 40px;
    height: 40px;
    opacity: 1;
    visibility: visible;
  }

  .carousel-arrow--prev {
    left: 0.5rem;
  }

  .carousel-arrow--next {
    right: 0.5rem;
  }

  .slide-overlay {
    padding: 1rem;
    transform: translateY(0);
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  }

  .slide-title {
    font-size: 1rem;
  }

  .slide-description {
    font-size: 0.8rem;
  }
}
</style>
