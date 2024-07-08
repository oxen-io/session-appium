import { bothPlatformsIt } from "../../types/sessionIt";
import { runOnlyOnIOS, sleepFor, runOnlyOnAndroid } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { linkedDevice } from "./utils/link_device";
import {
  SupportedPlatformsType,
  openAppThreeDevices,
  closeApp,
} from "./utils/open_app";

bothPlatformsIt(
  "Block user in conversation options",
  blockUserInConversationOptions
);

async function blockUserInConversationOptions(
  platform: SupportedPlatformsType
) {
  //Open three devices and creates two contacts (Alice and Bob)
  // Alice has linked device (1 and 3)
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const userA = await linkedDevice(device1, device3, "Alice", platform);

  const userB = await newUser(device2, "Bob", platform);

  await newContact(platform, device1, userA, device2, userB);
  // Block contact
  // Click on three dots (settings)
  await device1.clickOnByAccessibilityID("More options");
  // Select Block option
  await runOnlyOnIOS(platform, () => device1.clickOnByAccessibilityID("Block"));
  // Wait for menu to be clickable (Android)
  await sleepFor(500);
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(`network.loki.messenger:id/title`, "Block")
  );
  // Confirm block option
  await device1.clickOnByAccessibilityID("Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await sleepFor(1000);
  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => device1.navigateBack(platform));
  // Look for alert at top of screen (Bob is blocked. Unblock them?)
  // Check device 1 for blocked status
  const blockedStatus = await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Blocked banner",
  });
  if (blockedStatus) {
    // Check linked device for blocked status (if shown on device1)
    await device3.clickOnElementAll({
      strategy: "accessibility id",
      selector: "Conversation list item",
      text: `${userB.userName}`,
    });
    await device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Blocked banner",
    });
    console.warn(`${userB.userName}` + " has been blocked");
  } else console.warn("Blocked banner not found");
  // Unblock userB
  // Click on alert to unblock
  await device1.clickOnByAccessibilityID("Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () =>
    device1.clickOnByAccessibilityID("Unblock")
  );
  console.warn(`${userB.userName}} has been unblocked`);
  // Look for alert (shouldn't be there)
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Blocked banner",
  });
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await device2.sendMessage(
    "Hey, am I unblocked?"
  );
  // Check in device 1 and device 3 for message
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: hasUserBeenUnblockedMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: hasUserBeenUnblockedMessage,
    }),
  ]);

  // Close app
  await closeApp(device1, device2, device3);
}
