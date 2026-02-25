import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'https://chat-api.artfricastudio.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
