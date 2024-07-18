import { XPATHS } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
} from "./utils/open_app";

iosIt("Send GIF to group", sendGifGroupiOS);
androidIt("Send GIF to group", sendGifGroupAndroid);

async function sendGifGroupiOS(platform: SupportedPlatformsType) {
  const testGroupName = "Message checks for groups";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  const testMessage = "Testing-GIF-1";
  const replyMessage = `Replying to GIF from ${userA.userName}`;
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
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardOpen);
  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID("Continue");
  await device1.clickOnElementXPath(XPATHS.FIRST_GIF);
  await device1.clickOnByAccessibilityID("Message input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await sleepFor(500);
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  await device2.longPressMessage(testMessage);
  // Check reply came through on device1
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  await closeApp(device1, device2, device3);
}

async function sendGifGroupAndroid(platform: SupportedPlatformsType) {
  const testGroupName = "Message checks for groups";
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
  const replyMessage = `Replying to GIF from ${userA.userName}`;
  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await device1.clickOnByAccessibilityID("GIF button");
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Continue",
  });
  // Select gif
  await device1.clickOnElementAll({
    strategy: "xpath",
    selector: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]`,
    maxWait: 5000,
  });
  // Reply to message
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Media message",
    maxWait: 10000,
  });
  await device2.longPress("Media message");
  // Check reply came through on device1
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  // Close app
  await closeApp(device1, device2, device3);
}
