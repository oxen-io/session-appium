import { openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { inputText, clickOnElement, longPress } from "./utils/utilities";
import * as wd from "wd";

describe("Message checks", () => {
  it("Unsend message", async () => {
    // Open App
    const { server, device1, device2 } = await openAppTwoDevices();
    // console.warn(device1);

    // Create two users
    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);
    // Create contact
    await newContact(device1, userA, device2, userB);
    // send message from User A to User B
    await inputText(device1, "Message input box", "Test-message-Unsending");
    // Click send
    await clickOnElement(device1, "Send message button");
    // Long press last sent message

    const longPressSelector = await device1.elementByXPath(
      "//*[ text() = ‘Test-message-Unsending’]"
    );

    console.warn("longPressSelector =", longPressSelector);
    const action = new wd.TouchAction(device1);
    action.longPress({ el: longPressSelector });
    await action.perform();
    // Select 'Delete for me and User B'
    // Look in User B's chat for alert 'This message has been deleted?'
    // Excellent
  });
});
