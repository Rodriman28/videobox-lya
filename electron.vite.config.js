/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import react from '@vitejs/plugin-react'
import commonjsExternals from 'vite-plugin-commonjs-externals'

const externals = ['path', /^electron(\/.+)?$/]

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode)

  return {
    optimizeDeps: {
      exclude: externals,
      incluide: ['electron']
    },
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [
        react(),
        commonjsExternals({
          externals
        })
      ]
    }
  }
})
