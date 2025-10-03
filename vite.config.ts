import { loadEnv, ConfigEnv } from "vite";
import baseConfig from "./vite.config.base";
import localConfig from "./vite.config.local";
import prodConfig from "./vite.config.prod";

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine which configuration to use
  if (mode === 'local' || env.VITE_ENV === 'local') {
    return localConfig;
  }
  
  if (mode === 'production' || env.VITE_ENV === 'production') {
    return prodConfig;
  }
  
  // Default to local config for development (not base config)
  return localConfig;
};
