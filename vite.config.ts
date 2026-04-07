import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    hmr: true, // This is the default; ensure it's not set to false!
    // Optional: Customize HMR port (if default 24678 is blocked)
  }
})
