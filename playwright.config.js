"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
module.exports = (0, test_1.defineConfig)({
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
//# sourceMappingURL=playwright.config.js.map