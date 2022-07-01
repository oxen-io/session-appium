import { newUser } from "./utils/create_account";
const homePage = require("./pageObjects/home-page.page.js");

describe("Password checks", () => {
  it("Set password", async () => {
    const userA = await newUser("Test User A");

    await homePage.profilePicture.click();
  });
});
