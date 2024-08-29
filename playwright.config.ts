/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */

import { defineConfig } from '@playwright/test';
import { toNumber } from 'lodash';

const useSessionReporter = true;
// NOTE: without this, the wrong source map is loaded and the stacktraces are all wrong
require('source-map-support').install = () => {};

export default defineConfig({
  timeout: 480000,
  globalTimeout: 10800000,
  reporter: [useSessionReporter ? ['./sessionReporter.ts'] : ['list']],
  testDir: './run/test/specs',
  testIgnore: '*.js',
  // outputDir: './tests/automation/test-results',
  retries: process.env.PLAYWRIGHT_RETRIES_COUNT
    ? toNumber(process.env.PLAYWRIGHT_RETRIES_COUNT)
    : 0,
  repeatEach: process.env.PLAYWRIGHT_REPEAT_COUNT
    ? toNumber(process.env.PLAYWRIGHT_REPEAT_COUNT)
    : 0,
  workers: process.env.PLAYWRIGHT_WORKERS_COUNT
    ? toNumber(process.env.PLAYWRIGHT_WORKERS_COUNT)
    : 1,
  reportSlowTests: null,
  fullyParallel: true, // otherwise, tests in the same file are not run in parallel
});
