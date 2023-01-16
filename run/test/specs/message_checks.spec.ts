import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  doFunctionIfElementExists,
  clickOnElement,
  clickOnXAndYCoordinates,
  findMessageWithBody,
  inputText,
  waitForTextElementToBePresent,
  sleepFor,
  replyToMessage,
  sendMessage,
  longPressMessage,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  longPress,
  pressAndHold,
  waitForElementToBePresent,
} from "./utils/index";
import { findElementByXpath } from "./utils/find_elements_stragegy";

async function sendImage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Test sending an image
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-image-1";
  const replyMessage = `Replying to image from ${userA.userName}`;
  // create contact
  await newContact(device1, userA, device2, userB);
  // Push image to device for selection
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)
  // await clickOnElement(device1, "Images folder");
  await clickOnXAndYCoordinates(device1, 34, 498);
  // Select 'continue' on alert
  // Session would like to access your photos
  await doFunctionIfElementExists(device1, "Allow Access to All Photos", () =>
    clickOnElement(device1, "Allow Access to All Photos")
  );
  await doFunctionIfElementExists(device1, "Add", () =>
    clickOnElement(device1, "Add")
  );
  await doFunctionIfElementExists(device1, "Done", () =>
    clickOnElement(device1, "Done")
  );
  // Select image
  const elems = await findElementByXpath(
    device1,
    '//XCUIElementTypeCollectionView[@name="Images"]/XCUIElementTypeCell[2]'
  );
  await clickOnElement(device1, elems.ELEMENT);
  // Send with captions
  await clickOnElement(device1, "Text input box");
  await inputText(device1, "Text input box", testMessage);
  await clickOnElement(device1, "Send button");
  // Check if the 'Tap to download media' config appears
  // User B - Click on untrusted attachment message
  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await clickOnElement(device2, "Download");

  // Reply to message
  await sleepFor(5000);

  await longPressMessage(device2, testMessage);

  await clickOnElement(device2, "Reply to message");
  await sendMessage(device2, replyMessage);
  await waitForTextElementToBePresent(device1, "Message Body", replyMessage);
}

async function sendVideo(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-video-1";
  const replyMessage = `Replying to video from ${userA.userName}`;
  // create contact
  await newContact(device1, userA, device2, userB);
  // Push image to device for selection
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)
  // await clickOnElement(device1, "Images folder");
  await clickOnXAndYCoordinates(device1, 34, 498);
  // Select 'continue' on alert
  // Session would like to access your photos
  await doFunctionIfElementExists(device1, "Allow Access to All Photos", () =>
    clickOnElement(device1, "Allow Access to All Photos")
  );
  await doFunctionIfElementExists(device1, "Add", () =>
    clickOnElement(device1, "Add")
  );
  await doFunctionIfElementExists(device1, "Done", () =>
    clickOnElement(device1, "Done")
  );
  // Select video
  const elems = await findElementByXpath(
    device1,
    '//XCUIElementTypeCollectionView[@name="Images"]/XCUIElementTypeCell[1]'
  );
  await clickOnElement(device1, elems.ELEMENT);

  // Send with captions
  await clickOnElement(device1, "Text input box");
  await inputText(device1, "Text input box", testMessage);
  await clickOnElement(device1, "Send button");
  // Check if the 'Tap to download media' config appears
  // User B - Click on untrusted attachment message
  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await clickOnElement(device2, "Download media");

  // Reply to message
  await sleepFor(3000);
  await longPressMessage(device2, testMessage);
  await clickOnElement(device2, "Reply to message");
  await sendMessage(device2, replyMessage);
  await waitForTextElementToBePresent(device1, "Message Body", replyMessage);
  // Close app and server
  await closeApp(device1, device2);
}

async function sendVoiceMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to voice message from ${userA.userName}`;
  await newContact(device1, userA, device2, userB);
  // Select voice message button to activate recording state
  await pressAndHold(device1, "New voice message");

  await doFunctionIfElementExists(device1, "OK", () =>
    clickOnElement(device1, "OK")
  );
  // await pressAndHold(device1, "New voice message");

  await waitForElementToBePresent(device1, "Voice message");

  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(200);
  await clickOnElement(device2, "Download");

  // await sleepFor(1500);

  await pressAndHold(device2, "Voice message");
  await clickOnElement(device2, "Reply to message");
  await sendMessage(device2, replyMessage);
  await waitForTextElementToBePresent(device1, "Message Body", replyMessage);

  await closeApp(device1, device2);
}

// async function sendDoc

async function sendGif(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices and server
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  const testMessage = "Testing-GIF-1";
  const replyMessage = `Replying to GIF from ${userA.userName}`;
  // create contact
  await newContact(device1, userA, device2, userB);
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select GIF tab
  await runOnlyOnIOS(platform, () => clickOnXAndYCoordinates(device1, 36, 394));
  await runOnlyOnAndroid(platform, () => clickOnElement(device1, "GIF button"));
  await runOnlyOnAndroid(platform, () => clickOnElement(device1, "OK"));

  // Select gif
  await sleepFor(3000);
  const gif = await findElementByXpath(
    device1,
    `(//XCUIElementTypeImage[@name="gif cell"])[1]`
  );
  await device1.click(gif.ELEMENT);
  await clickOnElement(device1, "Text input box");
  await inputText(device1, "Text input box", testMessage);
  await clickOnElement(device1, "Send button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(500);
  // Click on 'download'
  await clickOnElement(device2, "Download");
  // Reply to message
  await sleepFor(3000);
  await longPressMessage(device2, testMessage);
  // Check reply came through on device1
  await clickOnElement(device2, "Reply to message");
  await sendMessage(device2, replyMessage);
  await waitForTextElementToBePresent(device1, "Message Body", replyMessage);
  // Close app
  await closeApp(device1, device2);
}

async function sendLongMessage(platform: SupportedPlatformsType) {
  const longText =
    "Mauris sapien dui, sagittis et fringilla eget, tincidunt vel mauris. Mauris bibendum quis ipsum ac pulvinar. Integer semper elit vitae placerat efficitur. Quisque blandit scelerisque orci, a fringilla dui. In a sollicitudin tortor. Vivamus consequat sollicitudin felis, nec pretium dolor bibendum sit amet. Integer non congue risus, id imperdiet diam. Proin elementum enim at felis commodo semper. Pellentesque magna magna, laoreet nec hendrerit in, suscipit sit amet risus. Nulla et imperdiet massa. Donec commodo felis quis arcu dignissim lobortis. Praesent nec fringilla felis, ut pharetra sapien. Donec ac dignissim nisi, non lobortis justo. Nulla congue velit nec sodales bibendum. Nullam feugiat, mauris ac consequat posuere, eros sem dignissim nulla, ac convallis dolor sem rhoncus dolor. Cras ut luctus risus, quis viverra mauris.";
  // Sending a long text message
  // Open device and server
  const { device1, device2 } = await openAppTwoDevices(platform);
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
  await closeApp(device1, device2);
}

describe("Message checks", async () => {
  await iosIt("Send image and reply test", sendImage);
  await androidIt("Send image and reply test", sendImage);

  await iosIt("Send video and reply test", sendVideo);
  await androidIt("Send video and reply test", sendVideo);

  await iosIt("Send voice message test", sendVoiceMessage);
  await androidIt("Send voice message test", sendVoiceMessage);

  // await iosIt("Send document and reply test", sendDocument);
  // await androidIt("Send document and reply test", sendDocument);

  await iosIt("Send GIF and reply", sendGif);
  await androidIt("Send GIF and reply", sendGif);

  await iosIt("Send long text and reply test", sendLongMessage);
  await androidIt("Send long text and reply test", sendLongMessage);
});
