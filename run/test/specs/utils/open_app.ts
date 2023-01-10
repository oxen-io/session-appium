import { main as appiumMain } from "appium";
import {
  androidCapabilities,
  getAndroidCapabilities,
  getAndroidUuid,
} from "./capabilities_android";
import { CapabilitiesIndexType, getIosCapabilities } from "./capabilities_ios";
import { installAppToDeviceName } from "./utilities";

import * as wd from "wd";
import { AppiumServer } from "@appium/types";

import * as androidDriver from "appium-uiautomator2-driver";
import * as iosDriver from "appium-xcuitest-driver";
import { DriverOpts } from "appium/build/lib/appium";

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

// export const openAppTwoDevicesAsArray = async (
//   platform: SupportedPlatformsType
// ): Promise<{
//   server: AppiumServer;
//   devices: ArrayLength2;
// }> => {
//   const server = await openAppiumServerOnly(platform);

//   const [app1, app2] = await Promise.all([
//     openAppOnPlatform(platform, 0, server),
//     openAppOnPlatform(platform, 1, server),
//   ]);

//   return { server, devices: [app1.device, app2.device] };
// };

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
  device: unknown;
}> => {
  const newServer: AppiumServer =
    server || (await openAppiumServerOnly("android"));
  console.warn("openAndroidApp server ", newServer ? "created" : "not created");

  await installAppToDeviceName(
    androidCapabilities.androidAppFullPath,
    getAndroidUuid(capabilitiesIndex)
  );
  console.warn(
    "installAppToDeviceName ",
    androidDriver.AndroidUiautomator2Driver
  );
  const opts: DriverOpts = {
    address: `http://localhost${APPIUM_PORT}`,
  };

  const device = new androidDriver.AndroidUiautomator2Driver(opts);

  const sess = await device.createSession(
    getAndroidCapabilities(capabilitiesIndex)
  );

  console.warn("android sess ", sess);
  console.warn("vdffd ", androidDriver.AndroidUiautomator2Driver.prototype);

  console.warn("dfdffdf ", await device.mobileGetBatteryInfo());

  // const device = await wd.promiseChainRemote('localhost', APPIUM_PORT);
  console.warn("installAppToDeviceName init before");

  // await device.init(getAndroidCapabilities(capabilitiesIndex));
  console.warn("installAppToDeviceName init after");
  return { server: newServer, device };
};

const openiOSApp = async (
  capabilitiesIndex: CapabilitiesIndexType,
  server: AppiumServer | null
): Promise<{
  server: AppiumServer;
  device: unknown;
}> => {
  console.warn("openiOSApp");
  const newServer = server || (await openAppiumServerOnly("ios"));
  console.warn("openiOSApp server ", newServer ? "created" : "not created");

  const opts: DriverOpts = {
    address: `http://localhost${APPIUM_IOS_PORT}`,
  };

  const device = new iosDriver.XCUITestDriver(opts);

  const sess = await device.createSession(
    getIosCapabilities(capabilitiesIndex)
  );

  console.warn("ios sess ", sess);
  console.warn("vdffd ios ", iosDriver.XCUITestDriver.prototype);

  // const device = await wd.promiseChainRemote("127.0.0.1", APPIUM_IOS_PORT);
  // console.warn("openiOSAp device ");

  // await device.init(getIosCapabilities(capabilitiesIndex));
  // console.warn("openiOSAp init ");

  // await device.dismissAlert();
  // console.warn("Alerts dismissed");

  return { server: newServer, device };
};

let serverAndroid: AppiumServer | undefined = undefined;
let serverIos: AppiumServer | undefined = undefined;
const openAppiumServerOnly = async (platform: SupportedPlatformsType) => {
  if (platform === "android") {
    if (!serverAndroid) {
      serverAndroid = await appiumMain({
        port: APPIUM_PORT,
        basePath: "/wd/hub",

        loglevel: "debug",
        sessionOverride: true,
        // host: "localhost",
        // setTimeout: 30000,
      });
    }

    return serverAndroid;
  }
  if (!serverIos) {
    serverIos = await appiumMain({
      port: 8102,
      loglevel: "debug",
      sessionOverride: true,
      // host: "127.0.0.1",

      // setTimeout: 30000,
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
  console.warn("device1", device1);
  await device1?.quit();
  await device2?.quit();
  await device3?.quit();
  await device4?.quit();

  console.info("waiting server close");

  await server.close();
  console.info("server closed");
};

// export const closeAppAsArray = async (
//   server: AppiumServer,
//   devices: ArrayLength1 | ArrayLength2 | ArrayLength3 | ArrayLength4
// ) => {
//   await Promise.all(devices.map((d) => d.quit()));
//   console.info("waiting server close");

//   await server.close();
//   console.info("server closed");
// };
