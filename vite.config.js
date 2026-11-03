import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base = '/NihonStudy/' khi deploy lên GitHub Pages (https://nhanlequy12.github.io/NihonStudy/)
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/NihonStudy/' : '/',
})
