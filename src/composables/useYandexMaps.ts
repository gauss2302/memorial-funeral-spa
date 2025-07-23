// src/composables/useYandexMaps.ts
import { ref, readonly } from 'vue'

export const useYandexMaps = () => {
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const loadYandexMaps = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false

    if (window.ymaps && isLoaded.value) {
      return true
    }

    if (isLoading.value) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (isLoaded.value) {
            resolve(true)
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
      })
    }

    isLoading.value = true

    try {
      const script = document.createElement('script')
      const apiKey =
        import.meta.env.VITE_YANDEX_MAPS_API_KEY !== 'YANDEX_MAPS_API_KEY'
          ? `&apikey=${import.meta.env.VITE_YANDEX_MAPS_API_KEY}`
          : ''

      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKey}`
      script.async = true

      return new Promise((resolve, reject) => {
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(() => {
              isLoaded.value = true
              isLoading.value = false
              resolve(true)
            })
          } else {
            isLoading.value = false
            reject(new Error('Yandex Maps API failed to load'))
          }
        }

        script.onerror = () => {
          isLoading.value = false
          reject(new Error('Failed to load Yandex Maps script'))
        }

        document.head.appendChild(script)
      })
    } catch (error) {
      isLoading.value = false
      console.error('Error loading Yandex Maps:', error)
      return false
    }
  }

  const createMap = (containerId: string, options: any = {}) => {
    if (!window.ymaps || !isLoaded.value) {
      throw new Error('Yandex Maps API is not loaded')
    }

    const defaultOptions = {
      center: [53.326444, 91.945381],
      zoom: 16,
      controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
    }

    const mapOptions = { ...defaultOptions, ...options }

    return new window.ymaps.Map(containerId, mapOptions, {
      searchControlProvider: 'yandex#search',
    })
  }

  const createPlacemark = (coordinates: number[], properties: any = {}, options: any = {}) => {
    if (!window.ymaps || !isLoaded.value) {
      throw new Error('Yandex Maps API is not loaded')
    }

    const defaultOptions = {
      iconLayout: 'default#image',
      iconImageHref: '/images/map-pin.svg',
      iconImageSize: [40, 50],
      iconImageOffset: [-20, -50],
      balloonPanelMaxMapArea: 0,
    }

    const placemarkOptions = { ...defaultOptions, ...options }

    return new window.ymaps.Placemark(coordinates, properties, placemarkOptions)
  }

  return {
    isLoaded: readonly(isLoaded),
    isLoading: readonly(isLoading),
    loadYandexMaps,
    createMap,
    createPlacemark,
  }
}
