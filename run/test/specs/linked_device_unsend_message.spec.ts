import { bothPlatformsIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { linkedDevice } from "./utils/link_device";
import {
  SupportedPlatformsType,
  openAppThreeDevices,
  closeApp,
} from "./utils/open_app";

bothPlatformsIt("Unsent message syncs", unSendMessageLinkedDevice);

async function unSendMessageLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);

  const userA = await linkedDevice(device1, device3, "Alice", platform);

  const userB = await newUser(device2, "Bob", platform);

  await newContact(platform, device1, userA, device2, userB);
  // Send message from user a to user b
  const sentMessage = await device1.sendMessage("Howdy");
  // Check message came through on linked device(3)
  // Enter conversation with user B on device 3
  // Need to wait for notifications to disappear
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation list item",
  });
  await device3.selectByText("Conversation list item", userB.userName);
  // Find message
  await device3.findMessageWithBody(sentMessage);
  // Select message on device 1, long press
  await device1.longPressMessage(sentMessage);
  // Select delete
  await device1.clickOnByAccessibilityID("Delete message");
  // Select delete for everyone
  await device1.clickOnByAccessibilityID("Delete for everyone");

  // await waitForLoadingAnimation(device1);

  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Deleted message",
  });
  // Check linked device for deleted message
  await device3.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    text: sentMessage,
  });
  // Close app
  await closeApp(device1, device2, device3);
}
