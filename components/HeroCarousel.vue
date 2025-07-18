<template>
  <div
      ref="carouselRef"
      class="hero-carousel"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
  >
    <div class="carousel-container">
      <!-- Images -->
      <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
            v-for="(image, index) in images"
            :key="index"
            class="carousel-slide"
            :class="{ 'active': index === currentSlide }"
        >
          <img
              :src="image.src"
              :alt="image.alt"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :width="image.width"
              :height="image.height"
              @load="onImageLoad(index)"
          >

          <!-- Optional overlay with text -->
          <div v-if="image.caption" class="slide-overlay">
            <h3 class="slide-title">{{ image.caption.title }}</h3>
            <p class="slide-description">{{ image.caption.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
          v-if="showControls && images.length > 1"
          class="carousel-arrow carousel-arrow--prev"
          @click="prevSlide"
          :disabled="isTransitioning"
          aria-label="Предыдущее изображение"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
          v-if="showControls && images.length > 1"
          class="carousel-arrow carousel-arrow--next"
          @click="nextSlide"
          :disabled="isTransitioning"
          aria-label="Следующее изображение"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div v-if="showDots && images.length > 1" class="carousel-dots">
        <button
            v-for="(image, index) in images"
            :key="`dot-${index}`"
            class="carousel-dot"
            :class="{ 'active': index === currentSlide }"
            @click="goToSlide(index)"
            :aria-label="`Перейти к изображению ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CarouselImage {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: {
    title: string
    description: string
  }
}

interface Props {
  images: CarouselImage[]
  autoplay?: boolean
  autoplayDelay?: number
  showControls?: boolean
  showDots?: boolean
  transitionDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  autoplayDelay: 5000,
  showControls: true,
  showDots: true,
  transitionDuration: 500
})

// Refs
const carouselRef = ref<HTMLElement | null>(null)

// Reactive state
const currentSlide = ref(0)
const isTransitioning = ref(false)
const autoplayTimer = ref<NodeJS.Timeout | null>(null)
const isPaused = ref(false)
const loadedImages = ref(new Set<number>())

// Computed
const totalSlides = computed(() => props.images.length)

// Methods
const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentSlide.value) return

  isTransitioning.value = true
  currentSlide.value = index

  // Reset transition flag after animation
  setTimeout(() => {
    isTransitioning.value = false
  }, props.transitionDuration)
}

const nextSlide = () => {
  const nextIndex = currentSlide.value === totalSlides.value - 1 ? 0 : currentSlide.value + 1
  goToSlide(nextIndex)
}

const prevSlide = () => {
  const prevIndex = currentSlide.value === 0 ? totalSlides.value - 1 : currentSlide.value - 1
  goToSlide(prevIndex)
}

const onImageLoad = (index: number) => {
  loadedImages.value.add(index)
}

// Autoplay functionality
const startAutoplay = () => {
  if (!props.autoplay || totalSlides.value <= 1) return

  autoplayTimer.value = setInterval(() => {
    if (!isPaused.value && !isTransitioning.value) {
      nextSlide()
    }
  }, props.autoplayDelay)
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

const pauseAutoplay = () => {
  isPaused.value = true
}

const resumeAutoplay = () => {
  isPaused.value = false
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (isTransitioning.value) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevSlide()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextSlide()
      break
    case ' ':
      event.preventDefault()
      isPaused.value ? resumeAutoplay() : pauseAutoplay()
      break
  }
}

// Touch/Swipe support
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].clientX
  const swipeDistance = touchStartX.value - touchEndX.value

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

// Lifecycle
onMounted(() => {
  startAutoplay()

  // Add keyboard listeners
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})

// Watch for prop changes
watch(() => props.autoplay, (newValue) => {
  if (newValue) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

// Preload next image for performance
watchEffect(() => {
  const nextIndex = currentSlide.value === totalSlides.value - 1 ? 0 : currentSlide.value + 1
  const nextImage = props.images[nextIndex]

  if (nextImage && !loadedImages.value.has(nextIndex)) {
    const img = new Image()
    img.src = nextImage.src
  }
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

.carousel-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  width: 12px;
  height: 12px;
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

@media (max-width: 576px) {
  .carousel-dots {
    bottom: 0.5rem;
  }

  .carousel-dot {
    width: 10px;
    height: 10px;
  }
}

/* Performance optimizations */
.carousel-slide:not(.active) {
  pointer-events: none;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none;
  }

  .carousel-arrow,
  .carousel-dot,
  .slide-overlay {
    transition: none;
  }
}
</style>
