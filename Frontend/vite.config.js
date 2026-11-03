import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const backend = process.env.VITE_API_PROXY_TARGET || 'http://localhost:8007'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: backend,
        changeOrigin: true,
      },
      '/media': {
        target: backend,
        changeOrigin: true,
      },
    },
  },
})
