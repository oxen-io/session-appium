import { openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";

import * as wd from "wd";
import {
  inputText,
  clickOnElement,
  findMessageWithBody,
} from "./utils/utilities";

describe("Message checks", () => {
  it("Unsend message", async () => {
    // Open App
    const { device1, device2 } = await openAppTwoDevices();

    // Create two users
    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);
    // Create contact
    await newContact(device1, userA, device2, userB);
    // send message from User A to User B
    const unsendMessage = "Test-message-unsending";
    await inputText(device1, "Message input box", unsendMessage);
    // Click send
    await clickOnElement(device1, "Send message button");
    // Long press last sent message

    const foundMessage = await findMessageWithBody(
      device1,
      "Test-message-Unsending"
    );

    console.warn("longPressSelector =", foundMessage);
    const action = new wd.TouchAction(device1);
    action.longPress({ el: foundMessage });
    await action.perform();
    // Select 'Delete for me and User B'
    // Look in User B's chat for alert 'This message has been deleted?'
    // Excellent
  });
});
