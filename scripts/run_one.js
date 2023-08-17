const testPlatformToRun = process.argv[2];
const testStringToRun = process.argv[3];

const { execSync } = require('child_process');

execSync(`yarn test-one "${testStringToRun} ${testPlatformToRun}"`, {
  stdio: 'inherit',
});
