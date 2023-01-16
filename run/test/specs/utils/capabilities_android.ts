import {
  AppiumAndroidCapabilities,
  AppiumW3CCapabilities,
  DesiredCapabilities,
} from "@wdio/types/build/Capabilities";
import {
  AppiumDriverConstraints,
  DriverOpts,
  W3CCapabilities,
} from "appium/build/lib/appium";

import { getAndroidBinariesRoot } from "./binaries";
import { CapabilitiesIndexType } from "./capabilities_ios";

const androidAppFullPath = `${getAndroidBinariesRoot()}/session-1.16.3-universal.apk`;

const sharedCapabilities: AppiumW3CCapabilities = {
  "appium:app": androidAppFullPath,

  "appium:platformName": "Android",
  "appium:platformVersion": "12",
  "appium:appPackage": "network.loki.messenger",
  "appium:appWaitActivity":
    "org.thoughtcrime.securesms.onboarding.LandingActivity",
  "appium:automationName": "UiAutomator2",
  "appium:newCommandTimeout": 300000,
};

const emulator1Udid = "emulator-5554";
const emulator2Udid = "emulator-5556";
const emulator3Udid = "emulator-5558";
const emulator4Udid = "emulator-5560";

const capabilities1: AppiumW3CCapabilities = {
  ...sharedCapabilities,
  "appium:udid": emulator1Udid,
};
const capabilities2: AppiumW3CCapabilities = {
  ...sharedCapabilities,
  "appium:udid": emulator2Udid,
};

const capabilities3: AppiumW3CCapabilities = {
  ...sharedCapabilities,
  "appium:udid": emulator3Udid,
};

const capabilities4: AppiumW3CCapabilities = {
  ...sharedCapabilities,
  "appium:udid": emulator4Udid,
};
const countOfAndroidCapabilities = 4;

const uuidsList = [emulator1Udid, emulator2Udid, emulator3Udid, emulator4Udid];

export const androidCapabilities = {
  sharedCapabilities,
  androidAppFullPath,
};

export function getAndroidCapabilities(
  capabilitiesIndex: CapabilitiesIndexType
): W3CCapabilities<any> {
  if (capabilitiesIndex >= countOfAndroidCapabilities) {
    throw new Error(`Asked invalid android cap index: ${capabilitiesIndex}`);
  }
  const caps =
    capabilitiesIndex === 0
      ? capabilities1
      : capabilitiesIndex === 1
      ? capabilities2
      : capabilitiesIndex === 2
      ? capabilities3
      : capabilities4;
  return {
    firstMatch: [{}, {}],
    alwaysMatch: {
      ...caps,
      "appium:udid": getAndroidUuid(capabilitiesIndex),
    },
  };
}
export function getAndroidUuid(uuidIndex: CapabilitiesIndexType) {
  if (uuidIndex >= countOfAndroidCapabilities) {
    throw new Error(`Asked invalid android uuid index: ${uuidIndex}`);
  }

  return uuidsList[uuidIndex];
}
