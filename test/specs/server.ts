let Appium = require("appium");
// import { describe, it } from "mocha";
let wd = require("wd");
let wdio = require("webdriverio");
const {
  clickOnElement,
  saveText,
  inputText,
  longPress,
} = require("./utils/utilities.ts");
const createAccount = require("./utils/create_account.ts");

const capabilities1 = {
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
const capabilities2 = {
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

describe("Start server", () => {
  it("test should open server", async () => {
    let server = await Appium.main({
      port: 4723,
      host: "localhost",
      setTimeout: 30000,
    });

    let device1 = await wd.promiseChainRemote("localhost", 4723);

    // let device2 = await wd.promiseChainRemote("localhost", 4723);
    await device1.init(capabilities1);

    // await device2.init(capabilities2);
    await createAccount.newUser(device1, "User A");
    // Create user in device 1
    // await clickOnElement(device1, "Create Session ID");
    // // Save session ID
    // await device1.setImplicitWaitTimeout(5000);
    // const sessionID = await saveText(device1, "Session ID");
    // console.log(sessionID);
    // // Click continue on session Id creation
    // await clickOnElement(device1, "Continue");
    // // type in display name
    // await inputText(device1, "Enter display name", "User A");
    // // click continue on display name page
    // await clickOnElement(device1, "Continue");
    // // click continue on message notification page
    // await clickOnElement(device1, "Continue with settings");
    // // click continue on recovery phrase banner
    // await clickOnElement(device1, "Continue");
    // // long press on recovery phrase to reveal

    // await longPress(device1, "Recovery Phrase");
    // // save recovery phrase
    // const recoveryPhrase = await saveText(device1, "Recovery Phrase");
    // console.log("Recovery Phrase is", recoveryPhrase);
    // // Exit Modal
    // await clickOnElement(device1, "Navigate up");
    // clickOnElement(device2, "Create Session ID");

    await device1.quit();

    await server.close;
  }).timeout(300000);
});
