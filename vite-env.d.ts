/// <reference types="vite/client" />

declare interface ImportMeta {
  /**
   * Vite-specific helper to import multiple assets eagerly.
   * See: https://vitejs.dev/guide/features.html#glob-import
   */
  globEager(pattern: string): Record<string, { default: string }>;
}
