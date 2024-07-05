import { DISAPPEARING_TIMES } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { DisappearActions } from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

iosIt("Disappearing image message 1o1", disappearingImageMessage1o1Ios);
androidIt("Disappearing image message 1o1", disappearingImageMessage1o1Android);

async function disappearingImageMessage1o1Ios(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  const time = DISAPPEARING_TIMES.ONE_MINUTE;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after read option", time],
    device2
  );
  // await device1.navigateBack(platform);

  await sleepFor(500);
  await device1.sendImage(platform, "1:1", testMessage);
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  // User B - Click on 'download'
  await device2.clickOnByAccessibilityID("Download media", 5000);
  await sleepFor(60000);
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

async function disappearingImageMessage1o1Android(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  const time = DISAPPEARING_TIMES.ONE_MINUTE;
  const mode: DisappearActions = "sent";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // TODO FIX CONTROL MESSAGES ON ANDROID
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`
  // ),
  //   await device2.disappearingControlMessage(
  //     `You set messages to disappear ${time} after they have been ${mode}.`
  //   );
  // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  await sleepFor(60000);
  await device1.sendImage(platform, "1:1", testMessage);
  await device2.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Untrusted attachment message",
  });
  await device2.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Download media",
  });
  await sleepFor(60000);

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
