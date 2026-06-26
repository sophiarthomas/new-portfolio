import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  host: true, // Listens on all local addresses
  port: 5173,
  watch: {
    usePolling: true, // Required for hot-reload to work inside Docker on some systems
    },
  },
})
