import { iosIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { SupportedPlatformsType, openAppTwoDevices } from "./utils/open_app";
// import { setDisappearingMessage } from "./utils/set_disappearing_messages";

// async function disappearingImageMessage(platform: SupportedPlatformsType) {
//   const { device1, device2 } = await openAppTwoDevices(platform);
//   const testMessage = "Testing disappearing messages for images";
//   // Create user A and user B
//   const [userA, userB] = await Promise.all([
//     newUser(device1, "Alice", platform),
//     newUser(device2, "Bob", platform),
//   ]);
//   await newContact(platform, device1, userA, device2, userB);
//   await setDisappearingMessage(device1, [
//     "1o1",
//     "Disappear after send option",
//     "Ten seconds",
//   ]);
//   await device1.sendImageIos(testMessage);
//   await sleepFor(10000);
//   await device1.hasElementBeenDeleted(
//     "accessibility id",
//     "Message Body",
//     1000,
//     testMessage
//   );
//   await device2.hasElementBeenDeleted(
//     "accessibility id",
//     "Message Body",
//     1000,
//     testMessage
//   );
// }
// describe.skip("Disappearing messages checks", () => {
//   iosIt("Disappearing messages image", disappearingImageMessage);
// });
