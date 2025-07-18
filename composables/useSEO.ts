
export const useSEO = () => {
	const config = useRuntimeConfig()

	const setPageSEO = (options: {
		title: string
		description: string
		keywords?: string
		ogImage?: string
		canonical?: string
	}) => {
		const fullTitle = `${options.title} | ${config.public.siteName}`
		const canonicalUrl = options.canonical || `${config.public.siteUrl}${useRoute().path}`
		const defaultOgImage = `${config.public.siteUrl}/images/og-default.jpg`

		useSeoMeta({
			title: fullTitle,
			description: options.description,
			keywords: options.keywords,

			// Open Graph теги
			ogTitle: fullTitle,
			ogDescription: options.description,
			ogImage: options.ogImage || defaultOgImage,
			ogUrl: canonicalUrl,
			ogType: 'website',
			ogLocale: 'ru_RU',
			ogSiteName: config.public.siteName,
		})

		useHead({
			link: [
				{
					href: canonicalUrl,
				}
			],
			meta: [
				{ name: 'geo.region', content: 'RU-KR' },
				{ name: 'geo.placename', content: 'Шушенское' },
			]
		})
	}

	const generateStructureData = (type: 'Organization' | 'LocalBusiness' | 'Service', data: any = {}) => {
		const config = useRuntimeConfig()

		let structuredData: any = {
			'@context': 'https://schema.org'
		}

		switch (type) {
			case 'LocalBusiness':
			case 'Organization':
				structuredData = {
					...structuredData,
					'@type': 'LocalBusiness',
					name: config.public.siteName,
					description: 'Ритуальное агентство полного цикла',
					telephone: config.public.companyPhone,
					email: config.public.companyEmail,
					url: config.public.siteUrl,

					address: {
						'@type': 'PostalAddress',
						streetAddress: 'ул. Цветочная, д. 15, стр. 1',
						addressLocality: 'Москва',
						addressRegion: 'Москва',
						postalCode: '127000',
						addressCountry: 'RU'
					},

					geo: {
						'@type': 'GeoCoordinates',
						latitude: '55.7706',
						longitude: '37.6212'
					},

					openingHours: 'Mo-Su 00:00-24:00',

					serviceArea: {
						'@type': 'City',
						name: 'Москва'
					},

					hasOfferCatalog: {
						'@type': 'OfferCatalog',
						name: 'Ритуальные услуги',
						itemListElement: [
							{
								'@type': 'Offer',
								itemOffered: {
									'@type': 'Service',
									name: 'Организация похорон'
								}
							},
							{
								'@type': 'Offer',
								itemOffered: {
									'@type': 'Service',
									name: 'Кремационные услуги'
								}
							},
							{
								'@type': 'Offer',
								itemOffered: {
									'@type': 'Service',
									name: 'Мемориальные услуги'
								}
							}
						]
					},

					// Объединяем с дополнительными данными
					...data
				}
				break

			case 'Service':
				structuredData = {
					...structuredData,
					'@type': 'Service',
					provider: {
						'@type': 'LocalBusiness',
						name: config.public.siteName,
						telephone: config.public.companyPhone
					},
					areaServed: {
						'@type': 'City',
						name: 'Москва'
					},
					...data
				}
				break
		}

		useHead({
			script: [{
				type: 'application/ld+json',
				innerHTML: JSON.stringify(structuredData)
			}]
		})
	}

	const setServicePageSEO = (service: {
		name: string
		description: string
		price?: string
		features: string[]
	}) => {
		// SEO для страницы услуги
		setPageSEO({
			title: service.name,
			description: `${service.description} ${service.price ? `Цена ${service.price}.` : ''} Профессиональные ритуальные услуги в Москве.`,
			keywords: `${service.name.toLowerCase()}, ритуальные услуги москва, ${service.features.join(', ').toLowerCase()}`
		})

		// Structured data для услуги
		generateStructureData('Service', {
			name: service.name,
			description: service.description,
			offers: service.price ? {
				'@type': 'Offer',
				price: service.price,
				priceCurrency: 'RUB'
			} : undefined
		})
	}

	return {
		setPageSEO,
		generateStructureData,
		setServicePageSEO
	}


}
