import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192x192.png', 'icons/icon-512x512.webp'],
      manifest: {
        name: 'FakeChat',
        short_name: 'FakeChat',
        description: 'FakeChat for make Fake and fun chatting',
        start_url: '/',
        display: 'standalone',
        background_color: '#006aff',
        theme_color: '#000000',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.webp',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
