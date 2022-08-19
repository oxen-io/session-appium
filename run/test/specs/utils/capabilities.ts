import { DesiredCapabilities } from "@wdio/types/build/Capabilities";
import { getAndroidBinariesRoot } from "./binaries";

const androidAppFullPath = `${getAndroidBinariesRoot()}/session-1.13.1-x86.apk`;

let sharedCapabilities: DesiredCapabilities = {
  platformName: "Android",
  platformVersion: "11",
  app: androidAppFullPath,
  appPackage: "network.loki.messenger",
  appActivity: "network.loki.messenger.RoutingActivity",
  automationName: "UiAutomator2",
  browserName: "",
  newCommandTimeout: 300000,
};
let emulator1Udid = "emulator-5554";
let emulator2Udid = "emulator-5556";
let emulator3Udid = "emulator-5558";

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

export {
  sharedCapabilities,
  capabilities1,
  capabilities2,
  capabilities3,
  emulator1Udid,
  emulator2Udid,
  emulator3Udid,
  androidAppFullPath,
};
