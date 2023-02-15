import { androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  clickOnElement,
  findMessageWithBody,
  waitForTextElementToBePresent,
  sleepFor,
  replyToMessage,
  sendMessage,
  longPressMessage,
  longPress,
  waitForElementToBePresent,
  clickOnElementXPath,
} from "./utils/index";

async function sendImage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-image-1";
  const replyMessage = `Replying to image from ${userA.userName}`;

  await newContact(platform, device1, userA, device2, userB);

  await clickOnElement(device1, "Attachments button");

  await sleepFor(100);

  await clickOnElement(device1, "Documents folder");
  // await clickOnElement(device1, "Show roots");
  await clickOnElementXPath(
    device1,
    `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/androidx.cardview.widget.CardView[2]`
  );
  // await clickOnElementXPath(
  //   device1,
  //   `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/androidx.cardview.widget.CardView[2]/androidx.cardview.widget.CardView/android.widget.RelativeLayout/android.widget.FrameLayout[1]`
  // );

  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await clickOnElement(device2, "Download media");

  // Reply to message
  await sleepFor(5000);

  await longPress(device2, "Media message");
  let pageSource = await device1.getPageSource();
  console.log("Page source", pageSource);
  await clickOnElement(device2, "Reply to message");
  await sendMessage(device2, replyMessage);
  await waitForTextElementToBePresent(device1, "Message Body", replyMessage);
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
  await clickOnElement(device1, "Attachments button");
  // Select images button/tab
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)
  // await clickOnElement(device1, "Images folder");
  await clickOnElement(device1, "Documents folder");
  // Select 'continue' on alert
  // Session would like to access your photos

  // Select video
  await clickOnElementXPath(
    device1,
    `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/androidx.cardview.widget.CardView[3]/androidx.cardview.widget.CardView/android.widget.RelativeLayout`
  );
  // Check if the 'Tap to download media' config appears
  // User B - Click on untrusted attachment message
  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(1000);
  // User B - Click on 'download'
  await clickOnElement(device2, "Download media");

  // Reply to message
  await sleepFor(5000);
  await longPress(device2, "Media message");
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
  await newContact(platform, device1, userA, device2, userB);
  // Select voice message button to activate recording state
  await longPress(device1, "New voice message");

  await clickOnElement(device1, "CONTINUE");
  // await pressAndHold(device1, "New voice message");

  await waitForElementToBePresent(device1, "Voice message");

  await clickOnElement(device2, "Untrusted attachment message");
  await sleepFor(200);
  await clickOnElement(device2, "Download");

  // await sleepFor(1500);

  await longPress(device2, "Voice message");
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
  await newContact(platform, device1, userA, device2, userB);
  // Click on attachments button
  await clickOnElement(device1, "Attachments button");
  // Select GIF tab

  await clickOnElement(device1, "GIF button");
  await clickOnElement(device1, "OK");

  // Select gif
  await sleepFor(3000);
  await clickOnElementXPath(
    device1,
    `(//XCUIElementTypeImage[@name="gif cell"])[1]`
  );
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
  await newContact(platform, device1, userA, device2, userB);
  // Send a long message from User A to User B
  await sendMessage(device1, longText);
  // Reply to message (User B to User A)
  const sentMessage = await replyToMessage(device2, userA, longText);
  // Check reply came through on device1
  await findMessageWithBody(device1, sentMessage);
  // Close app
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
  const sentMessage = await sendMessage(
    device1,
    "Checking unsend functionality"
  );
  // await sleepFor(1000);
  await waitForTextElementToBePresent(device2, "Message Body", sentMessage);
  console.log("Doing a long click on" + `${sentMessage}`);
  // Select and long press on message to delete it
  await longPressMessage(device1, sentMessage);
  // Select Delete icon
  await clickOnElement(device1, "Delete message");
  // Select 'Delete for me and User B'
  await clickOnElement(device1, "Delete for everyone");
  // Look in User B's chat for alert 'This message has been deleted?'
  await waitForElementToBePresent(device2, "Deleted message");

  // Excellent
  await closeApp(device1, device2);
}

describe("Message checks android", async () => {
  await androidIt("Send image and reply test", sendImage);
  await androidIt("Send video and reply test", sendVideo);
  await androidIt("Send voice message test", sendVoiceMessage);
  // await androidIt("Send document and reply test", sendDocument);
  await androidIt("Send GIF and reply", sendGif);
  await androidIt("Send long text and reply test", sendLongMessage);
  await androidIt("Unsend message", unsendMessage);
});
// Link preview without image
// Link preview with image
// Media saved notification
