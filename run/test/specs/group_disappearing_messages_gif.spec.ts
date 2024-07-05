import { DISAPPEARING_TIMES, XPATHS } from "../../constants";
import { bothPlatformsIt } from "../../types/sessionIt";
import { DMTimeOption, InteractionPoints } from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  openAppThreeDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

bothPlatformsIt("Send disappearing GIF to group", disappearingGifMessageGroup);

async function disappearingGifMessageGroup(platform: SupportedPlatformsType) {
  const testGroupName = "Disappear after sent test";
  const testMessage = "Testing disappearing messages for GIF's";
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  await createGroup(
    platform,
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName
  );
  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardClosed);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID("Continue", 5000);
  await device1.clickOnElementAll({
    strategy: "xpath",
    selector: XPATHS.FIRST_GIF,
  });
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);
  // Wait for 10 seconds
  await sleepFor(10000);
  // Check if GIF has been deleted on both devices
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
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2, device3);
}
