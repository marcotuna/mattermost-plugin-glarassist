import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
        formats: ["umd"],
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'MattermostPlugin',
        fileName: () => `main.js`
    },
    outDir: 'dist',
    assetsDir: 'static'
  }
})