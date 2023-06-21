/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  androidCapabilities,
  getAndroidCapabilities,
  getAndroidUdid,
} from "./capabilities_android";
import { CapabilitiesIndexType, getIosCapabilities } from "./capabilities_ios";
import { installAppToDeviceName, runScriptAndLog } from "./utilities";

import * as androidDriver from "appium-uiautomator2-driver";
import * as iosDriver from "appium-xcuitest-driver";

import { DriverOpts } from "appium/build/lib/appium";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import {
  getAdbFullPath,
  getAvdManagerFullPath,
  getEmulatorFullPath,
} from "./binaries";
import { sleepFor } from "./sleep_for";

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

async function createAndroidEmulator(emulatorName: string) {
  const createCmd = `echo "no" | ${getAvdManagerFullPath()} create avd --name ${emulatorName} -k 'system-images;android-31;google_apis;arm64-v8a' --force --skin pixel_5`
  console.warn(createCmd)
  await runScriptAndLog(
    createCmd
  );
  return emulatorName;
}

async function startAndroidEmulator(emulatorName: string) {
  await runScriptAndLog(`echo "hw.lcd.density=440" >> ~/.android/avd/${emulatorName}.avd/config.ini
  `)
  const startEmulatorCmd =  `${getEmulatorFullPath()} @${emulatorName} -no-snapshot`;
  console.warn(`${startEmulatorCmd} & ; disown`)
  await runScriptAndLog(
    startEmulatorCmd // -netdelay none -no-snapshot -wipe-data
  );
}

async function isEmulatorRunning(emulatorName: string) {
  const failedWith = await runScriptAndLog(
    `${getAdbFullPath()} -s ${emulatorName} get-state;`, true
  );

  return    !failedWith ||
    !(failedWith.includes("error") || failedWith.includes("offline"));
}

async function waitForEmulatorToBeRunning(emulatorName: string) {
  let start = Date.now();
  let found = false;

  do {
    found = await isEmulatorRunning(emulatorName)
    await sleepFor(500);
  } while (Date.now() - start < 25000 && !found);

  if (!found) {
    return;
  }

  start = Date.now();

  do {
    const bootedOrNah = await runScriptAndLog(
      `${getAdbFullPath()} -s  "${emulatorName}" shell getprop sys.boot_completed;`
    );

    found = bootedOrNah.includes("1");

    await sleepFor(500);
  } while (Date.now() - start < 25000 && !found);

  return found;
}

const openAndroidApp = async (
  capabilitiesIndex: CapabilitiesIndexType
): Promise<{
  device: DeviceWrapper;
}> => {
  // await killAdbIfNotAlreadyDone();
  const targetName = getAndroidUdid(capabilitiesIndex);

  const emulatorAlreadyRunning = await isEmulatorRunning(targetName);
  console.warn('emulatorAlreadyRunning', targetName, emulatorAlreadyRunning)
  if(!emulatorAlreadyRunning) {
    await createAndroidEmulator(targetName);
    void startAndroidEmulator(targetName);
  }
  await waitForEmulatorToBeRunning(targetName);
  console.log(targetName, " emulator booted");

  await installAppToDeviceName(
    androidCapabilities.androidAppFullPath,
    targetName
  );
  const driver = (androidDriver as any).AndroidUiautomator2Driver;

  // console.warn('installAppToDeviceName ', driver);

  const opts: DriverOpts = {
    address: `http://localhost:${APPIUM_PORT}`,
  } as DriverOpts;

  const device: DeviceWrapper = new driver(opts);
  const wrappedDevice = new DeviceWrapper(device);

  await runScriptAndLog(`adb -s ${targetName} shell settings put global heads_up_notifications_enabled 0
  `)

  await wrappedDevice.createSession(
    getAndroidCapabilities(capabilitiesIndex)
  );
  // this is required to make PopupWindow show up from the Android SDK
  // this `any` was approved by Audric
  await (device as any).updateSettings({
    ignoreUnimportantViews: false,
    allowInvisibleElements: true,
    enableMultiWindows: true,
  });
  // console.warn(`SessionID for android:${capabilitiesIndex}: "${sess[0]}"`);

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

  const caps = getIosCapabilities(capabilitiesIndex);
  await wrappedDevice.createSession(caps);

  // deny notification
  // await wrappedDevice.clickOnElement("Don’t Allow");

  return { device: wrappedDevice };
};

// let adbAlreadyKilled = false;

// async function killAdbIfNotAlreadyDone() {
//   if (adbAlreadyKilled) {
//     return;
//   }
//   return;

//   // console.info("killing adb server");
//   // adbAlreadyKilled = true;

//   // await runScriptAndLog(`${getAdbFullPath()} kill-server`);
//   // await sleepFor(2000);
//   // await runScriptAndLog(`${getAdbFullPath()} start-server`);

//   // await sleepFor(2000);
// }

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
};
