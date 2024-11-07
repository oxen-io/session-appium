import { bothPlatformsIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { closeApp, openAppOnPlatformSingleDevice, SupportedPlatformsType } from './utils/open_app';
import { AccessibilityId, USERNAME } from '../../types/testing';
import { PlusButton, SearchButton } from './locators/home';
import { AccountIDField, CloseButton, InviteAFriendOption, ShareButton } from './locators/start_conversation';
import { MessageInput } from './locators/conversation';
import { EnableButton } from './locators/global';
import { NoteToSelfOption } from './locators/global_search';

// TODO assign risk assessment value once PR 16 is merged (assumption: high)
bothPlatformsIt('Invite a friend', inviteAFriend)

let retrieveElement;

async function inviteAFriend(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    // This is a const so that the user.accountID can be used later on 
    const user = await newUser(device, USERNAME.ALICE, platform);
    // Hit the plus button
    await device.clickOnElementAll(new PlusButton(device));
    // Select Invite a Friend
    await device.clickOnElementAll(new InviteAFriendOption(device));
    // Check for presence of Account ID field
    await device.waitForTextElementToBePresent(new AccountIDField(device));
    // Tap Share
    await device.clickOnElementAll(new ShareButton(device));
    // retrieving the "Hey..." message is different for each platform
    if (platform === 'ios') {
        // tap Copy in the native UI
        await device.clickOnByAccessibilityID('doc.on.doc');
        // The share message from the Invite a Friend screen has been copied but there is no way to access clipboard 
        // Therefore we paste the copied message to Note to Self
        await device.clickOnElementAll(new CloseButton(device));
        // Access Note to Self through Global Search entry
        await device.clickOnElementAll(new SearchButton(device));
        await device.clickOnElementAll(new NoteToSelfOption(device));
        // Long press on Message composition box
        await device.longPress(new MessageInput(device).build().selector as AccessibilityId);
        // tap the native Paste UI
        await device.clickOnElementAll({
            strategy: 'xpath', 
            selector: '//XCUIElementTypeStaticText[@name="Paste"]'
        })
        // The Share message has a link in it so the Enable Link Previews modal pops up
        await device.clickOnElementAll(new EnableButton(device));
        // Define the element to be retriefed from
        retrieveElement = await device.waitForTextElementToBePresent(new MessageInput(device).build());
    }
    else {
        // Define the native Android UI element to be retrieved from
        retrieveElement = await device.waitForTextElementToBePresent({
            strategy: 'id',
            selector: 'android:id/content_preview_text',
        })
    }
    // Retrieve the Share message and validate that it contains the user's Account ID 
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