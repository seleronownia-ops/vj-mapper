import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
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
