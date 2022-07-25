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
  udid: "emulator-5554",
  platformVersion: "11",
  app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-universal.apk",
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
  app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-universal.apk",
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

    const device1Remote = wd.promiseChainRemote("localhost", 4723);
    const device2Remote = wd.promiseChainRemote("localhost", 4723);

    let device1 = await device1Remote;
    let device2 = await device2Remote;

    const device1Init = device1.init(capabilities1);
    const device2Init = device2.init(capabilities2);
    await device1Init;
    await device2Init;

    const createA = createAccount.newUser(device1, "User A");
    const createB = createAccount.newUser(device2, "User B");
    const userA = await createA;
    const userB = await createB;
    // USER A WORKFLOW
    // Send message from User A to User B
    // Click new conversation button
    await clickOnElement(device1, "New conversation button");
    // Select direct message option
    await clickOnElement(device1, "New direct message");
    // Enter in User B's session ID
    await inputText(device1, "Session id input box", userB.sessionID);
    // Click next
    await clickOnElement(device1, "Next");
    // Type in the message input box
    await inputText(
      device1,
      "Message input box",
      "Test-message-User-A-to-User-B"
    );
    // CLick send
    await clickOnElement(device1, "Send message button");
    await device1.setImplicitWaitTimeout(5000);
    // Wait for tick
    await device1.elementByAccessibilityId("Message sent status tick");
    // Wait for response

    // Verify config message states message request was accepted
    // await device1.elementByAccessibilityId("Message request was accepted");
    // USER B WORKFLOW
    // Click on message request panel
    await clickOnElement(device2, "Message requests banner");
    // Select message from User A
    await clickOnElement(device2, "Message request");
    // Type into message input box
    await inputText(
      device2,
      "Message input box",
      "Test-message-User-B-to-User-A"
    );
    // Click send
    await clickOnElement(device2, "Send message button");
    // Wait for tick

    await device1.quit();
    await device2.quit();

    await server.close;
  }).timeout(300000);
});
