/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_PORT: string
  readonly VITE_MONGODB_URI: string
  readonly VITE_FRONTEND_URL: string
  readonly VITE_CHAPA_SECRET_KEY: string
  readonly VITE_CHAPA_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}