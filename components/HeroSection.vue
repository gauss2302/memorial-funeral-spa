<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <h1 class="hero-title">
            Ритуальные услуги c <span class="text-accent">заботой и вниманием</span>
          </h1>
          <p class="hero-subtitle">
            Более 15 лет мы помогаем семьям в трудную минуту. Полный комплекс ритуальных услуг
            с гарантией качества и фиксированными ценами.
          </p>

          <div class="hero-features">
            <div class="feature">
              <span class="icon">🕐</span>
              <span>Работаем 24/7</span>
            </div>
            <div class="feature">
              <span class="icon">️</span>
              <span>Лицензированы</span>
            </div>
            <div class="feature">
              <span class="icon">❤️</span>
              <span>15 лет опыта</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/services" class="btn btn-primary">
              Наши услуги
            </NuxtLink>
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-secondary">
              Позвонить
            </a>
          </div>

          <div class="hero-contact">
            <p class="emergency-text">Круглосуточная служба</p>
            <a :href="`tel:${contactInfo.phone}`" class="phone-number">
              {{ contactInfo.phone }}
            </a>
            <p class="response-time">Выезд агента в течение часа</p>
          </div>
        </div>

        <div class="hero-image">
          <HeroCarousel :images="carouselImages" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/stores/company'

const { contactInfo } = useCompanyStore()

const carouselImages = [
  {
    src: '/images/goodbye.jpg',
    alt: 'Ритуальный зал с цветами и свечами',
    width: 800,
    height: 600,
    caption: {
      title: 'Прощальный зал',
      description: 'Уютная атмосфера для последнего прощания'
    }
  },
  {
    src: '/images/house.jpg',
    alt: 'Машина',
    width: 800,
    height: 600,
    caption: {
      title: 'Собственные авто',
      description: 'Надежная машина'
    }
  },
  {
    src: '/images/venki.jpg',
    alt: 'Машина',
    width: 800,
    height: 600,
    caption: {
      title: 'Собственные авто',
      description: 'Надежная машина'
    }
  },
]
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.hero-title {
  font-family: var(--font-family-display);
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.text-accent {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.hero-features {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--color-primary);
}

.icon {
  font-size: 1.25rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
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

.hero-contact {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}

.emergency-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.phone-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
}

.phone-number:hover {
  color: var(--color-primary);
}

.response-time {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 968px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-section {
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-features {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-features {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .phone-number {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 1rem 0;
    min-height: 60vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .feature {
    justify-content: center;
  }
}</style>
