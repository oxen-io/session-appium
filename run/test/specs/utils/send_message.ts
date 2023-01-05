import { clickOnElement, inputText } from ".";
import { waitForElementToBePresent } from "./wait_for";
import * as wd from "wd";

export const sendMessage = async (
  device: wd.PromiseWebdriver,
  message: string
) => {
  await inputText(device, "Message input box", message);
  // Click send
  await clickOnElement(device, "Send message button");
  // Wait for tick
  await waitForElementToBePresent(device, "Message sent status tick");

  return message;
};
