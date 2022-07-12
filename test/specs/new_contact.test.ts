import { newUser } from "./utils/create_account";
let Appium = require("appium");
let wd = require("wd");
// let capabilities = require("../../wdio-ios.conf");

describe("Contact", () => {
  it("Create new contact", async () => {
    let server = await Appium.main({
      port: 4723,
      host: "localhost",
      setTimeout: 30000,
    });
    let driver1 = await wd.promiseChainRemote("localhost", 4723);
    const capabilities1 = {
      platformName: "Android",
      udid: "emulator-5554",
      platformVersion: "11",
      app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-x86.apk",
      appPackage: "network.loki.messenger",
      appActivity: "network.loki.messenger.RoutingActivity",
      automationName: "UiAutomator2",
      browserName: "",
      newCommandTimeout: 300000,
    };

    let [sessionId1] = await driver1.init(capabilities1);

    sessionId1 = await newUser("user user user");
    // const userB = await newUser("User B");

    await server.close();
  }).timeout(300000);
});
