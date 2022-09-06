import { closeApp, openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  clickOnElement,
  getTextElement,
  hasTextElementBeenDeleted,
  inputText,
  selectByText,
} from "./utils/utilities";

describe.skip("Disappearing messages", () => {
  it("Set disappearing messages", async () => {
    // Open app
    const { server, device1, device2 } = await openAppTwoDevices("android");
    // Create user A and user B
    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);
    // Create contact
    await newContact(device1, userA, device2, userB);
    // Click conversation options menu (three dots)
    await clickOnElement(device1, "More options");
    // Select disappearing messages option
    await clickOnElement(device1, "Disappearing messages");
    // Select 5 seconds
    await selectByText(
      device1,
      "Disappearing messages time picker",
      "5 seconds"
    );
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
  });
});
