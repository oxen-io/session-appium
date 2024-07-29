/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
import { defineConfig } from '@playwright/test';
import { isEmpty, toNumber } from 'lodash';

const useSessionReporter = true;

export default defineConfig({
  timeout: 350000,
  globalTimeout: 6000000,
  reporter: [useSessionReporter ? ['./sessionReporter.ts'] : ['list']],
  testDir: './run/test/specs',
  testIgnore: '*.js',
  outputDir: './tests/automation/test-results',
  retries: process.env.PLAYWRIGHT_RETRIES_COUNT
    ? toNumber(process.env.PLAYWRIGHT_RETRIES_COUNT)
    : 0,
  repeatEach: process.env.PLAYWRIGHT_REPEAT_COUNT
    ? toNumber(process.env.PLAYWRIGHT_REPEAT_COUNT)
    : 0,
  workers: 2,
  reportSlowTests: null,
  fullyParallel: true, // otherwise, tests in the same file are not run in parallel
});
