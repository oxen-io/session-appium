import { main as appiumMain } from "appium";
import {
  androidCapabilities,
  getAndroidCapabilities,
  getAndroidUuid,
} from "./capabilities_android";
import { CapabilitiesIndexType, getIosCapabilities } from "./capabilities_ios";
import { installAppToDeviceName } from "./utilities";

import * as wd from "wd";
import { AppiumServer } from "../../../types/appiumServerType";

const APPIUM_PORT = 4728;
export const APPIUM_IOS_PORT = 8100;

export type SupportedPlatformsType = "android" | "ios";

const openAppOnPlatform = async (
  platform: SupportedPlatformsType,
  capabilitiesIndex: CapabilitiesIndexType,
  server: AppiumServer | null
): Promise<{
  server: AppiumServer;
  device: wd.PromiseWebdriver;
}> => {
  return platform === "ios"
    ? openiOSApp(capabilitiesIndex, server)
    : openAndroidApp(capabilitiesIndex, server);
};

export const openAppOnPlatformSingleDevice = async (
  platform: SupportedPlatformsType
): Promise<{
  server: AppiumServer;
  device: wd.PromiseWebdriver;
}> => {
  return openAppOnPlatform(platform, 0, null);
};

export const openAppTwoDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  server: AppiumServer;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
}> => {
  const server = await openAppiumServerOnly(platform);

  const [app1, app2] = await Promise.all([
    openAppOnPlatform(platform, 0, server),
    openAppOnPlatform(platform, 1, server),
  ]);

  return { server, device1: app1.device, device2: app2.device };
};

export const openAppThreeDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  server: AppiumServer;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
  device3: wd.PromiseWebdriver;
}> => {
  const server = await openAppiumServerOnly(platform);

  const [app1, app2, app3] = await Promise.all([
    openAppOnPlatform(platform, 0, server),
    openAppOnPlatform(platform, 1, server),
    openAppOnPlatform(platform, 2, server),
  ]);

  return {
    server,
    device1: app1.device,
    device2: app2.device,
    device3: app3.device,
  };
};

export const openAppFourDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  server: AppiumServer;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
  device3: wd.PromiseWebdriver;
  device4: wd.PromiseWebdriver;
}> => {
  const server = await openAppiumServerOnly(platform);

  const [app1, app2, app3, app4] = await Promise.all([
    openAppOnPlatform(platform, 0, server),
    openAppOnPlatform(platform, 1, server),
    openAppOnPlatform(platform, 2, server),
    openAppOnPlatform(platform, 3, server),
  ]);

  return {
    server,
    device1: app1.device,
    device2: app2.device,
    device3: app3.device,
    device4: app4.device,
  };
};

const openAndroidApp = async (
  capabilitiesIndex: CapabilitiesIndexType,
  server: AppiumServer | null
): Promise<{
  server: AppiumServer;
  device: wd.PromiseWebdriver;
}> => {
  const newServer: AppiumServer =
    server || (await openAppiumServerOnly("android"));

  await installAppToDeviceName(
    androidCapabilities.androidAppFullPath,
    getAndroidUuid(capabilitiesIndex)
  );

  const device = await wd.promiseChainRemote("localhost", APPIUM_PORT);

  await device.init(getAndroidCapabilities(capabilitiesIndex));

  return { server: newServer, device };
};

const openiOSApp = async (
  capabilitiesIndex: CapabilitiesIndexType,
  server: AppiumServer | null
): Promise<{
  server: AppiumServer;
  device: wd.PromiseWebdriver;
}> => {
  console.warn("openiOSApp");
  const newServer = server || (await openAppiumServerOnly("ios"));
  console.warn("openiOSApp server");

  const device = await wd.promiseChainRemote("127.0.0.1", APPIUM_IOS_PORT);
  console.warn("openiOSAp device ");

  await device.init(getIosCapabilities(capabilitiesIndex));
  console.warn("openiOSAp init ");

  await device.dismissAlert();
  console.warn("Alerts dismissed");

  return { server: newServer, device };
};

let serverAndroid: any = undefined;
let serverIos: any = undefined;
const openAppiumServerOnly = async (platform: SupportedPlatformsType) => {
  if (platform === "android") {
    if (!serverAndroid) {
      serverAndroid = appiumMain({
        port: APPIUM_PORT,
        host: "localhost",
        setTimeout: 30000,
      });
    }

    return serverAndroid;
  }
  if (!serverIos) {
    serverIos = appiumMain({
      port: APPIUM_IOS_PORT,
      host: "127.0.0.1",
      setTimeout: 30000,
    });
  }

  return serverIos;
};

export const closeApp = async (
  server: AppiumServer,
  device1?: wd.PromiseWebdriver,
  device2?: wd.PromiseWebdriver,
  device3?: wd.PromiseWebdriver,
  device4?: wd.PromiseWebdriver
) => {
  await device1?.quit();
  await device2?.quit();
  await device3?.quit();
  await device4?.quit();

  console.info("waiting server close");

  await server.close();
  console.info("server closed");
};
