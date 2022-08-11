import { openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { inputText, clickOnElement, longPress } from "./utils/utilities";

describe("Message PLOP checks", () => {
  it("PLOP", async () => {
    // Open App
    const { server, device1, device2 } = await openAppTwoDevices();
    // Create two users
    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);
    // Create contact
    await newContact(device1, userA, device2, userB);
    // send message from User A to User B
    await inputText(
      device1,
      "Message input box",
      "Test-message-User-A-to-User-B"
    );
    // Click send
    await clickOnElement(device1, "Send message button");
    // Long press last sent message
    const selector = device1.elementByXPath(
      "//android.widget.TextView[@text='Test-message-User-A-to-User-B'"
    );
    const action = new wd.TouchAction(device1);
    action.longPress({ el: selector });
    await action.perform();
    // Select 'Delete for me and User B'
    // Look in User B's chat for alert 'This message has been deleted?'
    // Excellent
  });
});
