import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src", // trỏ vào thư mục src
  base: "./",
  plugins: [zaloMiniApp(), react()],
  build: {
    outDir: "../dist", // build ra ngoài src, vào thư mục dist
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
