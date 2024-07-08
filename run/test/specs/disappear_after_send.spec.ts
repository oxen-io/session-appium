import { bothPlatformsIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  DisappearModes,
  DisappearActions,
} from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

bothPlatformsIt("Disappear after send", disappearAfterSend);

async function disappearAfterSend(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const mode: DisappearModes = "send";
  const testMessage = `Checking disappear after ${mode} is working`;
  const controlMode: DisappearActions = "sent";
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Select disappearing messages option
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
    //   `${userA.userName} has set messages to disappear 30 seconds after they have been ${controlMode}.`
    // );
    // await device2.disappearingControlMessage(
    //   `You set messages to disappear 30 seconds after they have been ${controlMode}.`
    // );
  }
  // await runOnlyOnIOS(platform, () =>
  //   device2.disappearingControlMessage(
  //     `${userA.userName} has set messages to disappear 30 seconds after they have been ${controlMode}.`
  //   )
  // );
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  await device2.clickOnElementByText({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  // Wait for message to disappear
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
