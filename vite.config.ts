import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import';
import vitePluginImp from 'vite-plugin-imp'
const constants = {
  API_ORIGIN: "https://api-service.chanmama.com/v1",
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  })],
  server:{
    proxy:{
	//这里是通过请求/api 来转发到 https://api.pingping6.com/
	//假如你要请求https://api.*.com/a/a
	//那么axios的url，可以配置为 /api/a/a
      '/api': {
        target: 'https://api-service.chanmama.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    }
  }
})
