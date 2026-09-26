import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      // Path aliases (app/*, components/*, hooks/*) come from tsconfig.app.json
      tsconfigPaths: true,
    },
  };
});
