import { androidIt, iosIt } from "../../types/sessionIt";
import { DisappearModes } from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

iosIt("Disappear after read", disappearAfterRead);
androidIt("Disappear after read", disappearAfterRead);

// bothPlatformsIt("Disappear after read", disappearAfterRead);

async function disappearAfterRead(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Checking disappear after read is working";
  const mode: DisappearModes = "read";
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click conversation options menu (three dots)
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", `Disappear after ${mode} option`],
    device2
  );
  // Check control message is correct on device 2
  if (platform === "android") {
    console.log(`Android has broken control messages: ignoring`);
    // await device2.disappearingControlMessage(
    //   `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`
    // );
    // await device2.disappearingControlMessage(
    //   `You set messages to disappear ${time} after they have been ${mode}.`
    // );
  } else {
    `${userA.userName} has set messages to disappear 30 seconds after they have been ${mode}.`;
  }
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  // Need function to read message
  // Wait for 10 seconds
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);
  // Great success
  await closeApp(device1, device2);
}
