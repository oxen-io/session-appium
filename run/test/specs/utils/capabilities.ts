import { DesiredCapabilities } from "@wdio/types/build/Capabilities";
import { getAndroidBinariesRoot } from "./binaries";

const androidAppFullPath = `${getAndroidBinariesRoot()}/session-1.13.1-universal.apk`;

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

const capabilities1: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator1Udid,
};
const capabilities2: DesiredCapabilities = {
  ...sharedCapabilities,
  udid: emulator2Udid,
};

export {
  sharedCapabilities,
  capabilities1,
  capabilities2,
  emulator1Udid,
  emulator2Udid,
  androidAppFullPath,
};
