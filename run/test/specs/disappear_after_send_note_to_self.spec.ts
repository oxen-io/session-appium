import { bothPlatformsIt } from "../../types/sessionIt";
import { DisappearActions } from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  closeApp,
  openAppOnPlatformSingleDevice,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

bothPlatformsIt(
  "Disappear after send note to self",
  disappearAfterSendNoteToSelf
);

async function disappearAfterSendNoteToSelf(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const testMessage = `Testing disappearing messages in Note to Self`;
  const userA = await newUser(device, "Alice", platform);
  const controlMode: DisappearActions = "sent";
  // Send message to self to bring up Note to Self conversation
  await device.clickOnByAccessibilityID("New conversation button");
  await device.clickOnByAccessibilityID("New direct message");
  await device.inputText(
    "accessibility id",
    "Session id input box",
    userA.sessionID
  );
  await device.scrollDown();
  await device.clickOnByAccessibilityID("Next");
  await device.inputText(
    "accessibility id",
    "Message input box",
    "Creating note to self"
  );
  await device.clickOnByAccessibilityID("Send message button");
  // Enable disappearing messages
  await setDisappearingMessage(platform, device, [
    "Note to Self",
    "Disappear after send option",
  ]);
  await sleepFor(1000);
  // await Promise.all([
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  // ]);
  await device.sendMessage(testMessage);
  // Sleep time dependent on platform
  const sleepTime = platform === "ios" ? 10000 : 30000;
  await sleepFor(sleepTime);
  await device.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
    maxWait: 1000,
  });
  // Great success
  await closeApp(device);
}

// TO DO - ADD TEST TO TURN OFF DISAPPEARING MESSAGES
