import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/news_project/", 
  build: {
		outDir: 'dist', 
	  },
  plugins: [react()],
})
