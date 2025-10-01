import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config.base";

// Local development configuration
const localConfig = mergeConfig(
  baseConfig({ mode: 'local', command: 'serve' }),
  {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["localhost", "127.0.0.1", "10.0.0.102"],
      hmr: {
        overlay: false, // Disable error overlay to prevent URI malformed errors
        port: 8081,
      },
      cors: true,
      proxy: {
        '/api': {
          target: 'https://stablecommerce.ai/mgmt',
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: true,
      minify: false,
    },
    define: {
      __ENV__: JSON.stringify('local'),
    },
  }
);

export default localConfig;
