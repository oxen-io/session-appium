import { runOnlyOnAndroid, sleepFor } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { User } from "../../../types/testing";
import { SupportedPlatformsType } from "./open_app";

export const newContact = async (
  platform: SupportedPlatformsType,
  device1: DeviceWrapper,
  Alice: User,
  device2: DeviceWrapper,
  Bob: User
) => {
  await device1.sendNewMessage(Bob, `${Alice.userName} to ${Bob.userName}`);
  // Click on message request folder
  await retryRequest(device1, device2);
  await sleepFor(100);
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Select message from User A
  await device2.clickOnByAccessibilityID("Message request");
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnByAccessibilityID("Accept message request")
  );
  // Type into message input box
  await device2.sendMessage(
    `Reply-message-${Bob.userName}-to-${Alice.userName}`
  );
  // Verify config message states message request was accepted
  await device1.waitForControlMessageToBePresent(
    "Your message request has been accepted."
  );

  console.warn(`${Alice.userName} and ${Bob.userName} are now contacts`);
  return { Alice, Bob, device1, device2 };
};

export const retryRequest = async (
  device1: DeviceWrapper,
  device2: DeviceWrapper
) => {
  const time = Date.now();
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
  });
  const banner = await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message requests banner",
  });
  if (!banner && time - Date.now() < 10000) {
    await device1.sendMessage("Retry");
    console.log(`Retrying message request`);
  } else {
    console.log("Found message request banner: No need for retry");
  }
};
