const Appium = require('appium');
const AppiumServiceBuilder = require('AppiumServiceBuilder');

deviceA = {
  capabilities: {
    alwaysMatch: {
      platformName: "Android",
      udid: "emulator-5556",
      platformVersion: "11",
      app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-x86.apk",
      appPackage: "network.loki.messenger",
      appActivity: "network.loki.messenger.RoutingActivity",
      automationName: "Appium",
      browserName: "",
    },
  },
};
export const startAppiumServer() => {
  AppiumServiceBuilder
}

describe("Start", () => {
  it("Start appium server", async () => {
    const deviceA = await startAppiumServer() => {

    }
  })
});
