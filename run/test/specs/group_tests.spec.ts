import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { closeApp, openAppThreeDevices } from "./utils/open_app";
import {
  clickOnElement,
  findMessageWithBody,
  inputText,
  selectByText,
} from "./utils/utilities";

describe("Group Testing", () => {
  it("Create group", async () => {
    // Open app and start server
    const { server, device1, device2, device3 } = await openAppThreeDevices(
      "android"
    );
    // Create users
    // Create User A
    // Create User B
    // Create User C
    const [userA, userB, userC] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
      newUser(device3, "User C"),
    ]);
    // Create contact between User A and User B
    await newContact(device1, userA, device2, userB);
    await clickOnElement(device1, "Navigate up");
    await clickOnElement(device2, "Navigate up");
    // Create contact between User A and User C
    await newContact(device1, userA, device3, userC);
    // Exit conversation back to list
    await clickOnElement(device1, "Navigate up");
    // Exit conversation back to list
    await clickOnElement(device3, "Navigate up");
    // Click plus button
    await clickOnElement(device1, "New conversation button");
    // Select Closed Group option
    await clickOnElement(device1, "Create group");
    // Type in group name
    await inputText(device1, "Group name input", "Test group name");
    // Select User B and User C
    await selectByText(device1, "Contact", userB.userName);
    await selectByText(device1, "Contact", userC.userName);
    // Select tick
    await clickOnElement(device1, "Done");
    // Send message from User A
    await inputText(device1, "Message input box", "User A to group");
    await clickOnElement(device1, "Send message button");
    await device1.setImplicitWaitTimeout(20000);
    await device1.elementByAccessibilityId("Message sent status tick");
    // Verify in user b and user c's window
    // Navigate to group chat in user B's window
    await selectByText(device2, "Conversation list item", "Test group name");
    // Navigate to grou chat in user C's window
    await selectByText(device3, "Conversation list item", "Test group name");
    await findMessageWithBody(device2, "User A to group");
    await findMessageWithBody(device3, "User A to group");
    // Close server and devices
    await closeApp(server, device1, device2, device3);
  });
});
