import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx'
      },
      shared: ['react','react-dom']
    })
  ],
  build: {
    target: 'esnext', // Cambia el target para soportar top-level await
    minify: false,
    cssCodeSplit: false
  },
  server: { port: 5174 }
})
