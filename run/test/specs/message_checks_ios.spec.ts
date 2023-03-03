import { iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  doFunctionIfElementExists,
  clickOnXAndYCoordinates,
  sleepFor,
  runOnlyOnAndroid,
  runOnlyOnIOS,
} from "./utils/index";
import { runScriptAndLog } from "./utils/utilities";

async function sendImage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const ronSwansonBirthday = "196705060700.00";
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Ron Swanson doesn't like birthdays";
  const replyMessage = `Replying to image from ${userA.userName}`;

  await newContact(platform, device1, userA, device2, userB);

  await device1.clickOnElement("Attachments button");
  await sleepFor(100);
  await clickOnXAndYCoordinates(device1, 34, 498);

  const permissions = await device1.doesElementExist(
    "accessibility id",
    "Allow Access to All Photos",
    2000
  );
  if (permissions) {
    try {
      await device1.clickOnElement(`Allow Access to All Photos`);
      // Select video
    } catch (e) {
      console.log("No permissions dialog");
    }
  } else {
    await device1.clickOnElement("Add");
  }
  const testImage = await device1.doesElementExist(
    "accessibility id",
    `Photo, May 1, 1999, 7:00 AM`,
    2000
  );
  if (!testImage) {
    await runScriptAndLog(
      `touch -a -m -t ${ronSwansonBirthday} 'run/test/specs/media/test_image.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/test_image.jpg'`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnElement(`Photo, May 1, 1999, 7:00 AM`);
  await device1.clickOnElement("Done");
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");

  // Reply to message

  await sleepFor(500);
  await device2.longPressMessage(testMessage);

  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent("Message Body", replyMessage);
  // Close app and server
  await closeApp(device1, device2);
}

async function sendDoc(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const spongebobsBirthday = "199905010700.00";
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-document-1";
  const replyMessage = `Replying to document from ${userA.userName}`;

  await newContact(platform, device1, userA, device2, userB);

  await device1.clickOnElement("Attachments button");
  await sleepFor(100);
  await clickOnXAndYCoordinates(device1, 36, 447);

  const permissions = await device1.doesElementExist(
    "accessibility id",
    "Allow Access to All Photos",
    1000
  );
  if (permissions) {
    try {
      device1.clickOnElement("Allow Access to All Photos");
    } catch (e) {
      console.log("No permissions dialog");
    }
  }
  // const testDocument = await device1.doesElementExist(
  //   "accessibility id",
  //   "Covid.pdf",
  //   1000
  // );
  // if (!testDocument) {
  //   await runScriptAndLog(
  //     `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/test_file.pdf'`
  //   );

  //   await runScriptAndLog(
  //     `xcrun simctl addfile ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/test_file.pdf'`,
  //     true
  //   );
  // }
  // await device1.clickOnElement("covid");
  await clickOnXAndYCoordinates(device1, 88, 250);

  // await device1.clickOnElement("Done");
  // await device1.clickOnElement("Message");
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");

  // Reply to message

  await sleepFor(500);
  await device2.longPressMessage(testMessage);

  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent("Message Body", replyMessage);
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
  const testMessage = "Testing-video-1";
  const replyMessage = `Replying to video from ${userA.userName}`;
  // create contact
  await newContact(platform, device1, userA, device2, userB);
  // Push image to device for selection
  // Click on attachments button
  await device1.clickOnElement("Attachments button");
  // Select images button/tab
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)
  // await device1.clickOnElement("Images folder");
  await clickOnXAndYCoordinates(device1, 34, 498);
  // Select 'continue' on alert
  // Need to put a video on device
  // Session would like to access your photos
  await sleepFor(1000);
  const permissions = await device1.doesElementExist(
    "accessibility id",
    "Allow Access to All Photos",
    1000
  );
  if (permissions) {
    await device1.clickOnElement("Allow Access to All Photos");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist(
    "accessibility id",
    "Settings",
    1000
  );
  if (settingsPermissions) {
    await device1.clickOnElement("Photos");
    await device1.clickOnElement("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnElement("Recents");
  await sleepFor(2000);
  // Select video
  const videoFolder = await device1.doesElementExist(
    "xpath",
    `//XCUIElementTypeStaticText[@name="Videos"]`,
    1000
  );
  if (videoFolder) {
    console.log("Videos folder found");
    await device1.clickOnElement("Videos");
    await device1.clickOnElementXPath(
      `//XCUIElementTypeCollectionView[@name="Images"]/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeImage[1]`
    );
  } else {
    console.log("Videos folder NOT found");
    await runScriptAndLog(
      `xcrun simctl addmedia ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/test_video.mp4'`
    );
    await sleepFor(2000);
    // await device1.clickOnElement("Add");
    await device1.clickOnElementXPath(
      `//XCUIElementTypeCollectionView[@name="Images"]/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeImage[1]`
    );
  }
  await device1.clickOnElementXPath(
    `//XCUIElementTypeCollectionView[@name="Images"]/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeImage[1]`
  );
  // Send with captions
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  // Check if the 'Tap to download media' config appears
  // User B - Click on untrusted attachment message
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");

  // Reply to message
  await sleepFor(3000);
  await device2.longPressMessage(testMessage);
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent("Message Body", replyMessage);
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
  // "Session" would like to access the microphone (Don't allow/ OK)
  const permissions = await device1.waitForElementToBePresent(
    "accessibility id",
    "OK"
  );
  if (permissions) {
    device1.clickOnElement("OK");
    device1.pressAndHold("New voice message");
  } else {
    // Need enable microphone access in settings
    await doFunctionIfElementExists(
      device1,
      "accessibility id",
      "Settings",
      () => device1.clickOnElement("Settings")
    );
    await device1.clickOnElementXPath(
      `//XCUIElementTypeSwitch[@name="Microphone"]/XCUIElementTypeSwitch`
    );
    await sleepFor(100);
    await device1.back();
    await device1.selectByText("Conversation list item", "Alice");
    // await doFunctionIfElementExists(device1, "accessibility id", "OK", () =>
    //   device1.clickOnElement("OK")
    // );
    await device1.pressAndHold("New voice message");
  }
  // await device1.clickOnElement("Allow");
  await device1.waitForElementToBePresent("accessibility id", "Voice message");

  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(200);
  await device2.clickOnElement("Download");

  // await sleepFor(1500);

  await device2.longPress("Voice message");
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent("Message Body", replyMessage);

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
  const testMessage = "Testing-GIF-1";
  const replyMessage = `Replying to GIF from ${userA.userName}`;
  // create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click on attachments button
  await device1.clickOnElement("Attachments button");
  // Select GIF tab
  await runOnlyOnIOS(platform, () => clickOnXAndYCoordinates(device1, 36, 394));
  await runOnlyOnAndroid(platform, () => device1.clickOnElement("GIF button"));
  await runOnlyOnAndroid(platform, () => device1.clickOnElement("OK"));

  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnElement("Continue");
  await device1.clickOnElementXPath(
    `(//XCUIElementTypeImage[@name="gif cell"])[1]`
  );
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(100);
  // Click on 'download'
  await device2.clickOnElement("Download media");
  // Reply to message
  await sleepFor(500);
  await device2.longPressMessage(testMessage);
  // Check reply came through on device1
  await device2.clickOnElement("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent("Message Body", replyMessage);
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
  await device1.waitForElementToBePresent(
    "accessibility id",
    "Message sent status: Sent"
  );
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
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
  await device2.waitForTextElementToBePresent(
    "Message Body",
    `https://nerdlegame.com/`
  );
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
  await device2.waitForTextElementToBePresent("Message Body", sentMessage);
  console.log("Doing a long click on" + `${sentMessage}`);
  // Select and long press on message to delete it
  await device1.longPressMessage(sentMessage);
  // Select Delete icon
  await device1.clickOnElement("Delete message");
  // Select 'Delete for me and User B'
  await device1.clickOnElement("Delete for everyone");
  // Look in User B's chat for alert 'This message has been deleted?'
  await device2.waitForElementToBePresent(
    "accessibility id",
    "Deleted message"
  );

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
    "Checking delete functionality"
  );
  // await sleepFor(1000);
  await device2.waitForTextElementToBePresent("Message Body", sentMessage);
  console.log("Doing a long click on" + `${sentMessage}`);
  // Select and long press on message to delete it
  await device1.longPressMessage(sentMessage);
  // Select Delete icon
  await device1.clickOnElement("Delete message");
  // Select 'Delete for me and User B'
  await device1.clickOnElement("Delete for me");
  // Look in User B's chat for alert 'This message has been deleted?'
  await device1.hasElementBeenDeleted("accessibility id", sentMessage);

  // Excellent
  await closeApp(device1, device2);
}

describe("Message checks ios", async () => {
  await iosIt("Send image and reply test", sendImage);
  await iosIt("Send video and reply test", sendVideo);
  await iosIt("Send voice message test", sendVoiceMessage);
  await iosIt("Send document and reply test", sendDoc);
  await iosIt("Send GIF and reply test", sendGif);
  await iosIt("Send long text and reply test", sendLongMessage);
  await iosIt("Send link test", sendLink);
  await iosIt("Unsend message", unsendMessage);
  await iosIt("Delete message", deleteMessage);
});

// Media saved notification
