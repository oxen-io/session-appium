import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";
import { sleepFor } from "./sleep_for";

export const joinCommunity = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  communityLink: string,
  communityName: string
) => {
  await device.clickOnElement("New conversation button");
  await device.clickOnElement("Join Community");
  if (platform === "ios") {
    await device.inputText(
      "accessibility id",
      "Enter Community URL",
      communityLink
    );
    await device.clickOnElement("Join");
    // Wait for community to load
  } else {
    await device.inputText(
      "accessibility id",
      "Community input",
      communityLink
    );
    await device.clickOnElement("Join community button");
  }
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
    text: communityName,
  });
};
