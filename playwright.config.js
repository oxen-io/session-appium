"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
module.exports = (0, test_1.defineConfig)({
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
//# sourceMappingURL=playwright.config.js.map