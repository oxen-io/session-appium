import {
  closeApp,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "../test/specs/utils/open_app";

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

// type ArrayLengthMutationKeys =
//   | "splice"
//   | "push"
//   | "pop"
//   | "shift"
//   | "unshift"
//   | number;
// // tslint:disable-next-line: array-type
// type ArrayItems<T extends Array<any>> = T extends Array<infer TItems>
//   ? TItems
//   : never;
// export type FixedLengthArray<T extends Array<any>> = Pick<
//   T,
//   Exclude<keyof T, ArrayLengthMutationKeys>
// > & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

// export type ArrayLength1 = FixedLengthArray<[wd.PromiseWebdriver]>;
// export type ArrayLength2 = FixedLengthArray<
//   [wd.PromiseWebdriver, wd.PromiseWebdriver]
// >;
// export type ArrayLength3 = FixedLengthArray<
//   [wd.PromiseWebdriver, wd.PromiseWebdriver, wd.PromiseWebdriver]
// >;
// export type ArrayLength4 = FixedLengthArray<
//   [
//     wd.PromiseWebdriver,
//     wd.PromiseWebdriver,
//     wd.PromiseWebdriver,
//     wd.PromiseWebdriver
//   ]
// >;

// // ====== 2 devices

// export async function iosIt2Devices(
//   title: string,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: ArrayLength2
//   ) => Promise<any>
// ) {
//   return it2Devices(title, "ios", test);
// }

// export async function androidIt2Devices(
//   title: string,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: ArrayLength2
//   ) => Promise<any>
// ) {
//   return it2Devices(title, "android", test);
// }

// export async function it2Devices<T extends ArrayLength2 | ArrayLength3>(
//   title: string,
//   platform: SupportedPlatformsType,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: T
//   ) => Promise<any>
// ) {
//   return it(`${title} ${platform}`, async () => {
//     const { server, devices } = T exte await openAppTwoDevicesAsArray(platform);

//     try {
//       await test(platform, devices);
//     } catch (e) {
//       throw e;
//     } finally {
//       await closeAppAsArray(server, devices);
//     }
//   });
// }

// // ====== 3 devices

// export async function iosIt3Devices(
//   title: string,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: ArrayLength3
//   ) => Promise<any>
// ) {
//   return it3Devices(title, "ios", test);
// }

// export async function androidIt3Devices(
//   title: string,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: ArrayLength3
//   ) => Promise<any>
// ) {
//   return it3Devices(title, "android", test);
// }

// export async function it3Devices(
//   title: string,
//   platform: SupportedPlatformsType,
//   test: (
//     platform: SupportedPlatformsType,
//     devices: ArrayLength3
//   ) => Promise<any>
// ) {
//   return it(`${title} ${platform}`, async () => {
//     const { server, device1, device2, device3 } = await openAppThreeDevices(
//       platform
//     );
//     const arr3Devices: ArrayLength3 = [device1, device2, device3];

//     try {
//       await test(platform, arr3Devices);
//     } catch (e) {
//       throw e;
//     } finally {
//       await closeApp(server, device1, device2, device3);
//     }
//   });
// }
