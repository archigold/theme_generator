import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config.base";
import fs from "fs";

// Production configuration
const prodConfig = mergeConfig(
  baseConfig({ mode: 'production', command: 'build' }),
  {
    server: {
      host: "::",
      port: 443,
      https: {
        key: fs.readFileSync("/etc/letsencrypt/live/stablecommerce.ai/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/stablecommerce.ai/fullchain.pem"),
      },
      allowedHosts: ["stablecommerce.ai", "www.stablecommerce.ai"],
      hmr: {
        overlay: false,
        port: 443,
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      __ENV__: JSON.stringify('production'),
    },
  }
);

export default prodConfig;
