import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { ConversationType, DMTimeOption, User } from "../../../types/testing";
import { sleepFor } from "./sleep_for";

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

// export function disappearingControlMessageText = async (setterUser: User, setterDevice: boolean, [conversationType, timerType, timerDuration]: MergedOptions,
//   ) => {
//     const enforcedType: ConversationType = conversationType;
//     if (enforcedType === '1o1' && timerType === 'Disappear after read option') {
//       switch(setterUser)
//       return `You have set messages to disappear ${timerDuration} after they have been sent`
//     }
//   }

export const setDisappearingMessage = async (
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration]: MergedOptions
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnElement("More options");
  await sleepFor(500);
  await device.clickOnElement("Disappearing messages");
  if (enforcedType === "1o1") {
    await device.clickOnElement(timerType);
  }

  await device.clickOnElement(timerDuration);
  await device.clickOnElement("Set button");
};
