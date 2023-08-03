import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { runOnlyOnAndroid, sleepFor } from "./utils/index";
import { openAppTwoDevices, SupportedPlatformsType } from "./utils/open_app";

async function voiceCallAndroid(platform: SupportedPlatformsType) {
  // Open app
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await device1.sendNewMessage(userB, "Testing calls");
  // Look for phone icon (shouldnt be there)
  await device1.hasElementBeenDeleted("accessibility id", "Call");
  // Create contact
  await device2.clickOnElement("Message requests banner");
  // Select message from User A
  await device2.clickOnElement("Message request");
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElement("Accept message request")
  );
  // Type into message input box
  await device2.sendMessage(
    `Reply-message-${userB.userName}-to-${userA.userName}`
  );

  // Verify config message states message request was accepted
  await device1.findConfigurationMessage(
    "Your message request has been accepted."
  );
  // Phone icon should appear now that conversation has been approved
  await device1.clickOnElement("Call");
  // Enabled voice calls in privacy settings
  await device1.waitForElementToBePresent({
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
  await device1.clickOnElement("Enable");
  // Navigate back to conversation
  await device1.waitForElementToBePresent({
    strategy: "id",
    selector:
      "com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  });
  await device1.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );

  await device1.clickOnElement("Navigate up");
  // Enable voice calls on device 2 for User B
  await device2.clickOnElement("Call");
  // Enabled voice calls in privacy settings
  await device2.waitForElementToBePresent({
    strategy: "id",
    selector: "android:id/button1",
  });
  await device2.clickOnElementById("android:id/button1");
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
  await device2.clickOnElement("Enable");
  // Navigate back to conversation
  await device2.waitForElementToBePresent({
    strategy: "id",
    selector:
      "com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  });
  await device2.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await device2.clickOnElement("Navigate up");
  // Make call on device 1 (userA)
  await device1.clickOnElement("Call");
  // Answer call on device 2
  await device2.clickOnElement("Answer call");
  // Wait 5 seconds
  await sleepFor(5000);
  // Hang up
  await device1.clickOnElementById("network.loki.messenger:id/endCallButton");
  // Check for config message 'Called User B' on device 1
  await device1.findConfigurationMessage(`Called ${userB.userName}`);
  await device2.findConfigurationMessage(`${userA.userName} called you`);
}

async function voiceCallIos(platform: SupportedPlatformsType) {
  // Open app
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await device1.sendNewMessage(userB, "Testing calls");
  // Look for phone icon (shouldnt be there)
  await device1.hasElementBeenDeleted("accessibility id", "Call");
  // Create contact
  await device2.clickOnElement("Message requests banner");
  // Select message from User A
  await device2.clickOnElement("Message request");
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElement("Accept message request")
  );
  // Type into message input box
  await device2.sendMessage(
    `Reply-message-${userB.userName}-to-${userA.userName}`
  );

  // Verify config message states message request was accepted
  await device1.findConfigurationMessage(
    "Your message request has been accepted."
  );
  // Phone icon should appear now that conversation has been approved
  await device1.clickOnElement("Call");
  // Enabled voice calls in privacy settings
  await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Settings",
  });
  await device1.clickOnElement("Settings");
  // await device1.clickOnElement("Settings");
  // Scroll to bottom of page to voice and video calls
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device1.clickOnElement("Allow voice and video calls");
  await device1.clickOnElement("Continue");
  // Navigate back to conversation
  await device1.clickOnElement("Close button");
  // Enable voice calls on device 2 for User B
  await device2.clickOnElement("Call");
  await device2.clickOnElement("Settings");
  await device2.scrollDown();
  await device2.clickOnElement("Allow voice and video calls");
  await device2.clickOnElement("Enable");
  await device2.clickOnElement("Close button");
  // Make call on device 1 (userA)
  await device1.clickOnElement("Call");
  // Answer call on device 2
  await device2.clickOnElement("Answer call");
  // Wait 10 seconds
  // Hang up
  await device1.clickOnElement("End call button");
  // Check for config message 'Called User B' on device 1
  await device1.findElement("accessibility id", "Configuration message");
}

describe("Voice calls ", () => {
  androidIt("Voice calls", voiceCallAndroid);
  iosIt("Voice calls", voiceCallIos);
});
