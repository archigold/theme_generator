import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config.base";
import fs from "fs";
import path from "path";

// Production configuration
const prodConfig = mergeConfig(
  baseConfig({ mode: 'production', command: 'build' }),
  {
    server: {
      host: "::",
      port: 443,
      // Only enable HTTPS if SSL certificates exist
      ...(fs.existsSync("/etc/letsencrypt/live/stablecommerce.ai/privkey.pem") && 
          fs.existsSync("/etc/letsencrypt/live/stablecommerce.ai/fullchain.pem") ? {
        https: {
          key: fs.readFileSync("/etc/letsencrypt/live/stablecommerce.ai/privkey.pem"),
          cert: fs.readFileSync("/etc/letsencrypt/live/stablecommerce.ai/fullchain.pem"),
        },
      } : {
        // Fallback to HTTP for development or when certificates don't exist
        port: 3000,
      }),
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
