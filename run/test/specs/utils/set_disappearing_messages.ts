import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { ConversationType, DMTimeOption } from "../../../types/testing";

type DisappearOpts1o1 = [
  "1o1",
  "Disappear after read option" | "Disappear after send option",
  DMTimeOption
];

type DisappearOptsGroup = [
  "Group" | "Note to Self",
  "Disappear after send option",
  DMTimeOption
];

type MergedOptions = DisappearOpts1o1 | DisappearOptsGroup;

export const setDisappearingMessage = async (
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration]: MergedOptions
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnElement("More options");
  await device.clickOnElement("Disappearing messages");
  if (enforcedType === "1o1") {
    await device.clickOnElement(timerType);
  }

  await device.clickOnElement(timerDuration);
  await device.clickOnElement("Set button");
};
