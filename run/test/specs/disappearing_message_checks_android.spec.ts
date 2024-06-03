import { XPATHS } from "../../constants";
import { androidIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  DisappearActions,
  DisappearModes,
  DisappearOpts1o1,
} from "../../types/testing";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { joinCommunity } from "./utils/join_community";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

async function disappearingImageMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  const time = "1 minute";
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
    ["1:1", "Disappear after send option", "1 minute"],
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
  await device1.sendImage(platform, testMessage);
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

async function disappearingVideoMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const time: DMTimeOption = "1 minute";
  const mode: DisappearActions = "sent";
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", "1 minute"],
    device2
  );
  // TODO FIX
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`
  // );
  // await device2.disappearingControlMessage(
  //   `You set messages to disappear ${time} after they have been ${mode}.`
  // );
  // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  // await sleepFor(60000);
  await device1.sendVideo(platform);
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  await device2.clickOnByAccessibilityID("Download media");
  // Wait for disappearing message timer to remove video
  await sleepFor(60000);
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

async function disappearingVoiceMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const time: DMTimeOption = "1 minute";
  const controlMode: DisappearActions = "sent";
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
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
  await sleepFor(Number(time));
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

async function disappearingGifMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const time: DMTimeOption = "1 minute";
  const controlMode: DisappearActions = "sent";
  const mode: DisappearModes = "send";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", `Disappear after ${mode} option`, time],
    device2
  ); // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  // TODO FIX
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await device2.disappearingControlMessage(
  //   `You set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await sleepFor(60000);
  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await device1.clickOnByAccessibilityID("GIF button");
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Continue",
  });
  // Select gif
  await sleepFor(500);
  await device1.clickOnElementXPath(XPATHS.FIRST_GIF);
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  // Click on 'download'
  await device2.clickOnByAccessibilityID("Download media");
  // Wait for 60 seconds (time)
  await sleepFor(Number(time));
  // Check if GIF has been deleted on both devices
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Media message",
    maxWait: 1000,
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Media message",
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

async function disappearingLinkMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testLink = `https://type-level-typescript.com/objects-and-records`;
  const time: DMTimeOption = "30 seconds";
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
  // await device1.navigateBack(platform);
  // Send a link
  await device1.inputText("accessibility id", "Message input box", testLink);
  // Accept dialog for link preview
  await device1.clickOnByAccessibilityID("Enable");
  // No preview on first send
  await device1.clickOnByAccessibilityID("Send message button");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "id",
    selector: "network.loki.messenger:id/linkPreviewView",
  });
  // Wait for 30 seconds to disappear
  await sleepFor(Number(time));
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "id",
      selector: "network.loki.messenger:id/linkPreviewView",
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: "id",
      selector: "network.loki.messenger:id/linkPreviewView",
      maxWait: 1000,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingCommunityInviteMessage(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const communityName = "Testing All The Things!";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", "30 seconds"],
    device2
  );

  await device1.navigateBack(platform);
  await joinCommunity(platform, device1, communityLink, communityName);
  await device1.clickOnByAccessibilityID("More options");
  if (platform === "ios") {
    await device1.clickOnByAccessibilityID("Add Members");
  } else {
    await device1.clickOnElementAll({
      strategy: "id",
      selector: "network.loki.messenger:id/title",
      text: "Add members",
    });
  }
  await device1.clickOnElementByText({
    strategy: "accessibility id",
    selector: "Contact",
    text: userB.userName,
  });
  await device1.clickOnByAccessibilityID("Done");
  // Check device 2 for invitation from user A
  if (platform === "ios") {
    await device2.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Community invitation",
      text: communityName,
    });
  } else {
    await device2.waitForTextElementToBePresent({
      strategy: "id",
      selector: "network.loki.messenger:id/openGroupTitleTextView",
      text: communityName,
    });
    await device2.clickOnElementAll({
      strategy: "id",
      selector: "network.loki.messenger:id/openGroupInvitationIconBackground",
    });
  }
  // Wait for 10 seconds for message to disappear
  await sleepFor(10000);
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await closeApp(device1, device2);
}
// TODO fix with calls
async function disappearingCallMessage(platform: SupportedPlatformsType) {
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
    ["1:1", "Disappear after send option", "30 seconds"],
    device2
  );

  await device1.navigateBack(platform);
  await device1.clickOnByAccessibilityID("Call");
  // Enabled voice calls in privacy settings
  await device1.waitForTextElementToBePresent({
    strategy: "id",
    selector: "android:id/button1",
  });

  await device1.clickOnElementById("android:id/button1");
  // Scroll to bottom of page to voice and video calls
  await sleepFor(1000);
  await device1.scrollDown();
  const voicePermissions = await device1.waitForTextElementToBePresent({
    strategy: "id",
    selector: "android:id/summary",
    text: "Enables voice and video calls to and from other users.",
  });

  await device1.click(voicePermissions.ELEMENT);
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device1.clickOnByAccessibilityID("Enable");
  // Navigate back to conversation
  await device1.waitForTextElementToBePresent({
    strategy: "id",
    selector:
      "com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  });
  await device1.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );

  await device1.clickOnByAccessibilityID("Navigate up");
  // Enable voice calls on device 2 for User B
  await device2.clickOnByAccessibilityID("Call");
  // Enabled voice calls in privacy settings
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Settings",
    text: "Settings",
  });

  await device2.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Settings",
  });
  // Scroll to bottom of page to voice and video calls
  await sleepFor(1000);
  await device2.scrollDown();
  const voicePermissions2 = await device2.waitForTextElementToBePresent({
    strategy: "id",
    selector: "android:id/summary",
    text: "Enables voice and video calls to and from other users.",
  });

  await device2.click(voicePermissions2.ELEMENT);
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device2.clickOnByAccessibilityID("Enable");
  // Navigate back to conversation
  await device2.waitForTextElementToBePresent({
    strategy: "id",
    selector:
      "com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  });
  await device2.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await device2.clickOnByAccessibilityID("Navigate up");
  // Make call on device 1 (userA)
  await device1.clickOnByAccessibilityID("Call");
  // Answer call on device 2
  await device2.clickOnByAccessibilityID("Answer call");
  // Wait 5 seconds
  await sleepFor(5000);
  // Hang up
  await device1.clickOnElementById("network.loki.messenger:id/endCallButton");
  // Check for config message 'Called User B' on device 1
  await device1.waitForControlMessageToBePresent(`Called ${userB.userName}`);
  await device2.waitForControlMessageToBePresent(
    `${userA.userName} called you`
  );
  // Wait 10 seconds for control message to be deleted
  await sleepFor(10000);
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Control message",
    text: `You called ${userB.userName}`,
    maxWait: 1000,
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Control message",
    text: `${userA.userName} called you`,
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

describe("Disappearing messages checks", () => {
  androidIt("Disappearing messages image", disappearingImageMessage);
  androidIt("Disappearing messages video", disappearingVideoMessage);
  androidIt("Disappearing messages voice", disappearingVoiceMessage);
  androidIt("Disappearing messages gif", disappearingGifMessage);
  androidIt("Disappearing messages link", disappearingLinkMessage);
  androidIt(
    "Disappearing messages community invite",
    disappearingCommunityInviteMessage
  );
  androidIt("Disappearing messages call history", disappearingCallMessage);
});
