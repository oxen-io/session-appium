import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { ConversationType, MergedOptions } from "../../../types/testing";
import { SupportedPlatformsType } from "./open_app";
import { runOnlyOnIOS } from "./run_on";
import { sleepFor } from "./sleep_for";
export const setDisappearingMessage = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration]: MergedOptions,
  device2?: DeviceWrapper
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnByAccessibilityID("More options");
  await sleepFor(500);
  if (platform === "ios") {
    device.clickOnByAccessibilityID("Disappearing Messages");
  } else {
    device.clickOnElementAll({
      strategy: "id",
      selector: `network.loki.messenger:id/title`,
      text: "Disappearing messages",
    });
  }
  if (enforcedType === "1:1") {
    await device.clickOnByAccessibilityID(timerType);
  }
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "1 day",
  });

  await device.disappearRadioButtonSelected("1 day");
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: timerDuration,
  });
  await device.clickOnByAccessibilityID("Set button");
  await runOnlyOnIOS(platform, () => device.navigateBack(platform));
  await sleepFor(1000);
  if (device2) {
    await device2.clickOnElementAll({
      strategy: "accessibility id",
      selector: "Follow setting",
    });
    await sleepFor(500);
    await device2.clickOnElementAll({
      strategy: "accessibility id",
      selector: "Set button",
    });
  }
};
