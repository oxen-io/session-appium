import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { iosIt, androidIt } from "../../types/sessionIt";
import { runOnlyOnAndroid, runOnlyOnIOS } from "./utils";

async function disappearingMessages(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click conversation options menu (three dots)
  await device1.clickOnElement("More options");
  // Select disappearing messages option
  await runOnlyOnIOS(platform, () =>
    device1.clickOnElement("Disappearing messages")
  );
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Disappearing messages"
    )
  );
  // Select 5 seconds
  await device1.selectByText("Disappearing messages time picker", "5 seconds");
  // Select OK
  await device1.selectByText("Time selector", "OK");
  // Check config message for User A
  await device1.waitForTextElementToBePresent(
    "accessibility id",
    "Configuration message",
    "You set the disappearing message timer to 5 seconds"
  );
  // Check config message for User B
  await device1.waitForTextElementToBePresent(
    "accessibility id",
    "Configuration message",
    `${userA.userName} set the disappearing message timer to 5 seconds`
  );
  // Send message
  const message = "Howdy testing disappearing messages";
  await device1.inputText("accessibility id", "Message input box", message);
  // Wait 5 seconds

  // Look for message for User A
  await device1.hasTextElementBeenDeleted("Message Body", message);
  // Look for message for User B
  await device2.hasTextElementBeenDeleted("Message Body", message);
  // Turn off disappearing messages
  // Click on timer icon
  // Android

  // Click off
  // click ok
  // Check config message for user A
  // Check config message for user B
  // Close app
  await closeApp(device1, device2);
}

describe("Disappearing messages", async () => {
  await iosIt("Disappearing messages", disappearingMessages);
  await androidIt("Disappearing messages", disappearingMessages);
});
