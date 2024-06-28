import { DISAPPEARING_TIMES } from "../../constants";
import { bothPlatformsIt, iosIt } from "../../types/sessionIt";
import { DMTimeOption } from "../../types/testing";
import { sleepFor } from "./utils";

import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  closeApp,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

bothPlatformsIt(
  "Disappearing messages link group",
  disappearingLinkMessageGroup
);

async function disappearingLinkMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const testGroupName = "Test group";
  const testLink = `https://type-level-typescript.com/objects-and-records`;
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
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
  // Send a link
  await device1.inputText("accessibility id", "Message input box", testLink);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnByAccessibilityID("Enable");
  // No preview on first send
  await device1.clickOnByAccessibilityID("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
  ]);
  await closeApp(device1, device2, device3);
}
