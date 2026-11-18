import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.GITHUB_PAGES === '1' ? '/cfek/' : '/',
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
