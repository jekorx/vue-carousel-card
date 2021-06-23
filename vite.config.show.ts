import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-carousel-card',
  plugins: [
    vue()
  ],
  build: {
    target: 'es2015'
  }
})
