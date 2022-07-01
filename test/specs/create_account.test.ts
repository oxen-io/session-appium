const registerPage = require("./pageObjects/register-page.page.js");
const homePage = require("./pageObjects/home-page.page.js");
const settingsPage = require("./pageObjects/settings.page.js");
const recoveryPhrasePage = require("./pageObjects/recovery-phrase.page.js");
import { newUser } from "./utils/create_account";

// describe("Android Caps"),
//   () => {},
//   (driver.capabilities = {
//     alwaysMatch: {
//       platformName: "Android",
//       udid: "emulator-5556",
//       platformVersion: "11",
//       app: "/Users/emilyburton/Documents/session-android/app/build/outputs/apk/play/debug/session-1.13.1-x86.apk",
//       appPackage: "network.loki.messenger",
//       appActivity: "network.loki.messenger.RoutingActivity",
//       automationName: "Appium",
//       browserName: "",
//     },
//   });

describe("Account", () => {
  it("Create account and verify information", async () => {
    // Create new user

    // console.error("driver.capabilities", driver.capabilities);
    const userADetails = await newUser("test userA");
    // const userBDetails = await newUser(
    //   "test userB",
    //   driver.capabilities[1].desired
    // );
    // userADetails.window;
    // Click on profile picture
    await homePage.profilePicture.click();
    // Check that the Session ID is the same as the generated ID
    await expect(registerPage.sessionId).toHaveText(userADetails.sessionID);
    // Scroll to recovery menu option
    await browser.touchAction([
      { action: "press", x: 500, y: 1046 },
      { action: "moveTo", x: 500, y: 418 },
      "release",
    ]);
    // Click on recovery phrase menu option
    await settingsPage.recoveryPhraseMenuOption.click();
    // // Verify recovery phrase is correct
    await expect(recoveryPhrasePage.recoveryPhrase).toHaveText(
      userADetails.recoveryPhrase
    );
    // // Exit recovery phrase modal
    await recoveryPhrasePage.cancelButton.click();
  });
});
