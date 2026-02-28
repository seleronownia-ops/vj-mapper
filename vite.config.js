import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/vj-mapper/',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  server: {
    port: 5173,
    // HTTPS needed for camera access on non-localhost
    // Uncomment for remote access:
    // https: true,
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
});
