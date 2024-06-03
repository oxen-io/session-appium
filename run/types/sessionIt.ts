import { SupportedPlatformsType } from "../test/specs/utils/open_app";

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
