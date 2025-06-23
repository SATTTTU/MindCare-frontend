import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ✅ Add this

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve( 'src')
    },
  },
})

