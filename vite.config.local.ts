import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config.base";

// Local development configuration
const localConfig = mergeConfig(
  baseConfig({ mode: 'development', command: 'serve' }),
  {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["localhost", "127.0.0.1", "10.0.0.102"],
      hmr: {
        overlay: false, // Disable error overlay to prevent URI malformed errors
        port: 8080, // Use same port as server
      },
      cors: true,
      proxy: {
        '/api': {
          target: 'https://stablecommerce.ai/mgmt/shop-api',
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        // Ignore config file changes to prevent restart loops
        ignored: ['**/vite.config.*.ts', '**/vite.config.ts'],
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
