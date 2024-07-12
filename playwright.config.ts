import { defineConfig } from "@playwright/test";

module.exports = defineConfig({
  testDir: "./run/test/specs",
  fullyParallel: true,
  retries: 0,
  timeout: 300000,
  workers: 2,
  testMatch: "*.spec.ts",
  reporter: "./sessionReporter.ts",
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
