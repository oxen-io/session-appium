import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { sendMessage } from "./utils/send_message";
import { sendNewMessage } from "./utils/send_new_message";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  clickOnElement,
  findElement,
  findMessageWithBody,
  pressAndHold,
  selectByText,
} from "./utils/utilities";
import { replyToMessage } from "./utils/reply_message";

async function sendImage(platform: SupportedPlatformsType) {
  // Test sending an image
  // open devices and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // create contact
  await newContact(device1, userA, device2, userB);
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  // Check if android or ios (android = documents folder/ ios = images folder)
  await clickOnElement(device1, "Documents folder");
  // Select 'continue' on alert
  await clickOnElement(device1, "Continue to photos");
  // Select 'allow' on alert
  await clickOnElement(device1, "Allow");
  // Select image
  const imageSent = await selectByText(device1, "Image", "picture.jpg");
  // Send without captions
  await clickOnElement(device1, "Send message button");
  // Check if the 'Tap to download media' config appears
  // User B - Click on config
  await clickOnElement(device2, "Configuration message");
  // User B - Click on 'download'
  await clickOnElement(device2, "Download");
  // Reply to message
  const sentMessage = await replyToMessage(device2, userA, imageSent);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app and server
  await closeApp(server, device1, device2);
}

async function sendVideo(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // create contact
  await newContact(device1, userA, device2, userB);
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  await clickOnElement(device1, "Images folder");
  // Select 'continue' on alert
  await clickOnElement(device1, "Continue to photos");
  // Select 'allow' on alert
  await clickOnElement(device1, "Allow");
  // Select video
  const videoSent = await selectByText(device1, "Image", "picture.jpg");
  // Confirm without captions
  await clickOnElement(device1, "Send message button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await clickOnElement(device2, "Configuration message");
  // Click on 'download'
  await clickOnElement(device2, "Download");
  // Reply to message
  const sentMessage = await replyToMessage(device2, userA, videoSent);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app
  await closeApp(server, device1, device2);
}

async function sendVoiceMessage(platform: SupportedPlatformsType) {
  // open devices and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // create contact
  await newContact(device1, userA, device2, userB);
  // Long press microphone icon
  await pressAndHold(device1, "New voice message");
  // Click on 'untrusted attachments message'
  await clickOnElement(device2, "Untrusted attachments message");
  // Accept dialog 'Are you sure?'
  await clickOnElement(device2, "Download media");
  // Check for audio message
  await findElement(device2, "Voice message");
  // Close app
  await closeApp(server, device1, device2);
}

async function sendDocument(platform: SupportedPlatformsType) {
  // Test sending a document
  // open devices and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // create contact
  await newContact(device1, userA, device2, userB);
  // Click on attachments button

  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  await clickOnElement(device1, "Documents folder");
  // Select 'continue' on alert
  await clickOnElement(device1, "Continue to photos");
  // Select 'allow' on alert
  await clickOnElement(device1, "Allow");
  // Select document
  const documentSent = await selectByText(
    device1,
    "Document",
    "documents_1.pdf"
  );
  // Check if the 'Tap to download media' config appears
  // Click on config
  await clickOnElement(device2, "Configuration Message");
  // Click on 'download'
  await clickOnElement(device2, "Download media");
  // Reply to message
  const sentMessage = await replyToMessage(device2, userA, documentSent);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app
  await closeApp(server, device1, device2);
}

async function sendGif(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // create contact
  await newContact(device1, userA, device2, userB);
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select GIF tab
  await clickOnElement(device1, "GIF button");
  // Click send without captions
  // If android
  await clickOnElement(device1, "Send message button");
  // Select 'continue' on alert
  await clickOnElement(device1, "Continue to photos");
  // Select 'allow' on alert
  await clickOnElement(device1, "Allow");
  // Select gif
  const gifSent = await selectByText(device1, "GIF", "first_in_gif_array.GIF");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await clickOnElement(device2, "Configuration message");
  // Click on 'download'
  await clickOnElement(device2, "Download");
  // Reply to message
  const sentMessage = await replyToMessage(device2, userA, gifSent);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app
  await closeApp(server, device1, device2);
}

async function sendLongMessage(platform: SupportedPlatformsType) {
  const longText =
    "Mauris sapien dui, sagittis et fringilla eget, tincidunt vel mauris. Mauris bibendum quis ipsum ac pulvinar. Integer semper elit vitae placerat efficitur. Quisque blandit scelerisque orci, a fringilla dui. In a sollicitudin tortor. Vivamus consequat sollicitudin felis, nec pretium dolor bibendum sit amet. Integer non congue risus, id imperdiet diam. Proin elementum enim at felis commodo semper. Pellentesque magna magna, laoreet nec hendrerit in, suscipit sit amet risus. Nulla et imperdiet massa. Donec commodo felis quis arcu dignissim lobortis. Praesent nec fringilla felis, ut pharetra sapien. Donec ac dignissim nisi, non lobortis justo. Nulla congue velit nec sodales bibendum. Nullam feugiat, mauris ac consequat posuere, eros sem dignissim nulla, ac convallis dolor sem rhoncus dolor. Cras ut luctus risus, quis viverra mauris.";
  // Sending a long text message
  // Open device and server
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Create contact
  await newContact(device1, userA, device2, userB);
  // Send a long message from User A to User B
  await sendMessage(device1, longText);
  // Reply to message (User B to User A)
  const sentMessage = await replyToMessage(device2, userA, longText);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app
  await closeApp(server, device1, device2);
}

describe("Message checks", () => {
  iosIt("Send image and reply test", sendImage);
  androidIt("Send image and reply test", sendImage);

  iosIt("Send video and reply test", sendVideo);
  androidIt("Send video and reply test", sendVideo);

  iosIt("Send voice message test", sendVoiceMessage);
  androidIt("Send voice message test", sendVoiceMessage);

  iosIt("Send document and reply test", sendDocument);
  androidIt("Send document and reply test", sendDocument);

  iosIt("Send GIF and reply ", sendGif);
  androidIt("Send GIF and reply ", sendGif);

  iosIt("Send long text and reply test", sendLongMessage);
  androidIt("Send long text and reply test", sendLongMessage);
});
