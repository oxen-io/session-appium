import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { closeApp, openAppOnPlatformSingleDevice, SupportedPlatformsType } from './utils/open_app';
import { USERNAME } from '../../types/testing';

// TODO assign risk assessment value once PR 16 is merged (assumption: high)
iosIt('Invite a friend', inviteAFriendiOS);
androidIt('Invite a friend', inviteAFriendAndroid)

async function inviteAFriendiOS(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    // This is a const so that the user.accountID can be used later on 
    const user = await newUser(device, USERNAME.ALICE, platform);
    // Hit the plus button
    await device.clickOnByAccessibilityID('New conversation button');
    // Select Invite a Friend
    await device.clickOnByAccessibilityID('Invite friend button');
    // Check for presence of Account ID field
    await device.waitForTextElementToBePresent({
        strategy: 'accessibility id', 
        selector: 'Account ID'});
    // Tap Share
    await device.clickOnByAccessibilityID('Share button'); 
    // tap Copy in the native UI
    await device.clickOnByAccessibilityID('doc.on.doc');
    // The share message from the Invite a Friend screen has been copied but there is no way to access clipboard 
    // Therefore we paste the copied message to Note to Self
    await device.clickOnByAccessibilityID('Back')
    await device.clickOnByAccessibilityID('X')
    await device.clickOnByAccessibilityID('Search button');
    await device.clickOnByAccessibilityID('Note to Self');
    // Long press on Message composition box, select the native Paste option
    await device.waitForTextElementToBePresent({
        strategy: 'accessibility id',
        selector: 'Message input box',
    });
    await device.longPress('Message input box');
    await device.clickOnElementAll({
        strategy: 'xpath', 
        selector: '//XCUIElementTypeStaticText[@name="Paste"]'
    })
    // Close the Link Preview modal
    // Accept dialog for link preview
    await device.clickOnElementAll({
        strategy: 'accessibility id',
        selector: 'Enable',
    });
    // The share message is retrieved from the message input box and verified whether it contains the user.accountID
    const retrievedShareMessage = await device.grabTextFromAccessibilityId('Message input box')
    console.log(`Expecting the Account ID ${user.accountID} to be present in the Invite a Friend message snippet`)
    if (retrievedShareMessage.includes(user.accountID)) {
        console.log("The Invite a Friend message snippet contains the user's Account ID")
    }
    else {
        throw new Error(`The Invite a Friend message snippet does not contain the user's Account ID\nThe message goes ${retrievedShareMessage}`)
    }
    await closeApp(device);
    };

async function inviteAFriendAndroid(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    // This is a const so that the user.accountID can be used later on 
    const user = await newUser(device, USERNAME.ALICE, platform);
    // Hit the plus button
    await device.clickOnByAccessibilityID('New conversation button');
    // Select Invite a Friend
    await device.clickOnByAccessibilityID('Invite friend button');
    // Check for presence of Account ID field
    await device.waitForTextElementToBePresent({
        strategy: 'accessibility id', 
        selector: 'Account ID'});
    // Tap Share
    await device.clickOnByAccessibilityID('Share button'); 
    // Grab text from native UI
    const shareUI = await device.waitForTextElementToBePresent({
        strategy: 'id',
        selector: 'android:id/content_preview_text',
      });
    const retrievedShareMessage = await device.getTextFromElement(shareUI);
    // Verify that the Share message contains the user's Account ID
    console.log(`Expecting the Account ID ${user.accountID} to be present in the Invite a Friend message snippet`)
    if (retrievedShareMessage.includes(user.accountID)) {
        console.log("The Invite a Friend message snippet contains the user's Account ID")
    }
    else {
        throw new Error(`The Invite a Friend message snippet does not contain the user's Account ID\nThe message goes ${retrievedShareMessage}`)
    }
    await closeApp(device);
}