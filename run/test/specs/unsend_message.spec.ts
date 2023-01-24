import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  clickOnElement,
  longPressMessage,
  sendMessage,
  waitForTextElementToBePresent,
  waitForElementToBePresent,
} from "./utils/index";
import { iosIt, androidIt } from "../../types/sessionIt";

async function unsendMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // send message from User A to User B
  const sentMessage = await sendMessage(
    device1,
    "Checking unsend functionality"
  );
  // await sleepFor(1000);
  await waitForTextElementToBePresent(device2, "Message Body", sentMessage);
  console.log("Doing a long click on" + `${sentMessage}`);
  // Select and long press on message to delete it
  await longPressMessage(device1, sentMessage);
  // Select Delete icon
  await clickOnElement(device1, "Delete message");
  // Select 'Delete for me and User B'
  await clickOnElement(device1, "Delete for everyone");
  // Look in User B's chat for alert 'This message has been deleted?'
  await waitForElementToBePresent(device2, "Deleted message");

  // Excellent
  await closeApp(device1, device2);
}

describe("Message checks", async () => {
  await iosIt("Unsend message", unsendMessage);
  await androidIt("Unsend message", unsendMessage);
});
