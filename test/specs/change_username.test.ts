import { newUser } from "./utils/create_account";
const homePage = require("./pageObjects/home-page.page.js");
const settingsPage = require("./pageObjects/settings.page.js");

describe("Change user details", () => {
  it("Change username", async () => {
    const userName = "User A";

    const userA = await newUser(userName);

    // Navigate to settings page
    await homePage.profilePicture.click();
    // Get username and verify its the original username
    expect(settingsPage.userName).toHaveText(userName);
    await settingsPage.userNameInput.click();
  });
});
