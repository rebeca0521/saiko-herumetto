import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/saiko-herumetto/', // 👈 改為您的 GitHub Pages 倉庫專案目錄名稱，確保路徑完全正確
})


