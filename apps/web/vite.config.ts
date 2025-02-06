import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: fileURLToPath(new URL("../api/public", import.meta.url)),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router"],
            "ant-design-vue": ["ant-design-vue"],
          },
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
      },
    },
  };
});
