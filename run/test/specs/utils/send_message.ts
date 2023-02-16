import { clickOnElement, inputText } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const sendMessage = async (device: DeviceWrapper, message: string) => {
  await inputText(device, "Message input box", message);
  // Click send
  await clickOnElement(device, "Send message button");
  // Wait for tick
  await device.waitForElementToBePresent(`Message sent status: Sent`);

  return message;
};
