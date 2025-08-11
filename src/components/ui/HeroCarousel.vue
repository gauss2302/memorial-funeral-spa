<!-- src/components/ui/HeroCarousel.vue - Optimized for horizontal images -->
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
<!--      <div v-if="images.length > 1" class="carousel-dots">-->
<!--        <button-->
<!--          v-for="(image, index) in images"-->
<!--          :key="`dot-${index}`"-->
<!--          class="carousel-dot"-->
<!--          :class="{ active: index === currentSlide }"-->
<!--          @click="goToSlide(index)"-->
<!--          :aria-label="`Перейти к изображению ${index + 1}`"-->
<!--        />-->
<!--      </div>-->
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
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  autoplayDelay: 2000,
  height: '400px'
})

const currentSlide = ref(0)
const isTransitioning = ref(false)
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

  autoplayTimer = window.setInterval(() => {
    if (!isTransitioning.value) {
      nextSlide()
    }
  }, props.autoplayDelay)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn(`Failed to load image: ${img.src}`)
  // Можно установить изображение-заглушку
  // img.src = '/images/placeholder.jpg'
}

const handleImageLoad = () => {
  // Изображение загружено успешно
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
  height: v-bind(height);
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
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
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.3s ease;
}

.carousel-slide:hover img {
  transform: scale(1.02);
}

/* Slide Overlay */
.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  color: white;
  padding: 1.5rem;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease;
}

.carousel-slide:hover .slide-overlay,
.carousel-slide.active .slide-overlay {
  transform: translateY(0);
  opacity: 1;
}

.slide-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.slide-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Navigation Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: none;
  width: 40px;
  height: 40px;
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
  font-size: 1.2rem;
  font-weight: bold;
  backdrop-filter: blur(4px);
}

.hero-carousel:hover .carousel-arrow {
  opacity: 1;
  visibility: visible;
}

.carousel-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.carousel-arrow:active {
  transform: translateY(-50%) scale(0.95);
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
  gap: 0.4rem;
  z-index: 2;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.carousel-dot:hover {
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.3);
}

.carousel-dot.active {
  background: white;
  border-color: white;
  transform: scale(1.3);
}

/* Touch/Mobile optimizations */
.carousel-slide {
  touch-action: pan-y;
  user-select: none;
}

/* Responsive Design */
@media (max-width: 968px) {
  .hero-carousel {
    height: 350px;
    border-radius: 0.5rem;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
    opacity: 1;
    visibility: visible;
    font-size: 1.1rem;
  }

  .carousel-arrow--prev {
    left: 0.75rem;
  }

  .carousel-arrow--next {
    right: 0.75rem;
  }

  .slide-overlay {
    padding: 1rem;
    transform: translateY(0);
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 60%,
      transparent 100%
    );
  }

  .slide-title {
    font-size: 1rem;
  }

  .slide-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 280px;
  }

  .carousel-arrow {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  .carousel-dot {
    width: 10px;
    height: 10px;
  }

  .slide-overlay {
    padding: 0.75rem;
  }
}

@media (max-width: 576px) {
  .hero-carousel {
    height: 240px;
    border-radius: 0.375rem;
  }

  .carousel-arrow--prev {
    left: 0.5rem;
  }

  .carousel-arrow--next {
    right: 0.5rem;
  }
}

/* Loading state */
.carousel-slide img[src=""] {
  background: var(--color-background-alt);
}

/* Performance optimizations */
.carousel-slide:not(.active) {
  pointer-events: none;
}

.carousel-track {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>
