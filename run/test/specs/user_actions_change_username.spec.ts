import { bothPlatformsIt } from "../../types/sessionIt";
import { sleepFor, runOnlyOnAndroid, runOnlyOnIOS } from "./utils";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppOnPlatformSingleDevice,
  closeApp,
} from "./utils/open_app";

bothPlatformsIt("Change username", changeUsername);

async function changeUsername(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  const userA = await newUser(device, "Alice", platform);
  const newUsername = "Alice in chains";
  // click on settings/profile avatar
  await device.clickOnByAccessibilityID("User settings");
  // select username
  await device.clickOnByAccessibilityID("Username");
  // type in new username
  await sleepFor(100);
  await device.deleteText("Username");
  await device.inputText("accessibility id", "Username", newUsername);
  const changedUsername = await device.grabTextFromAccessibilityId("Username");
  console.log("Changed username", changedUsername);
  if (changedUsername === newUsername) {
    console.log("Username change successful");
  }
  if (changedUsername === userA.userName) {
    console.log("Username is still ", userA.userName);
  }
  if (changedUsername === "Username") {
    console.log(
      "Username is not picking up text but using access id text",
      changedUsername
    );
  } else {
    console.log("Username is not found`");
  }
  // select tick
  await runOnlyOnAndroid(platform, () =>
    device.clickOnByAccessibilityID("Apply")
  );
  await runOnlyOnIOS(platform, () => device.clickOnByAccessibilityID("Done"));
  await runOnlyOnIOS(platform, () =>
    device.clickOnByAccessibilityID("Close button")
  );
  await runOnlyOnAndroid(platform, () => device.navigateBack(platform));
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: "User settings",
  });
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Username",
    text: newUsername,
  });
  await closeApp(device);
}
