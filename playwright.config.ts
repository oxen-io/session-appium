import { defineConfig } from "@playwright/test";

module.exports = defineConfig({
  testDir: "./run/test/specs",
  fullyParallel: true,
  retries: 0,
  timeout: 300000,
  workers: 4,
  testMatch: "*.spec.ts",
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: "list",
});
