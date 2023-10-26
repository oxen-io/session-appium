import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { ConversationType, DMTimeOption } from "../../../types/testing";
import { SupportedPlatformsType } from "./open_app";
import { runOnlyOnIOS, runOnlyOnAndroid } from "./run_on";
import { sleepFor } from "./sleep_for";

type DisappearOpts1on1 = [
  "1:1",
  "Disappear after read option" | "Disappear after send option",
  DMTimeOption
];

type DisappearOptsGroup = [
  "Group" | "Note to Self",
  "Disappear after send option",
  DMTimeOption
];

type MergedOptions = DisappearOpts1on1 | DisappearOptsGroup;

export const setDisappearingMessage = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration]: MergedOptions
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnElement("More options");
  await sleepFor(500);
  // Select disappearing messages option
  await runOnlyOnIOS(platform, () =>
    device.clickOnElement("Disappearing messages")
  );
  await runOnlyOnAndroid(platform, () =>
    device.clickOnElementAll({
      strategy: "id",
      selector: "network.loki.messenger:id/title",
      text: "Disappearing messages",
    })
  );
  if (enforcedType === "1:1") {
    await device.clickOnElement(timerType);
  }

  await device.clickOnElement(timerDuration);
  await device.clickOnElement("Set button");
};
