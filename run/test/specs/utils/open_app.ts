import {
  androidCapabilities,
  getAndroidCapabilities,
  getAndroidUuid,
} from "./capabilities_android";
import { CapabilitiesIndexType, getIosCapabilities } from "./capabilities_ios";
import { installAppToDeviceName, runScriptAndLog } from "./utilities";

import * as androidDriver from "appium-uiautomator2-driver";
import * as iosDriver from "appium-xcuitest-driver";

import { DriverOpts } from "appium/build/lib/appium";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getAdbFullPath } from "./binaries";

const APPIUM_PORT = 4728;
export const APPIUM_IOS_PORT = 8100;

export type SupportedPlatformsType = "android" | "ios";

const openAppOnPlatform = async (
  platform: SupportedPlatformsType,
  capabilitiesIndex: CapabilitiesIndexType
): Promise<{
  device: DeviceWrapper;
}> => {
  return platform === "ios"
    ? openiOSApp(capabilitiesIndex)
    : openAndroidApp(capabilitiesIndex);
};

export const openAppOnPlatformSingleDevice = async (
  platform: SupportedPlatformsType
): Promise<{
  device: DeviceWrapper;
}> => {
  return openAppOnPlatform(platform, 0);
};

export const openAppTwoDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  device1: DeviceWrapper;
  device2: DeviceWrapper;
}> => {
  const [app1, app2] = await Promise.all([
    openAppOnPlatform(platform, 0),
    openAppOnPlatform(platform, 1),
  ]);

  return { device1: app1.device, device2: app2.device };
};

export const openAppThreeDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  device1: DeviceWrapper;
  device2: DeviceWrapper;
  device3: DeviceWrapper;
}> => {
  const [app1, app2, app3] = await Promise.all([
    openAppOnPlatform(platform, 0),
    openAppOnPlatform(platform, 1),
    openAppOnPlatform(platform, 2),
  ]);

  return {
    device1: app1.device,
    device2: app2.device,
    device3: app3.device,
  };
};

export const openAppFourDevices = async (
  platform: SupportedPlatformsType
): Promise<{
  device1: DeviceWrapper;
  device2: DeviceWrapper;
  device3: DeviceWrapper;
  device4: DeviceWrapper;
}> => {
  const [app1, app2, app3, app4] = await Promise.all([
    openAppOnPlatform(platform, 0),
    openAppOnPlatform(platform, 1),
    openAppOnPlatform(platform, 2),
    openAppOnPlatform(platform, 3),
  ]);

  return {
    device1: app1.device,
    device2: app2.device,
    device3: app3.device,
    device4: app4.device,
  };
};

const openAndroidApp = async (
  capabilitiesIndex: CapabilitiesIndexType
): Promise<{
  device: DeviceWrapper;
}> => {
  await installAppToDeviceName(
    androidCapabilities.androidAppFullPath,
    getAndroidUuid(capabilitiesIndex)
  );
  const driver = (androidDriver as any).AndroidUiautomator2Driver;

  // console.warn('installAppToDeviceName ', driver);

  const opts: DriverOpts = {
    address: `http://localhost:${APPIUM_PORT}`,
  } as DriverOpts;

  const device: DeviceWrapper = new driver(opts);

  const wrappedDevice = new DeviceWrapper(device);

  const sess = await wrappedDevice.createSession(
    getAndroidCapabilities(capabilitiesIndex)
  );
  console.warn(`SessionID for android:${capabilitiesIndex}: "${sess[0]}"`);

  return { device: wrappedDevice };
};

const openiOSApp = async (
  capabilitiesIndex: CapabilitiesIndexType
): Promise<{
  device: DeviceWrapper;
}> => {
  console.warn("openiOSApp");

  const opts: DriverOpts = {
    address: `http://localhost:${APPIUM_PORT}`,
  } as DriverOpts;
  const driver = (iosDriver as any).XCUITestDriver;

  const device: DeviceWrapper = new driver(opts);
  const wrappedDevice = new DeviceWrapper(device);

  const sess = await wrappedDevice.createSession(
    getIosCapabilities(capabilitiesIndex)
  );
  console.warn(
    `SessionID for iOS:${capabilitiesIndex}: "${JSON.stringify(sess)}"`
  );

  return { device: wrappedDevice };
};

export const closeApp = async (
  device1?: DeviceWrapper,
  device2?: DeviceWrapper,
  device3?: DeviceWrapper,
  device4?: DeviceWrapper
) => {
  await device1?.deleteSession();
  await device2?.deleteSession();
  await device3?.deleteSession();
  await device4?.deleteSession();

  console.info("sessions closed");

  console.info("killing adb server");
  await runScriptAndLog(`${getAdbFullPath()} kill-server`);
};
