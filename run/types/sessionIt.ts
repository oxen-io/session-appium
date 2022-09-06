import { SupportedPlatformsType } from "../test/specs/utils/open_app";

export async function androidIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<any>
) {
  return it(`${title} android`, async () => {
    await test("android");
  });
}

export async function iosIt(
  title: string,
  test: (platform: SupportedPlatformsType) => Promise<any>
) {
  return it(`${title} ios`, async () => {
    await test("ios");
  });
}
