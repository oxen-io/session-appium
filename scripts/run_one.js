/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const testPlatformToRun = process.argv[2];
const testStringToRun = process.argv[3];

const { execSync } = require("child_process");

execSync(`npm run test-one "${testStringToRun} ${testPlatformToRun}"`, {
  stdio: "inherit",
});
