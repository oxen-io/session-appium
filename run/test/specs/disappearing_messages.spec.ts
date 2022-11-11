import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  clickOnElement,
  hasTextElementBeenDeleted,
  inputText,
  selectByText,
} from "./utils/utilities";
import { iosIt, androidIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Create contact
  await newContact(device1, userA, device2, userB);
  // Click conversation options menu (three dots)
  await clickOnElement(device1, "More options");
  // Select disappearing messages option
  await clickOnElement(device1, "Disappearing messages");
  // Select 5 seconds
  await selectByText(device1, "Disappearing messages time picker", "5 seconds");
  // Select OK
  await selectByText(device1, "Time selector", "OK");
  // Check config message for User A
  await selectByText(
    device1,
    "Control message",
    "You set the disappearing message timer to 5 seconds"
  );
  // Check config message for User B
  await selectByText(
    device1,
    "Control message",
    `${userA.userName} set the disappearing message timer to 5 seconds`
  );
  // Send message
  const message = "Howdy testing disappearing messages";
  await inputText(device1, "Message input box", message);
  // Wait 5 seconds
  await device1.setImplicitWaitTimeout(5000);
  // Look for message for User A
  await hasTextElementBeenDeleted(device1, "Message body", message);
  // Look for message for User B
  await hasTextElementBeenDeleted(device2, "Message body,", message);
  // Turn off disappearing messages
  // Click on timer icon
  // Android

  // Click off
  // click ok
  // Check config message for user A
  // Check config message for user B
  // Close app
  await closeApp(server, device1, device2);
}

describe.skip("Disappearing messages", () => {
  iosIt("Disappearing messages", runOnPlatform);
  androidIt("Disappearing messages", runOnPlatform);
});
