import { AppiumXCUITestCapabilities } from "@wdio/types/build/Capabilities";
import { W3CCapabilities } from "@wdio/types/build/Capabilities";
const iosAppFullPath = `/Users/emilyburton/Downloads/session-ios-20240618T020520Z-a49a27207-sim/Session.app`;
// const iosAppFullPath = `/Users/emilyburton/Downloads/session-ios-fixed-regression/Session.app`;

const sharediOSCapabilities: AppiumXCUITestCapabilities = {
  "appium:app": iosAppFullPath,
  "appium:platformName": "iOS",
  "appium:platformVersion": "17.2",
  "appium:deviceName": "iPhone 15 Pro Max",
  "appium:automationName": "XCUITest",
  "appium:bundleId": "com.loki-project.loki-messenger",
  "appium:newCommandTimeout": 300000,
  "appium:useNewWDA": false,
  "appium:showXcodeLog": false,
  "appium:autoDismissAlerts": false,
  "appium:reduceMotion": true,
  // "appium:isHeadless": true,
} as AppiumXCUITestCapabilities;

export type CapabilitiesIndexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface CustomW3CCapabilities extends W3CCapabilities {
  "appium:wdaLocalPort": number;
  "appium:udid": string;
}

function getIOSSimulatorUUIDFromEnv(index: CapabilitiesIndexType): string {
  const envVars = [
    "IOS_FIRST_SIMULATOR",
    "IOS_SECOND_SIMULATOR",
    "IOS_THIRD_SIMULATOR",
    "IOS_FOURTH_SIMULATOR",
    "IOS_FIFTH_SIMULATOR",
    "IOS_SIXTH_SIMULATOR",
    "IOS_SEVENTH_SIMULATOR",
    "IOS_EIGHTH_SIMULATOR",
  ];

  const envVar = envVars[index];
  const uuid = process.env[envVar];

  if (!uuid) {
    throw new Error(`Environment variable ${envVar} is not set`);
  }

  return uuid;
}

const emulatorUUIDs = Array.from({ length: 8 }, (_, index) =>
  getIOSSimulatorUUIDFromEnv(index as CapabilitiesIndexType)
);

const capabilities = emulatorUUIDs.map((udid, index) => ({
  ...sharediOSCapabilities,
  "appium:udid": udid,
  "appium:wdaLocalPort": 1253 + index,
}));

export function getIosCapabilities(
  capabilitiesIndex: CapabilitiesIndexType
): W3CCapabilities {
  if (capabilitiesIndex >= capabilities.length) {
    throw new Error(`Asked invalid ios cap index: ${capabilitiesIndex}`);
  }

  const caps = capabilities[capabilitiesIndex];

  return {
    firstMatch: [{}],
    alwaysMatch: { ...caps },
  };
}

export function getCapabilitiesForWorker(
  workerId: number
): CustomW3CCapabilities {
  const emulator = capabilities[workerId % capabilities.length];
  return {
    ...sharediOSCapabilities,
    "appium:udid": emulator["appium:udid"],
    "appium:wdaLocalPort": emulator["appium:wdaLocalPort"],
  } as CustomW3CCapabilities;
}
