const landingPage = require("../../test/specs/pageObjects/landing-page.page.js");
const registerPage = require("../specs/pageObjects/register-page.page.js");
const displayNamePage = require("../specs/pageObjects/display-name.page.js");
const messageNotifications = require("../specs/pageObjects/message-notifications.page.js");
const homePage = require("../specs/pageObjects/home-page.page.js");
const recoveryPhrasePage = require("../specs/pageObjects/recovery-phrase.page.js");

const userName = "Test User";

describe("Account", () => {
  it("Create account and verify information", async () => {
    // Click on create session ID
    await landingPage.createSessionIdBtn.click();
    // Save session ID as variable
    const sessionID = await registerPage.sessionId.getText();
    console.log(`Session ID: ${sessionID}`);
    await registerPage.continueBtn.click();
    // Save username as variable
    await displayNamePage.displayNameInput.addValue(userName);

    await registerPage.continueBtn.click();
    // Choose message notification options
    await registerPage.continueBtn.click();
    // Click on 'continue' button to reveal recovery phrase
    await registerPage.continueBtn.click();

    await $(recoveryPhrasePage.recoveryPhrase).touchAction("longPress");
    console.log("Did this get pressed?");
    const recoveryPhrase = await recoveryPhrasePage.recoveryPhrase.getText();
    console.log(`Recovery Phrase: ${recoveryPhrase}`);
    // await homePage.profilePicture.click();
  });
});
