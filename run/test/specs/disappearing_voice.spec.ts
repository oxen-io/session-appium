import { DISAPPEARING_TIMES, XPATHS } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { DMTimeOption, DisappearActions } from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

iosIt("Disappearing voice message 1:1", disappearingVoiceMessage1o1Ios);
androidIt("Disappearing voice message 1:1", disappearingVoiceMessage1o1Android);

async function disappearingVoiceMessage1o1Ios(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after read option"],
    device2
  );
  // await device1.navigateBack(platform);
  await device1.longPress("New voice message");
  await device1.modalPopup("Allow");
  // await device1.clickOnByAccessibilityID("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.clickOnByAccessibilityID("Untrusted attachment message", 5000);
  await device2.clickOnByAccessibilityID("Download");
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Voice message",
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Voice message",
      maxWait: 1000,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVoiceMessage1o1Android(
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
  // Wait for control messages to disappear
  // await sleepFor(60000);
  await device1.longPress("New voice message");
  await device1.clickOnByAccessibilityID("Continue");
  await device1.clickOnElementXPath(XPATHS.VOICE_TOGGLE);
  await device1.pressAndHold("New voice message");
  // await device1.clickOnByAccessibilityID("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  await device2.clickOnByAccessibilityID("Download media");
  await sleepFor(30000);
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await closeApp(device1, device2);
}
