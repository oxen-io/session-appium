import { openApp, closeApp } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { clickOnElement, inputText } from "./utils/utilities";

import wd from "wd";
describe("Username", () => {
  it("Change username", async (done) => {
    // create user
    const [server, device1] = await openApp();

    const userA = await newUser(device1, "User A");
    // click on settings/profile avatar
    await clickOnElement(device1, "Profile picture");
    // select username
    const oldUsername = await clickOnElement(device1, "Username");
    expect(oldUsername).toEqual(userA.userName);
    // type in new username
    const newUsername = await inputText(
      device1,
      "Username input",
      "New username A"
    );

    // select tick
    await clickOnElement(device1, "Apply");
    // verify new username
    const changedUsername = device1.elementByAccessibilityId("Username text");
    // Input text is a different element than the clickable one
    expect(changedUsername).toBe(newUsername);

    await closeApp(server, device1);
    await done();
  });
}).timeout(3000000);
