import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  server: {
    port: 3000, // Opcional: Cambia el puerto si lo deseas
    open: true, // Abre automáticamente el navegador al iniciar el servidor de desarrollo
  },
  resolve: {
    alias: {
      '@': '/src', // Alias opcional para acortar rutas de importación
    },
  },
});
