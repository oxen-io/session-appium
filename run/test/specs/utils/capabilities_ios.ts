import { DesiredCapabilities } from "@wdio/types/build/Capabilities";

const iosAppFullPath = `/Users/emilyburton/Desktop/Session.app`;

let sharediOSCapabilities: DesiredCapabilities = {
  platformName: "iOS",
  platformVersion: "15.5",
  deviceName: "iPhone 13 Pro Max",
  automationName: "XCUITest",
  app: iosAppFullPath,
  bundleId: "com.loki-project.loki-messenger",
  autoAcceptAlerts: true,
  useNewWDA: true,
  // wdaLocalPort: 8102,
  // showXcodeLog: true,
  // showIOSLog: true,
} as DesiredCapabilities;

let emulator1Udid = "6D6ED174-EEEF-47AD-A666-4501D5965FFF";
let emulator2Udid = "9C3D1DFD-2861-457E-9E7B-FDD0542EEEC2";
let emulator3Udid = "8D1E4AD6-059F-421C-94D4-45EAEBCE49E2";

const capabilities1: DesiredCapabilities = {
  ...sharediOSCapabilities,
  udid: emulator1Udid,
  wdaLocalPort: 8102,
} as DesiredCapabilities;
const capabilities2: DesiredCapabilities = {
  ...sharediOSCapabilities,
  udid: emulator2Udid,
  wdaLocalPort: 8104,
} as DesiredCapabilities;

const capabilities3: DesiredCapabilities = {
  ...sharediOSCapabilities,
  udid: emulator3Udid,
  wdaLocalPort: 8106,
} as DesiredCapabilities;

const capabilitiesList = [capabilities1, capabilities2, capabilities3];
const uuidsList = [emulator1Udid, emulator2Udid, emulator3Udid];

export const iosCapabilities = {
  sharediOSCapabilities,
  iosAppFullPath,
};

const countOfIosCapabilities = capabilitiesList.length;
export type CapabilitiesIndexType = 0 | 1 | 2;

export function getIosCapabilities(capabilitiesIndex: CapabilitiesIndexType) {
  if (capabilitiesIndex >= countOfIosCapabilities) {
    throw new Error(`Asked invalid ios cap index: ${capabilitiesIndex}`);
  }
  return capabilitiesList[capabilitiesIndex];
}

export function getIosUuid(uuidIndex: CapabilitiesIndexType) {
  if (uuidIndex >= countOfIosCapabilities) {
    throw new Error(`Asked invalid ios uuid index: ${uuidIndex}`);
  }

  return uuidsList[uuidIndex];
}
