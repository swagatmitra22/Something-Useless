/// <reference types="vite/client" />

// This file ensures TypeScript knows about import.meta.env and its types for Vite projects.
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
