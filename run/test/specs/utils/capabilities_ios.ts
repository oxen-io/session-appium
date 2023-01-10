import {
  AppiumW3CCapabilities,
  DesiredCapabilities,
} from '@wdio/types/build/Capabilities';
import {
  AppiumDriverConstraints,
  W3CCapabilities,
} from 'appium/build/lib/appium';

const iosAppFullPath = `/Users/emilyburton/Library/Developer/Xcode/DerivedData/Session-bkhewuibvlxdsxevpurvxorzvqpd/Build/Products/App Store Release-iphonesimulator/Session.app`;

let sharediOSCapabilities: AppiumW3CCapabilities = {
  'appium:platformName': 'iOS',
  'appium:platformVersion': '16.2',
  'appium:deviceName': 'iPhone 14 Pro Max',
  'appium:automationName': 'XCUITest',
  'appium:app': iosAppFullPath,
  'appium:bundleId': 'com.loki-project.loki-messenger',
  'appium:newCommandTimeout': 300000,
  // useNewWDA: true,

  'appium:showXcodeLog': true,
} as DesiredCapabilities;
export type CapabilitiesIndexType = 0 | 1 | 2 | 3;

function getIOSSimulatorUUIDFromEnv(index: CapabilitiesIndexType): string {
  return '';
  switch (index) {
    case 0:
      if (process.env.IOS_FIRST_SIMULATOR) {
        return process.env.IOS_FIRST_SIMULATOR as string;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_FIRST_SIMULATOR is not set`
      );
    case 1:
      if (process.env.IOS_SECOND_SIMULATOR) {
        return process.env.IOS_SECOND_SIMULATOR as string;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_SECOND_SIMULATOR is not set`
      );
    case 2:
      if (process.env.IOS_THIRD_SIMULATOR) {
        return process.env.IOS_THIRD_SIMULATOR as string;
      }
      throw new Error(
        `getSimulatorUUIDFromEnv process.env.IOS_THIRD_SIMULATOR is not set`
      );
    case 3:
      if (process.env.IOS_FOURTH_SIMULATOR) {
        return process.env.IOS_FOURTH_SIMULATOR as string;
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

const capabilities1: AppiumW3CCapabilities = {
  ...sharediOSCapabilities,
  'appium:udid': emulator1Udid,

  // wdaLocalPort: 8102,
};
const capabilities2: AppiumW3CCapabilities = {
  ...sharediOSCapabilities,

  'appium:udid': emulator2Udid,
  // wdaLocalPort: 8104,
};

const capabilities3: AppiumW3CCapabilities = {
  ...sharediOSCapabilities,
  'appium:udid': emulator3Udid,

  // wdaLocalPort: 8106,
};

const capabilities4: AppiumW3CCapabilities = {
  ...sharediOSCapabilities,
  'appium:udid': emulator4Udid,

  // wdaLocalPort: 8108,
};

const countOfIosCapabilities = 4;

export function getIosCapabilities(
  capabilitiesIndex: CapabilitiesIndexType
): W3CCapabilities<any> {
  if (capabilitiesIndex >= countOfIosCapabilities) {
    throw new Error(`Asked invalid ios cap index: ${capabilitiesIndex}`);
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
    },
  };
}
