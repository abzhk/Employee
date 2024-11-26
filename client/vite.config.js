import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change this to your desired port
    open: true, // Automatically open the app in the browser
    proxy: {
      '/api': {
        target: 'http://localhost:7005', // Target backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If your backend is running on https and has self-signed cert
      },
    },
  },
});
