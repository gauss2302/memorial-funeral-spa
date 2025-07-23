interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_SITE_URL: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_PHONE_SECOND: string
  readonly VITE_COMPANY_EMAIL: string
  readonly VITE_COMPANY_ADDRESS: string
  readonly VITE_YANDEX_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
