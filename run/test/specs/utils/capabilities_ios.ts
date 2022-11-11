import { DesiredCapabilities } from "@wdio/types/build/Capabilities";

const iosAppFullPath = `/Users/emilyburton/Desktop/Session.app`;

let sharediOSCapabilities: DesiredCapabilities = {
  platformName: "iOS",
  platformVersion: "16.1",
  deviceName: "iPhone 13 Pro Max",
  automationName: "XCUITest",
  app: iosAppFullPath,
  bundleId: "com.loki-project.loki-messenger",
  autoAcceptAlerts: true,
  newCommandTimeout: 30000,
  useNewWDA: true,
  // wdaLocalPort: 8102,
  // showXcodeLog: true,
  // showIOSLog: true,
} as DesiredCapabilities;
export type CapabilitiesIndexType = 0 | 1 | 2 | 3;

function getIOSSimulatorUUIDFromEnv(index: CapabilitiesIndexType): string {
  switch (index) {
    case 0:
      if (process.env.IOS_FIRST_SIMULATOR) {
        return process.env.IOS_FIRST_SIMULATOR;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_FIRST_SIMULATOR is not set`
      );
    case 1:
      if (process.env.IOS_SECOND_SIMULATOR) {
        return process.env.IOS_SECOND_SIMULATOR;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_SECOND_SIMULATOR is not set`
      );
    case 2:
      if (process.env.IOS_THIRD_SIMULATOR) {
        return process.env.IOS_THIRD_SIMULATOR;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_THIRD_SIMULATOR is not set`
      );
    case 3:
      if (process.env.IOS_FOURTH_SIMULATOR) {
        return process.env.IOS_FOURTH_SIMULATOR;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_THIRD_SIMULATOR is not set`
      );
    default:
      throw new Error(`getSimulatorUUIDFromEnv unknown index: ${index}`);
  }
}

const emulator1Udid = getIOSSimulatorUUIDFromEnv(0);
const emulator2Udid = getIOSSimulatorUUIDFromEnv(1);
const emulator3Udid = getIOSSimulatorUUIDFromEnv(2);
const emulator4Udid = getIOSSimulatorUUIDFromEnv(3);

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

const capabilities4: DesiredCapabilities = {
  ...sharediOSCapabilities,
  udid: emulator4Udid,
  wdaLocalPort: 8108,
} as DesiredCapabilities;

const capabilitiesList = [
  capabilities1,
  capabilities2,
  capabilities3,
  capabilities4,
];
const uuidsList = [emulator1Udid, emulator2Udid, emulator3Udid, emulator4Udid];

export const iosCapabilities = {
  sharediOSCapabilities,
  iosAppFullPath,
};

const countOfIosCapabilities = capabilitiesList.length;

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
