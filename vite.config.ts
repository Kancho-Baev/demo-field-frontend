import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import graphql from '@rollup/plugin-graphql';

export default defineConfig({
  plugins: [react(), graphql()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
