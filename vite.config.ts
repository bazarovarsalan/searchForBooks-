import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    testTimeout: 60000,
    include: ["**/*.{test,spec}.{js,mjs,ts}"],
  },
});
