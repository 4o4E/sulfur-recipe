import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'prod'

  return {
    plugins: [
      vue(),
      vueJsx(),
      vuetify({ autoImport: true }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    build: {
      sourcemap: !isProd,
      rollupOptions: {
        external: ['vue'],
        output: {
          format: 'iife',
          globals: {
            vue: 'Vue',
            pinia: 'Pinia',
            vuetify: 'Vuetify'
          }
        }
      }
    },
  }
})
