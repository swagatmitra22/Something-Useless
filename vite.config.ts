import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5175, // Change this to your desired port
    open: true, // Optional: opens browser automatically
  },
})
