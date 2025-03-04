import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any aliases you might need
    },
  },
  assetsInclude: ["**/*.png"], // This line is important for the marker images
});
