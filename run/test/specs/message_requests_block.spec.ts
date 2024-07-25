import { androidIt, iosIt } from "../../types/sessionIt";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { linkedDevice } from "./utils/link_device";
import {
  closeApp,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

iosIt("Block message request", blockedRequest);
androidIt("Block message request", blockedRequest);

// bothPlatformsIt("Block message request", blockedRequest);

async function blockedRequest(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);

  const userA = await newUser(device1, "Alice", platform);
  const userB = await linkedDevice(device2, device3, "Bob", platform);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID("Message request");
  // Check on linked device for message request
  await device3.clickOnByAccessibilityID("Message requests banner");
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message request",
  });
  // Bob clicks on block option
  await device2.clickOnByAccessibilityID("Block message request");
  // Confirm block on android
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device2.clickOnByAccessibilityID("Block"));
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnByAccessibilityID("Confirm block")
  );
  const blockedMessage = `"${userA.userName} to ${userB.userName} - shouldn't get through"`;
  await device1.sendMessage(blockedMessage);
  await device2.navigateBack(platform);

  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "New conversation button",
  });
  // Need to wait to see if message gets through
  await sleepFor(5000);
  await device2.hasTextElementBeenDeleted("Message body", blockedMessage);
  // Close app
  await closeApp(device1, device2, device3);
}
