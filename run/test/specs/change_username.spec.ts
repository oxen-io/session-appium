import { closeApp, openAppOnPlatformSingleDevice } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { clickOnElement, inputText } from "./utils/utilities";

// afterEach() => {}

describe("Username", () => {
  it("Change username", async () => {
    // create user
    const { server, device: device1 } = await openAppOnPlatformSingleDevice(
      "android"
    );

    const userA = await newUser(device1, "User A");
    // click on settings/profile avatar
    await clickOnElement(device1, "Profile picture");
    // select username

    await clickOnElement(device1, "Username");
    console.warn("Element clicked?");
    // type in new username
    const newUsername = await inputText(
      device1,
      "Username input",
      "New username"
    );
    console.warn(newUsername);
    // select tick
    await clickOnElement(device1, "Apply");
    // verify new username
    // Input text is a different element than the clickable one

    await closeApp(server, device1);
  });
});
