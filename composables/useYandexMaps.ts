export const useYandexMaps = () => {
	const config = useRuntimeConfig()
	const isLoaded = ref(false)
	const isLoading = ref(false)

	const loadYandexMaps = async (): Promise<boolean> => {
		if (typeof window === 'undefined') return false

		// Check if already loaded
		if (window.ymaps && isLoaded.value) {
			return true
		}

		// Check if currently loading
		if (isLoading.value) {
			return new Promise(resolve => {
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
			// Load Yandex Maps API script
			const script = document.createElement('script')
			const apiKey = config.public.yandexMapsApiKey !== 'YANDEX_MAPS_API_KEY'
				? `&apikey=${config.public.yandexMapsApiKey}`
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
			center: [53.33, 91.93],
			zoom: 16,
			controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
		}

		const mapOptions = { ...defaultOptions, ...options }

		return new window.ymaps.Map(containerId, mapOptions, {
			searchControlProvider: 'yandex#search'
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
			balloonPanelMaxMapArea: 0
		}

		const placemarkOptions = { ...defaultOptions, ...options }

		return new window.ymaps.Placemark(coordinates, properties, placemarkOptions)
	}

	const addTrafficControl = (map: any) => {
		if (!window.ymaps || !isLoaded.value) {
			throw new Error('Yandex Maps API is not loaded')
		}

		const trafficControl = new window.ymaps.control.TrafficControl({
			state: { providerKey: 'traffic#actual' }
		})
		map.controls.add(trafficControl)

		return trafficControl
	}

	const enableScrollZoomOnClick = (map: any) => {
		if (!map) return

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
	}

	const setMapBounds = (map: any, bounds: number[][]) => {
		if (!window.ymaps || !isLoaded.value || !map) {
			throw new Error('Yandex Maps API is not loaded or map is not provided')
		}

		map.setBounds(bounds, {
			checkZoomRange: true,
			zoomMargin: 20
		})
	}

	const geocodeAddress = async (address: string) => {
		if (!window.ymaps || !isLoaded.value) {
			throw new Error('Yandex Maps API is not loaded')
		}

		try {
			const result = await window.ymaps.geocode(address)
			const firstGeoObject = result.geoObjects.get(0)

			if (firstGeoObject) {
				const coordinates = firstGeoObject.geometry.getCoordinates()
				const bounds = firstGeoObject.properties.get('boundedBy')
				const address = firstGeoObject.getAddressLine()

				return {
					coordinates,
					bounds,
					address,
					geoObject: firstGeoObject
				}
			}

			return null
		} catch (error) {
			console.error('Geocoding error:', error)
			return null
		}
	}

	return {
		isLoaded: readonly(isLoaded),
		isLoading: readonly(isLoading),
		loadYandexMaps,
		createMap,
		createPlacemark,
		addTrafficControl,
		enableScrollZoomOnClick,
		setMapBounds,
		geocodeAddress
	}
}
