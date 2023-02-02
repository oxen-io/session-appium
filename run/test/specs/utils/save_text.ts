import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { waitForElementToBePresent } from "./wait_for";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<string> => {
  const elementId = await waitForElementToBePresent(device, accessibilityId);

  const text = await getTextFromElement(device, elementId);
  console.log("what text are we getting here", text);
  return text;
};

// export const grabTextFromAccessibilityIdiOS = async (
//   device: DeviceWrapper,
//   accessibilityId: string
// ): Promise<string> => {
//   const element = await waitForElementToBePresent(device, accessibilityId);

//   const text = await getTextFromElement(device, element);
//   console.log("ios text", text);
//   return text;
// };
