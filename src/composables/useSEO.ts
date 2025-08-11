import { useHead } from '@vueuse/head'

interface SEOOptions {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export const useSEO = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL
  const siteName = import.meta.env.VITE_APP_TITLE

  const setPageSEO = (options: SEOOptions) => {
    const fullTitle = options.title ? `${options.title} | ${siteName}` : siteName
    const canonicalUrl = options.canonical || `${siteUrl}${window.location.pathname}`
    const defaultOgImage = `${siteUrl}/images/og-default.jpg`

    useHead({
      title: fullTitle,
      meta: [
        { name: 'description', content: options.description || '' },
        { name: 'keywords', content: options.keywords || '' },

        // Open Graph
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: options.description || '' },
        { property: 'og:image', content: options.ogImage || defaultOgImage },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: siteName },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: options.description || '' },
        { name: 'twitter:image', content: options.ogImage || defaultOgImage },

        // Location
        { name: 'geo.region', content: 'RU-KR' },
        { name: 'geo.placename', content: 'Шушенское' },
      ],
      link: [{ rel: 'canonical', href: canonicalUrl }],
    })
  }

  const setDefaultSEO = () => {
    useHead({
      title: siteName,
      meta: [
        {
          name: 'description',
          content:
            'Ритуальное агентство "Мемориал" - полный комплекс ритуальных услуг в Шушенском. Организация похорон, кремация, памятники. Работаем круглосуточно. Опыт работы более 15 лет.',
        },
        {
          name: 'keywords',
          content:
            'ритуальные услуги, похороны, кремация, памятники, ритуальное агентство, организация похорон, ритуальный зал, катафалк, гробы, Шушенское',
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
        { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
        { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://api.yandex.ru', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://yandex.st', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      ],
    })
  }

  const generateStructuredData = (
    type: 'Organization' | 'LocalBusiness' | 'Service',
    data: any = {},
  ) => {
    let structuredData: any = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'LocalBusiness':
      case 'Organization':
        structuredData = {
          ...structuredData,
          '@type': 'LocalBusiness',
          name: siteName,
          description: 'Ритуальное агентство полного цикла',
          telephone: import.meta.env.VITE_COMPANY_PHONE,
          email: import.meta.env.VITE_COMPANY_EMAIL,
          url: siteUrl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Первомайская ул., 56',
            addressLocality: 'Шушенское',
            addressRegion: 'Красноярский край',
            addressCountry: 'RU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '53.337081',
            longitude: '91.960051',
          },
          openingHours: 'Mo-Su 00:00-24:00',
          serviceArea: {
            '@type': 'City',
            name: 'Шушенское',
          },
          ...data,
        }
        break

      case 'Service':
        structuredData = {
          ...structuredData,
          '@type': 'Service',
          provider: {
            '@type': 'LocalBusiness',
            name: siteName,
            telephone: import.meta.env.VITE_COMPANY_PHONE,
          },
          areaServed: {
            '@type': 'City',
            name: 'Шушенское',
          },
          ...data,
        }
        break
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData),
        },
      ],
    })
  }

  return {
    setPageSEO,
    setDefaultSEO,
    generateStructuredData,
  }
}
