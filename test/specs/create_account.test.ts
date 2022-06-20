const registerPage = require("./pageObjects/register-page.page.js");
const homePage = require("./pageObjects/home-page.page.js");
const settingsPage = require("./pageObjects/settings.page.js");
const recoveryPhrasePage = require("./pageObjects/recovery-phrase.page.js");
import { newUser } from "./utils/create_account";

describe("Account", () => {
  it("Create account and verify information", async () => {
    // Create new user
    const userA = await newUser("test user");
    // Click on profile picture
    await homePage.profilePicture.click();
    // Check that the Session ID is the same as the generated ID
    await expect(registerPage.sessionId).toHaveText(userA.sessionID);
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
      userA.recoveryPhrase
    );
    // // Exit recovery phrase modal
    await recoveryPhrasePage.cancelButton.click();
  });
});
