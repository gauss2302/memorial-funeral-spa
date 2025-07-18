<template>
  <section class="contact-section section">
    <div class="container">
      <h2 class="section-title">Контакты</h2>

      <div class="contact-grid">
        <!-- Contact Information -->
        <div class="contact-info">
          <div class="contact-card">
            <h3>Наши контакты</h3>

            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-details">
                <h4>Телефоны</h4>
                <a :href="`tel:${contactInfo.phone}`" class="phone-link primary">
                  {{ contactInfo.phone }}
                </a>
                <a :href="`tel:${contactInfo.phoneSecond}`" class="phone-link">
                  {{ contactInfo.phoneSecond }}
                </a>
                <p class="contact-note">Круглосуточно, без выходных</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-details">
                <h4>Электронная почта</h4>
                <a :href="`mailto:${contactInfo.email}`" class="email-link">
                  {{ contactInfo.email }}
                </a>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-details">
                <h4>Адрес</h4>
                <p class="address">{{ contactInfo.address }}</p>
                <p class="contact-note">{{ contactInfo.workingHours.description }}</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">⚡</div>
              <div class="contact-details">
                <h4>Экстренный вызов</h4>
                <p class="emergency-info">{{ contactInfo.workingHours.emergency }}</p>
              </div>
            </div>
          </div>

          <div class="contact-actions">
            <a :href="`tel:${contactInfo.phone}`" class="btn btn-primary btn-lg">
              <span class="btn-icon">📞</span>
              Позвонить
            </a>
            <a :href="`mailto:${contactInfo.email}`" class="btn btn-secondary">
              <span class="btn-icon">📧</span>
              Написать email
            </a>
          </div>
        </div>

        <!-- Yandex Map -->
        <div class="map-container">
          <div class="map-header">
            <h3>Как нас найти</h3>
            <p>Мы находимся в центре Москвы, удобное расположение для всех районов города</p>
          </div>

          <div id="yandex-map" class="yandex-map"></div>

          <div class="map-info">
            <div class="transport-info">
              <h4>🚇 Ориентир</h4>
              <p>Шушенская Городская больница</p>
              <p>Трубная - 7 минут пешком</p>
            </div>

            <div class="parking-info">
              <h4>🚗 Парковка</h4>
              <p>Бесплатная парковка во дворе</p>
              <p>Места для автобусов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCompanyStore } from '~/stores/company'

const { contactInfo } = useCompanyStore()

// Yandex Maps integration
const { loadYandexMaps, createMap, createPlacemark, isLoaded } = useYandexMaps()

onMounted(async () => {
  try {
    await loadYandexMaps()
    initYandexMap()
  } catch (error) {
    console.error('Failed to load Yandex Maps:', error)
  }
})

const initYandexMap = () => {
  if (!isLoaded.value) return

  try {
    const mapCenter = [53.326444, 91.945381]

    const map = createMap('yandex-map', {
      center: mapCenter,
      zoom: 16
    })

    // Add placemark for the funeral agency
    const placemark = createPlacemark(mapCenter, {
      balloonContentHeader: 'Ритуальное агентство "Мемориал"',
      balloonContentBody: `
        <div style="padding: 10px;">
          <p><strong>Адрес:</strong> ${contactInfo.address}</p>
          <p><strong>Телефон:</strong> <a href="tel:${contactInfo.phone}">${contactInfo.phone}</a></p>
          <p><strong>Режим работы:</strong> ${contactInfo.workingHours.description}</p>
          <p><strong>Email:</strong> <a href="mailto:${contactInfo.email}">${contactInfo.email}</a></p>
        </div>
      `,
      balloonContentFooter: '<small>Выезд агента в течение часа</small>',
      hintContent: 'Ритуальное агентство "Вечная Память"'
    }, {
      iconImageHref: '/images/map-pin.png',
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40]
    })

    map.geoObjects.add(placemark)

    // Auto-open balloon on load
    setTimeout(() => {
      placemark.balloon.open()
    }, 1000)

    // Disable scroll zoom initially
    map.behaviors.disable('scrollZoom')

    // Enable scroll zoom on click
    map.events.add('click', () => {
      map.behaviors.enable('scrollZoom')
    })

    // Disable scroll zoom when mouse leaves
    map.events.add('mouseleave', () => {
      map.behaviors.disable('scrollZoom')
    })
  } catch (error) {
    console.error('Error initializing Yandex Map:', error)
  }
}

// SEO for contact page
const { setPageSEO } = useSEO()

setPageSEO({
  title: 'Контакты',
  description: 'Контакты ритуального агентства "Вечная Память" в Москве. Телефоны, адрес, время работы. Круглосуточная служба, выезд агента в течение часа.',
  keywords: 'контакты ритуального агентства, адрес, телефон, москва ритуальные услуги'
})
</script>

<style scoped>
.contact-section {
  background-color: var(--color-background-alt);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-card {
  background: var(--color-background);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
}

.contact-card h3 {
  color: var(--color-primary);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.contact-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.contact-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-alt);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-details h4 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.phone-link {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}

.phone-link.primary {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary);
}

.phone-link:hover {
  color: var(--color-secondary);
}

.email-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
}

.email-link:hover {
  color: var(--color-primary);
}

.address {
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.contact-note {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin: 0;
}

.emergency-info {
  font-weight: 600;
  color: var(--color-accent);
  margin: 0;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
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
  margin-right: 0.5rem;
}

/* Map Styles */
.map-container {
  position: sticky;
  top: 2rem;
}

.map-header {
  margin-bottom: 1.5rem;
}

.map-header h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.map-header p {
  color: var(--color-text-secondary);
  margin: 0;
}

.yandex-map {
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 1.5rem;
}

.map-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.transport-info,
.parking-info {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-sm);
}

.transport-info h4,
.parking-info h4 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.transport-info p,
.parking-info p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.transport-info p:last-child,
.parking-info p:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .map-container {
    position: static;
  }

  .map-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-actions {
    flex-direction: column;
  }

  .yandex-map {
    height: 300px;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    align-self: center;
  }
}

@media (max-width: 576px) {
  .contact-card {
    padding: 1.5rem;
  }

  .map-info {
    gap: 0.75rem;
  }

  .transport-info,
  .parking-info {
    padding: 1rem;
  }
}
</style>
