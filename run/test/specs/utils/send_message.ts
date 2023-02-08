import { clickOnElement, inputText } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { waitForElementToBePresent } from "./wait_for";

export const sendMessage = async (device: DeviceWrapper, message: string) => {
  await inputText(device, "Message input box", message);
  // Click send
  await clickOnElement(device, "Send message button");
  // Wait for tick
  await waitForElementToBePresent(device, "Message sent status tick");

  return message;
};
