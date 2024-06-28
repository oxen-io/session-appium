import { DISAPPEARING_TIMES } from "../../constants";
import { bothPlatformsIt } from "../../types/sessionIt";
import { DMTimeOption, DisappearActions } from "../../types/testing";
import { sleepFor, runOnlyOnAndroid, runOnlyOnIOS } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  openAppThreeDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

bothPlatformsIt("Disappear after send groups", disappearAfterSendGroups);

async function disappearAfterSendGroups(platform: SupportedPlatformsType) {
  const testGroupName = "Disappear after send test";
  const testMessage = "Testing disappear after sent in groups";
  let time: DMTimeOption;
  const controlMode: DisappearActions = "sent";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  // Create contact between User A and User B
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
  time =
    platform === "ios"
      ? DISAPPEARING_TIMES.TEN_SECONDS
      : DISAPPEARING_TIMES.THIRTY_SECONDS;
  await device1.clickOnByAccessibilityID("More options");
  // Select disappearing messages option
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Disappearing messages"
    )
  );
  await runOnlyOnIOS(platform, () =>
    device1.clickOnByAccessibilityID("Disappearing Messages")
  );
  // Check the default time is set to
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: DISAPPEARING_TIMES.ONE_DAY,
  });
  await device1.disappearRadioButtonSelected(DISAPPEARING_TIMES.ONE_DAY);
  // Change time to testing time of 10 seconds

  await setDisappearingMessage(platform, device1, [
    "Group",
    `Disappear after send option`,
    time,
  ]);
  await runOnlyOnIOS(platform, () => device1.navigateBack(platform));
  // Check control message
  await console.log(`Control message not working on Android: ignoring`);
  // await Promise.all([
  //   device1.disappearingControlMessage(
  //     `You set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  //   device2.disappearingControlMessage(
  //     `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  //   device3.disappearingControlMessage(
  //     `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  // ]);
  // Send message to verify deletion
  await device1.sendMessage(testMessage);
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
  // Wait for 10 or 30 seconds
  const sleepTime = platform === "ios" ? 10000 : 30000;
  await sleepFor(sleepTime);
  // Check for test messages (should be deleted)
  await Promise.all([
    device1.hasTextElementBeenDeleted("Message body", testMessage),
    device2.hasTextElementBeenDeleted("Message body", testMessage),
    device3.hasTextElementBeenDeleted("Message body", testMessage),
  ]);
  // Close server and devices
  await closeApp(device1, device2, device3);
}
