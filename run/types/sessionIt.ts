import { SupportedPlatformsType } from "../test/specs/utils/open_app";
import { DeviceWrapper } from "./DeviceWrapper";
import { SetupData, User } from "./testing";

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
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  const testName = `${title} android`;
  return it(testName, async () => {
    console.info(`\n\n==========> Running "${testName}"\n\n`);
    await test("android");
  });
}

export function iosIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  const testName = `${title} ios`;

  return it(testName, async () => {
    console.info(`\n\n==========> Running "${testName}"\n\n`);
    await test("ios");
  });
}

export function mobileIt(
  platform: SupportedPlatformsType,
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  const testName = `${title} ${platform}`;

  return it(testName, async () => {
    console.info(`\n\n==========> Running "${testName}"\n\n`);
    await test(platform);
  });
}

export function bothPlatformsIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  // Define test for Android
  mobileIt("android", title, test);

  // Define test for iOS
  mobileIt("ios", title, test);
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
export function iosItWithSetup(
  title: string,
  setupData: SetupData,
  test: (setupData: {
    device1: DeviceWrapper;
    device2: DeviceWrapper;
    device3: DeviceWrapper;
    userA: User;
    userB: User;
  }) => Promise<void>
) {
  const testName = `${title} ios`;

  return it(testName, async () => {
    console.info(`\n\n==========> Running "${testName}" with setup data\n\n`);
    await test({
      device1: setupData.device1!,
      device2: setupData.device2!,
      device3: setupData.device3!,
      userA: setupData.userA!,
      userB: setupData.userB!,
    });
  });
}
