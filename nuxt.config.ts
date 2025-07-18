export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  typescript: {
    strict: true,
    typeCheck: process.env.NODE_ENV === 'development',
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  ssr: false,

  imports: {
    autoImport: true,
  },

  // Production-optimized Nitro configuration
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,

    prerender: {
      routes: [
        '/',
        '/about',
        '/contact',
      ]
    },

    routeRules: {
      '/': { prerender: true },
      '/about': { prerender: true },
      '/contact': { prerender: true },
      '/health': {
        headers: { 'cache-control': 'no-cache' },
        cors: true
      },
      // Static assets caching
      '/images/**': {
        headers: { 'cache-control': 'max-age=31536000' }
      },
      '/_nuxt/**': {
        headers: { 'cache-control': 'max-age=31536000' }
      },
      // API routes (if you add them later)
      '/api/**': {
        headers: { 'cache-control': 'max-age=0' }
      }
    },

    // Security and performance
    experimental: {
      wasm: false
    }
  },

  // SEO and meta configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Мемориал - Ритуальные услуги в Шушенском',
      meta: [
        {
          name: 'description',
          content: 'Ритуальное агентство "Мемориал" - полный комплекс ритуальных услуг в Шушенском. Организация похорон, кремация, памятники. Работаем круглосуточно. Опыт работы более 15 лет.'
        },
        {
          name: 'keywords',
          content: 'ритуальные услуги, похороны, кремация, памятники, ритуальное агентство, организация похорон, ритуальный зал, катафалк, гробы, Шушенское'
        },
        {
          property: 'og:title',
          content: 'Мемориал - Ритуальные услуги в Шушенском'
        },
        {
          property: 'og:description',
          content: 'Полный комплекс ритуальных услуг в Шушенском. Организация похорон с заботой и вниманием к каждой семье.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:locale',
          content: 'ru_RU'
        },
        {
          property: 'og:site_name',
          content: 'Мемориал'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        },
        // Security headers
        {
          'http-equiv': 'X-Content-Type-Options',
          content: 'nosniff'
        },
        {
          'http-equiv': 'X-Frame-Options',
          content: 'DENY'
        },
        {
          'http-equiv': 'X-XSS-Protection',
          content: '1; mode=block'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'canonical',
          href: 'https://www.ritual-shushenskoe.ru'
        },
        // Performance optimizations
        {
          rel: 'preconnect',
          href: 'https://api.yandex.ru',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preconnect',
          href: 'https://yandex.st',
          crossorigin: 'anonymous'
        },
        {
          rel: 'dns-prefetch',
          href: 'https://fonts.googleapis.com'
        }
      ],
      // Structured data for SEO
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Мемориал',
            description: 'Ритуальное агентство полного цикла в Шушенском',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Шушенское',
              addressRegion: 'Красноярский край',
              addressCountry: 'RU',
              streetAddress: 'ул. Цветочная, д. 15, стр. 1'
            },
            telephone: '+7 (913) 182-26-28',
            email: 'info@ritual-shushenskoe.ru',
            url: 'https://www.ritual-shushenskoe.ru',
            serviceType: 'Ритуальные услуги'
          })
        }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Private server-side configuration
    private: {
      // Add any server secrets here if needed in the future
    },

    // Public configuration (exposed to client)
    public: {
      siteUrl: process.env.SITE_URL || 'https://www.ritual-shushenskoe.ru',
      siteName: process.env.SITE_NAME || 'Мемориал - Ритуальные услуги в Шушенском',
      siteDescription: 'Ритуальное агентство "Мемориал" - полный комплекс ритуальных услуг в Шушенском',

      // Company information
      companyPhone: process.env.COMPANY_PHONE || '+7 (913) 182-26-28',
      companyPhoneSecond: process.env.COMPANY_PHONE_SECOND || '+7 (916) 987-65-43',
      companyEmail: process.env.COMPANY_EMAIL || 'info@ritual-shushenskoe.ru',
      companyAddress: process.env.COMPANY_ADDRESS || 'г. Шушенское, ул. Цветочная, д. 15, стр. 1',

      // API configuration
      yandexMapsApiKey: process.env.YANDEX_MAPS_API_KEY || '530f8f5a-5fe8-44cc-a765-c7789796c570',

      // App configuration
      environment: process.env.NODE_ENV || 'development'
    }
  },

  css: ['~/assets/css/main.css'],

  // Enhanced Vite configuration for production
  vite: {
    server: {
      hmr: {
        clientPort: process.env.NODE_ENV === 'development' ? undefined : 443
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    },

    // Production optimizations
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk splitting for better caching
            vendor: ['vue', 'pinia'],
            // Separate chunks for better caching
            icons: ['@nuxt/icon'],
            utils: ['@vueuse/core', '@vueuse/nuxt']
          }
        }
      },
      // Reduce bundle size
      target: 'es2020',
      minify: 'esbuild'
    },

    // Define global constants for production
    define: {
      __DEV__: process.env.NODE_ENV === 'development'
    },

    // Performance optimizations
    optimizeDeps: {
      include: ['vue', 'pinia']
    }
  },

  // Development server configuration
  devServer: {
    host: process.env.DEV_HOST || '0.0.0.0',
    port: parseInt(process.env.DEV_PORT || '3000')
  },

  // Production optimizations
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    treeshakeClientOnly: true,
    // Enable for better performance
    asyncContext: false,
    typedPages: true
  },

  // Build configuration
  build: {
    analyze: process.env.ANALYZE === 'true',
    transpile: []
  },

  // TailwindCSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: process.env.NODE_ENV === 'development'
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 80
        }
      },
      thumbnail: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 70,
          width: 300,
          height: 300
        }
      }
    }
  },

  // Icon configuration
  icon: {
    size: '24px',
    class: 'icon',
    aliases: {
      'phone': 'material-symbols:phone',
      'email': 'material-symbols:email',
      'location': 'material-symbols:location-on'
    }
  },

  // Font optimization
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        subsets: ['latin', 'cyrillic']
      }
    ]
  },

  // Router configuration
  router: {
    options: {
      // Improve SEO with trailing slashes
      strict: false
    }
  }
})
