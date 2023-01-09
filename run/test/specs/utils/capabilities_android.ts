import { DesiredCapabilities } from "@wdio/types/build/Capabilities";
import { getAndroidBinariesRoot } from "./binaries";
import { CapabilitiesIndexType } from "./capabilities_ios";

const androidAppFullPath = `${getAndroidBinariesRoot()}/session-1.16.0-x86.apk`;

const sharedCapabilities: DesiredCapabilities = {
  platformName: "Android",
  platformVersion: "12",
  app: androidAppFullPath,
  appPackage: "network.loki.messenger",
  appActivity: "network.loki.messenger.RoutingActivity",
  automationName: "UiAutomator2",
  browserName: "",
  newCommandTimeout: 300000,
};

const emulator1Udid = "emulator-5554";
const emulator2Udid = "emulator-5556";
const emulator3Udid = "emulator-5558";
const emulator4Udid = "emulator-5560";

const capabilities1: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator1Udid,
};
const capabilities2: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator2Udid,
};

const capabilities3: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator3Udid,
};

const capabilities4: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator4Udid,
};

const capabilitiesList = [
  capabilities1,
  capabilities2,
  capabilities3,
  capabilities4,
];
const uuidsList = [emulator1Udid, emulator2Udid, emulator3Udid, emulator4Udid];

export const androidCapabilities = {
  sharedCapabilities,
  androidAppFullPath,
};

const countOfAndroidCapabilities = capabilitiesList.length;

export function getAndroidCapabilities(
  capabilitiesIndex: CapabilitiesIndexType
) {
  if (capabilitiesIndex >= countOfAndroidCapabilities) {
    throw new Error(`Asked invalid android cap index: ${capabilitiesIndex}`);
  }
  return capabilitiesList[capabilitiesIndex];
}
export function getAndroidUuid(uuidIndex: CapabilitiesIndexType) {
  if (uuidIndex >= countOfAndroidCapabilities) {
    throw new Error(`Asked invalid android uuid index: ${uuidIndex}`);
  }

  return uuidsList[uuidIndex];
}
