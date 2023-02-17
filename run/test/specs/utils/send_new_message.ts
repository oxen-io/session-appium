import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { User } from "../../../types/testing";

export const sendNewMessage = async (
  device: DeviceWrapper,
  user: User,
  message: string
) => {
  // Sender workflow
  // Click on plus button
  await device.clickOnElement("New conversation button");
  // Select direct message option
  await device.clickOnElement("New direct message");
  // Enter User B's session ID into input box
  await device.inputText("Session id input box", user.sessionID);
  // Click next
  await device.clickOnElement("Next");
  // Type message into message input box

  await device.inputText("Message input box", message);
  // Click send
  await device.clickOnElement("Send message button");
  // Wait for tick
  await device.waitForElementToBePresent(`Message sent status: Sent`);

  return message;
};
