import { test } from '@playwright/test';
import { SupportedPlatformsType } from '../test/specs/utils/open_app';

// async function itWithBufferHandling(testNameWithoutPlatform: string, platform: SupportedPlatformsType, testToRun: () => Promise<void>) {
//   try {
//     await testToRun();
//     clearBufferOfTest(testNameWithoutPlatform);
//   } catch (e) {
//     printBufferAndClear(testNameWithoutPlatform)
//     throw e;
//   }
// }

export function androidIt(
  title: string,
  testToRun: (platform: SupportedPlatformsType) => Promise<void>,
  shouldSkip = false
) {
  const testName = `${title} android`;
  if (shouldSkip) {
    // eslint-disable-next-line @typescript-eslint/require-await
    test.skip(testName, async () => {
      console.info(`\n\n==========> Skipping "${testName}"\n\n`);
    });
  } else {
    test(testName, async () => {
      console.info(`\n\n==========> Running "${testName}"\n\n`);
      await testToRun('android');
    });
  }
}

export function iosIt(
  title: string,
  testToRun: (platform: SupportedPlatformsType) => Promise<void>,
  shouldSkip = false
) {
  const testName = `${title} ios`;

  if (shouldSkip) {
    // eslint-disable-next-line @typescript-eslint/require-await
    test.skip(testName, async () => {
      console.info(`\n\n==========> Skipping "${testName}"\n\n`);
    });
  } else {
    test(testName, async () => {
      console.info(`\n\n==========> Running "${testName}"\n\n`);
      const startTime = Date.now();
      await testToRun('ios');
      const endTime = Date.now();
      console.info(`\n\n==========> Finished "${testName}" in ${endTime - startTime}ms\n\n`);
    });
  }
}

function mobileIt(
  platform: SupportedPlatformsType,
  title: string,
  testToRun: (platform: SupportedPlatformsType) => Promise<void>,
  shouldSkip = false
) {
  const testName = `${title} ${platform}`;
  if (shouldSkip) {
    // eslint-disable-next-line @typescript-eslint/require-await
    test.skip(testName, async () => {
      console.info(`\n\n==========> Skipping "${testName}"\n\n`);
    });
  } else {
    test(testName, async () => {
      console.info(`\n\n==========> Running "${testName}"\n\n`);
      await testToRun(platform);
    });
  }
}

export function bothPlatformsIt(
  title: string,
  testToRun: (platform: SupportedPlatformsType) => Promise<void>,
  shouldSkip = false
) {
  // Define test for Android
  mobileIt('android', title, testToRun, shouldSkip);

  // Define test for iOS
  mobileIt('ios', title, testToRun, shouldSkip);
}

// export function iosItWithSetup(
//   title: string,
//   test: (platform: SupportedPlatformsType) => Promise<void>
// ) {
//   const testName = `${title} ios`;

//   return it(testName, async () => {
//     console.info(`\n\n==========> Running "${testName}"\n\n`);
//     await test("ios");
//   });
// }

// Define the function to accept the title, a setup data object, and a test function that uses this object.
// export function iosItWithSetup(
//   title: string,
//   setupData: SetupData,
//   testToRun: (setupData: {
//     device1: DeviceWrapper;
//     device2: DeviceWrapper;
//     device3: DeviceWrapper;
//     userA: User;
//     userB: User;
//   }) => Promise<void>
// ) {
//   const testName = `${title} ios`;

//   return test(testName, async () => {
//     console.info(`\n\n==========> Running "${testName}" with setup data\n\n`);
//     await testToRun({
//       device1: setupData.device1!,
//       device2: setupData.device2!,
//       device3: setupData.device3!,
//       userA: setupData.userA!,
//       userB: setupData.userB!,
//     });
//   });
// }
