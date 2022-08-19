import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { closeApp, openAppThreeDevices } from "./utils/open_app";
import { clickOnElement, inputText } from "./utils/utilities";

describe("Group Testing", () => {
  it("Create group", async () => {
    // Open app and start server
    const { server, device1, device2, device3 } = await openAppThreeDevices();
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
    // Create contact between User A and User C
    await newContact(device1, userA, device3, userC);
    // Click plus button
    await clickOnElement(device1, "New conversation button");
    // Select Closed Group option
    await clickOnElement(device1, "Create group");
    // Type in group name
    await inputText(device1, "Group name input", "Test group name");
    // Select User B and User C

    // Select tick
    // Send message from User A
    // Verify in user b and user c's window
    // Close server and devices
    await closeApp(server, device1, device2, device3);
  });
});
