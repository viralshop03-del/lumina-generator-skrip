import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' ./ memastikan aset dimuat secara relative, aman untuk deployment static/Vercel
  base: './',
});