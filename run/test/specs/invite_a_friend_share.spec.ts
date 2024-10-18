import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { closeApp, openAppOnPlatformSingleDevice, SupportedPlatformsType } from './utils/open_app';
import { AccessibilityId, USERNAME } from '../../types/testing';
import { PlusButton, SearchButton } from './locators/home';
import { AccountIDField, CloseButton, InviteAFrienOption, ShareButton } from './locators/start_conversation';
import { MessageInput } from './locators/conversation';
import { Accessibility } from '@playwright/test';
import { EnableButton } from './locators/global';

// TODO assign risk assessment value once PR 16 is merged (assumption: high)
iosIt('Invite a friend', inviteAFriendiOS);
androidIt('Invite a friend', inviteAFriendAndroid)

async function inviteAFriendiOS(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    // This is a const so that the user.accountID can be used later on 
    const user = await newUser(device, USERNAME.ALICE, platform);
    // Hit the plus button
    await device.clickOnElementAll(new PlusButton(device));
    // Select Invite a Friend
    await device.clickOnElementAll(new InviteAFrienOption(device));
    // Check for presence of Account ID field
    await device.waitForTextElementToBePresent(new AccountIDField(device));
    // Tap Share
    await device.clickOnElementAll(new ShareButton(device));
    // tap Copy in the native UI - delibrately not recording this in the POM
    await device.clickOnByAccessibilityID('doc.on.doc');
    // The share message from the Invite a Friend screen has been copied but there is no way to access clipboard 
    // Therefore we paste the copied message to Note to Self
    await device.clickOnElementAll(new CloseButton(device));
    // Access Note to Self through Global Search entry
    await device.clickOnElementAll(new SearchButton(device));
    await device.clickOnByAccessibilityID('Note to Self');
    // Long press on Message composition box
    await device.longPress(new SearchButton(device).build().selector as AccessibilityId);
    // tap the native Paste UI - deliberately not recording this in the POM
    await device.clickOnElementAll({
        strategy: 'xpath', 
        selector: '//XCUIElementTypeStaticText[@name="Paste"]'
    })
    // Close the Link Preview modal
    // Enable modal for link previews
    await device.clickOnElementAll(new EnableButton(device));
    // The share message is retrieved from the message input box and verified whether it contains the user.accountID
    const retrieveElement = await device.waitForTextElementToBePresent(new MessageInput(device).build());
    const retrievedShareMessage = await device.getTextFromElement(retrieveElement)
    console.log(`Expecting the Account ID ${user.accountID} to be present in the Invite a Friend message snippet`);
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
    await device.clickOnElementAll(new PlusButton(device));
    // Select Invite a Friend
    await device.clickOnElementAll(new InviteAFrienOption(device));
    // Check for presence of Account ID field
    await device.waitForTextElementToBePresent(new AccountIDField(device));
    // Tap Share
    await device.clickOnElementAll(new ShareButton(device));
    // Grab text from native Share UI - deliberately not recording this in the POM
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