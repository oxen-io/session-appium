let Appium = require("appium");
const { TIMEOUT } = require("dns");
const { describe, it } = require("mocha");
let wd = require("wd");
let config = require("./wdio.conf.js");
const landingPage = require("./test/specs/pageObjects/landing-page.page");
// import { newUser } from "./utils/create_account";

describe("Start server", () => {
  it("test should open server", async () => {
    let server = await Appium.main({
      port: 4723,
      host: "localhost",
      setTimeout: 30000,
    });
    let driver1 = await wd.promiseChainRemote("localhost", 4723);
    let driver2 = await wd.promiseChainRemote("localhost", 4723);
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
    const capabilities2 = {
      platformName: "Android",
      udid: "emulator-5556",
      platformVersion: "11",
      app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-x86.apk",
      appPackage: "network.loki.messenger",
      appActivity: "network.loki.messenger.RoutingActivity",
      automationName: "UiAutomator2",
      browserName: "",
      newCommandTimeout: 300000,
    };
    let [sessionId1] = await driver1.init(capabilities1);
    let [sessionId2] = await driver2.init(capabilities2);
    console.log("TEST");
    console.log("TEST", sessionId1);
    console.log("Test", sessionId2);

    // sessionId1 = await newUser("Test User");
    // server now running
    await server.close();
  }).timeout(300000);
});
