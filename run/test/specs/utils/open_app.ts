import { main as appiumMain } from "appium";
import {
  androidCapabilities,
  getAndroidCapabilities,
  getAndroidUuid,
} from "./capabilities_android";
import { iosCapabilities } from "./capabilities_ios";
import { installAppToDeviceName, installiOSAppToDeviceName } from "./utilities";

import * as wd from "wd";

const APPIUM_PORT = 4728;
export const APPIUM_IOS_PORT = 8100;

export type SupportedPlatformsType = "android" | "ios";

export const openAppOnPlatform = async (
  platform: SupportedPlatformsType
): Promise<{
  server: any;
  device: wd.PromiseWebdriver;
}> => {
  return platform === "ios" ? openiOSApp() : openAndroidApp();
};

const openAndroidApp = async (
  capabilitiesIndex: 0 | 1 | 2
): Promise<{
  server: any;
  device: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await installAppToDeviceName(
    androidCapabilities.androidAppFullPath,
    getAndroidUuid(capabilitiesIndex)
  );

  const device = await wd.promiseChainRemote("localhost", APPIUM_PORT);

  await device.init(getAndroidCapabilities(capabilitiesIndex));

  return { server, device };
};

const openiOSApp = async (): Promise<{
  server: any;
  device: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_IOS_PORT,
    host: "127.0.0.1",
    setTimeout: 30000,
    // basePath: "/wd/hub/",
  });
  await installiOSAppToDeviceName(
    iosCapabilities.iosAppFullPath,
    iosCapabilities.emulator1Udid
  );

  const device = await wd.promiseChainRemote("127.0.0.1", APPIUM_IOS_PORT);

  await device.init(iosCapabilities.capabilities1);

  return { server, device };
};

export const openAppTwoDevices = async (): Promise<{
  server: any;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await Promise.all([
    installAppToDeviceName(
      androidCapabilities.androidAppFullPath,
      androidCapabilities.emulator1Udid
    ),
    installAppToDeviceName(
      androidCapabilities.androidAppFullPath,
      androidCapabilities.emulator2Udid
    ),
  ]);

  const [device1, device2] = await Promise.all([
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
  ]);
  await Promise.all([
    device1.init(androidCapabilities.capabilities1),
    device2.init(androidCapabilities.capabilities2),
  ]);
  return { server, device1, device2 };
};

export const openAppThreeDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  server: any;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
  device3: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await Promise.all([
    installAppToDeviceName(
      androidCapabilities.androidAppFullPath,
      androidCapabilities.emulator1Udid
    ),
    installAppToDeviceName(
      androidCapabilities.androidAppFullPath,
      androidCapabilities.emulator2Udid
    ),
    installAppToDeviceName(
      androidCapabilities.androidAppFullPath,
      androidCapabilities.emulator3Udid
    ),
  ]);
  const [device1, device2, device3] = await Promise.all([
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
  ]);
  await Promise.all([
    device1.init(androidCapabilities.capabilities1),
    device2.init(androidCapabilities.capabilities2),
    device3.init(androidCapabilities.capabilities3),
  ]);
  return { server, device1, device2, device3 };
};

export const closeApp = async (
  server: any,
  device1?: wd.PromiseWebdriver,
  device2?: wd.PromiseWebdriver,
  device3?: wd.PromiseWebdriver
) => {
  await device1?.quit();
  await device2?.quit();
  await device3?.quit();

  console.info("waiting server close");

  await server.close();
  console.info("server closed");
};
