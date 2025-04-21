import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";
import { nodeResolve } from "@rollup/plugin-node-resolve";

dotenv.config();

export default defineConfig({
  build: {
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
});