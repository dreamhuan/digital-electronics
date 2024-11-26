import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/digital-electronics/', // 设置公共路径前缀
  plugins: [react()],
  build: {
    outDir: 'digital-electronics' // 修改输出目录的名称（默认是 dist）
  }
})
