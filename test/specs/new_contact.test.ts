const landingPage = require("../../test/specs/pageObjects/landing-page.page.js");
const registerPage = require("../specs/pageObjects/register-page.page.js");
const displayNamePage = require("../specs/pageObjects/display-name.page.js");
const messageNotifications = require("../specs/pageObjects/message-notifications.page.js");
const homePage = require("../specs/pageObjects/home-page.page.js");

describe("Account", () => {
  it("Create account and verify information", async () => {
    await landingPage.createSessionIdBtn.click();
    await registerPage.continueBtn.click();
    await displayNamePage.displayNameInput.addValue("Test User");
    await registerPage.continueBtn.click();
    await registerPage.continueBtn.click();
    await homePage.profilePicture.click();
  });
});
