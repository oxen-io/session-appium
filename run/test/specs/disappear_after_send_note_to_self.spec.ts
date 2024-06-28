import { DISAPPEARING_TIMES } from "../../constants";
import { bothPlatformsIt } from "../../types/sessionIt";
import { DMTimeOption, DisappearActions } from "../../types/testing";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  closeApp,
  openAppOnPlatformSingleDevice,
} from "./utils/open_app";

bothPlatformsIt(
  "Disappear after send note to self",
  disappearAfterSendNoteToSelf
);

async function disappearAfterSendNoteToSelf(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const testMessage = `Testing disappearing messages in Note to Self`;
  const userA = await newUser(device, "Alice", platform);
  let time: DMTimeOption;
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
  await device.clickOnByAccessibilityID("More options");
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () =>
    device.clickOnByAccessibilityID("Disappearing Messages")
  );
  // Select disappearing messages option
  await runOnlyOnAndroid(platform, () =>
    device.clickOnElementAll({
      strategy: "id",
      selector: "network.loki.messenger:id/title",
      text: "Disappearing messages",
    })
  );
  // Check default timer is set
  await sleepFor(1000);
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: DISAPPEARING_TIMES.ONE_DAY,
  });
  await device.disappearRadioButtonSelected(DISAPPEARING_TIMES.ONE_DAY);
  time =
    platform === "ios"
      ? DISAPPEARING_TIMES.TEN_SECONDS
      : DISAPPEARING_TIMES.THIRTY_SECONDS;
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: time,
  });
  await device.clickOnByAccessibilityID("Set button");
  await runOnlyOnIOS(platform, () => device.navigateBack(platform));

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
