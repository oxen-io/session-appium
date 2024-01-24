import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { ConversationType, MergedOptions } from "../../../types/testing";
import { SupportedPlatformsType } from "./open_app";
import { sleepFor } from "./sleep_for";

export const setDisappearingMessage = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration]: MergedOptions,
  device2?: DeviceWrapper
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnElement("More options");
  await sleepFor(500);
  if (platform === "ios") {
    device.clickOnElement("Disappearing Messages");
  } else {
    device.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Disappearing messages"
    );
  }
  if (enforcedType === "1o1") {
    await device.clickOnElement(timerType);
  }
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "1 day",
  });

  await device.disappearRadioButtonSelected("1 day");
  await device.clickOnElement(timerDuration);
  await device.clickOnElement("Set");
  await sleepFor(1000);
  if (device2) {
    if (platform === "ios") {
      await device2.clickOnElementAll({
        strategy: "accessibility id",
        selector: "Follow Setting",
      });
    } else {
      await device2.clickOnElementAll({
        strategy: "id",
        selector: `network.loki.messenger:id/followSetting`,
        text: "Follow Setting",
      });
    }
    await sleepFor(500);
    if (platform === "android") {
      await device2.clickOnElementAll({
        strategy: "accessibility id",
        selector: "Set",
      });
    } else {
      await device2.clickOnElementAll({
        strategy: "accessibility id",
        selector: "Set button",
      });
    }
  }
};
