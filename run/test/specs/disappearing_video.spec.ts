import { DISAPPEARING_TIMES } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { DMTimeOption, DisappearActions } from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

iosIt("Disappearing video message 1o1", disappearingVideoMessage1o1Ios);
androidIt("Disappearing video message 1o1", disappearingVideoMessage1o1Android);

async function disappearingVideoMessage1o1Ios(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing disappearing messages for videos";
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after read option"],
    device2
  );
  // await device1.navigateBack(platform);
  await device1.sendVideoiOS(testMessage);
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVideoMessage1o1Android(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const controlMode: DisappearActions = "sent";
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option"],
    device2
  );
  // TODO FIX
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await device2.disappearingControlMessage(
  //   `You set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  // await sleepFor(60000);
  await device1.sendVideoAndroid();
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  await device2.clickOnByAccessibilityID("Download media");
  // Wait for disappearing message timer to remove video
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Media message",
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Media message",
    }),
  ]);
  await closeApp(device1, device2);
}
