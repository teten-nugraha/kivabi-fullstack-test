import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // Expose env variables to the client
    define: {
      'process.env': env
    },
    server: {
      port: 5173,
      strictPort: true, // ❗ Will fail if port is already in use
    },
  }
})
