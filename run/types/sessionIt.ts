import {

  SupportedPlatformsType,
} from "../test/specs/utils/open_app";

export function androidIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  return it(`${title} android`, async () => {
    await test("android");
  });
}

export function iosIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<void>
) {
  return it(`${title} ios`, async () => {
    await test("ios");
  });
}

