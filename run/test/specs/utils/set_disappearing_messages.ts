import { DeviceWrapper } from "../../../types/DeviceWrapper";
import {
  ConversationType,
  DMTimeOption,
  MergedOptions,
  User,
} from "../../../types/testing";
import { sleepFor } from "./sleep_for";

// export function disappearingControlMessageText = async (setterUser: User, you: boolean, [conversationType, timerType, timerDuration]: MergedOptions,
//   ) => {
//     const enforcedType: ConversationType = conversationType;
//     if (enforcedType === '1o1' && timerType === 'Disappear after read option') {
//       while(you)
//         return `You have set messages to disappear ${timerDuration} after they have been read`
//       }

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
