import { androidIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";

import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

async function sendImage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to image from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);
  await device1.clickOnElement("Attachments button");
  await sleepFor(100);
  await device1.clickOnElement("Documents folder");

  const mediaButtons = await device1.findElementsByClass(
    "android.widget.CompoundButton"
  );
  const imageButton = await device1.findMatchingTextInElementArray(
    mediaButtons,
    "Images"
  );
  if (!imageButton) {
    throw new Error("imageButton was not found in android");
  }
  await device1.click(imageButton.ELEMENT);
  const testImage = await device1.doesElementExist({
    strategy: "id",
    selector: "android:id/title",
    maxWait: 2000,
    text: "test_image.jpg",
  });
  if (!testImage) {
    await runScriptAndLog(
      `adb -s emulator-5554 push 'run/test/specs/media/test_image.jpg' /storage/emulated/0/Download`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnTextElementById("android:id/title", "test_image.jpg");

  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");

  // Reply to message

  await device2.longPress("Media message");
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: replyMessage,
  });
  // Close app and server
  await closeApp(device1, device2);
}

async function sendDocument(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to document from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);
  await device1.clickOnElement("Attachments button");
  await sleepFor(100);
  await device1.clickOnElement("Documents folder");
  const mediaButtons = await device1.findElementsByClass(
    "android.widget.CompoundButton"
  );
  const documentsButton = await device1.findMatchingTextInElementArray(
    mediaButtons,
    "Documents"
  );
  if (!documentsButton) {
    throw new Error("documentsButton was not found");
  }
  await device1.click(documentsButton.ELEMENT);
  const testDocument = await device1.doesElementExist({
    strategy: "id",
    selector: "android:id/title",
    maxWait: 1000,
    text: "test_file.pdf",
  });
  if (!testDocument) {
    await runScriptAndLog(
      `adb -s emulator-5554 push 'run/test/specs/media/test_file.pdf' /storage/emulated/0/Download`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnTextElementById("android:id/title", "test_file.pdf");
  await device2.clickOnElement("Untrusted attachment message", 7000);
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");

  // Reply to message
  // await sleepFor(5000);
  await device2.longPress("Document");
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: replyMessage,
  });
  // Close app and server
  await closeApp(device1, device2);
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
  const replyMessage = `Replying to video from ${userA.userName}`;
  // create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click on attachments button
  await device1.clickOnElement("Attachments button");
  await sleepFor(100);
  // Select images button/tab
  await device1.clickOnElement("Documents folder");
  // Select video
  const mediaButtons = await device1.findElementsByClass(
    "android.widget.CompoundButton"
  );
  const videosButton = await device1.findMatchingTextInElementArray(
    mediaButtons,
    "Videos"
  );
  if (!videosButton) {
    throw new Error("videosButton was not found");
  }
  await device1.click(videosButton.ELEMENT);
  const testVideo = await device1.doesElementExist({
    strategy: "id",
    selector: "android:id/title",
    maxWait: 1000,
    text: "test_video.mp4",
  });
  if (!testVideo) {
    // Adds video to downloads folder if it isn't already there
    await runScriptAndLog(
      `adb -s emulator-5554 push 'run/test/specs/media/test_video.mp4' /storage/emulated/0/Download`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnTextElementById("android:id/title", "test_video.mp4");
  // User B - Click on untrusted attachment message
  await device2.clickOnElement("Untrusted attachment message", 10000);
  // await sleepFor(1000);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");
  // Reply to message
  await device2.waitForElementToBePresent({
    strategy: "id",
    selector: "network.loki.messenger:id/play_overlay",
  });
  await device2.longPress("Media message");
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await sleepFor(2000);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: replyMessage,
  });
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
  await newContact(platform, device1, userA, device2, userB);
  // Select voice message button to activate recording state
  await device1.longPress("New voice message");

  await device1.clickOnElement("Continue");
  await device1.clickOnElementXPath(
    `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button[1]`
  );
  await device1.pressAndHold("New voice message");
  // await device1.waitForElementToBePresent("Voice message");
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(200);
  await device2.clickOnElement("Download media");
  await sleepFor(1500);
  await device2.longPress("Voice message");
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: replyMessage,
  });

  await closeApp(device1, device2);
}

async function sendGif(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices and server
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to GIF from ${userA.userName}`;
  // create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click on attachments button
  await device1.clickOnElement("Attachments button");
  // Select GIF tab

  await device1.clickOnElement("GIF button");
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Continue",
  });

  // Select gif
  await sleepFor(3000);
  await device1.clickOnElementXPath(
    `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]`
  );

  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnElement("Untrusted attachment message", 9000);
  await sleepFor(500);
  // Click on 'download'
  await device2.clickOnElement("Download media");
  // Reply to message
  await sleepFor(5000);
  await device2.longPress("Media message");
  // Check reply came through on device1
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: replyMessage,
  });
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
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Send a long message from User A to User B
  await device1.sendMessage(longText);
  // Reply to message (User B to User A)
  const sentMessage = await device2.replyToMessage(userA, longText);
  // Check reply came through on device1
  await device1.clickOnElementAll({
    strategy: "id",
    selector: "network.loki.messenger:id/scrollToBottomButton",
  });
  await device1.findMessageWithBody(sentMessage);
  // Close app
  await closeApp(device1, device2);
}

async function sendLink(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Send a link
  await device1.inputText(
    "accessibility id",
    "Message input box",
    `https://nerdlegame.com/`
  );
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
  await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Send again for image
  await device1.inputText(
    "accessibility id",
    "Message input box",
    `https://nerdlegame.com/`
  );
  await sleepFor(100);
  await device1.clickOnElement("Send message button");
  // Make sure link works (dialog pop ups saying are you sure?)

  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: `https://nerdlegame.com/`,
  });
  await closeApp(device1, device2);
}

async function unsendMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);

  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // send message from User A to User B
  const sentMessage = await device1.sendMessage(
    "Checking unsend functionality"
  );
  // await sleepFor(1000);
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: sentMessage,
  });
  console.log("Doing a long click on" + `${sentMessage}`);
  // Select and long press on message to delete it
  await device1.longPressMessage(sentMessage);
  // Select Delete icon
  await device1.clickOnElement("Delete message");
  // Select 'Delete for me and User B'
  await device1.clickOnElement("Delete for everyone");
  // Look in User B's chat for alert 'This message has been deleted?'
  await device2.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Deleted message",
  });

  // Excellent
  await closeApp(device1, device2);
}

async function deleteMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);

  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // send message from User A to User B
  const sentMessage = await device1.sendMessage(
    "Checking deletion functionality"
  );
  // await sleepFor(1000);
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: sentMessage,
  });
  // Select and long press on message to delete it
  await device1.longPressMessage(sentMessage);
  // Select Delete icon
  await device1.clickOnElement("Delete message");
  // Select 'Delete for me and User B'
  await device1.clickOnElement("Delete just for me");
  // Look in User B's chat for alert 'This message has been deleted?'
  await sleepFor(1000);
  await device1.hasTextElementBeenDeleted("Message Body", sentMessage);

  // Excellent
  await closeApp(device1, device2);
}

async function checkPerformance(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  const timesArray: Array<number> = [];

  let i;
  for (i = 1; i <= 10; i++) {
    const timeMs = await device1.measureSendingTime(i);
    timesArray.push(timeMs);
  }
  console.log(timesArray);
}

describe("Message checks android", () => {
  androidIt("Send image", sendImage);
  androidIt("Send video", sendVideo);
  androidIt("Send voice message", sendVoiceMessage);
  androidIt("Send document", sendDocument);
  androidIt("Send link", sendLink);
  androidIt("Send GIF", sendGif);
  androidIt("Send long text", sendLongMessage);
  androidIt("Unsend message", unsendMessage);
  androidIt("Delete message", deleteMessage);
  androidIt("Check performance", checkPerformance);
});

// Link preview without image
// Link preview with image
// Media saved notification
