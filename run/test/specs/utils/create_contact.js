"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newContact = void 0;
const utilities_1 = require("./utilities");
const create_account_1 = require("./create_account");
const send_message_1 = require("./send_message");
const newContact = async (device1, device2) => {
    const [userA, userB] = await Promise.all([
        (0, create_account_1.newUser)(device1, "User A"),
        (0, create_account_1.newUser)(device2, "User B"),
    ]);
    await (0, send_message_1.sendMessage)(device1, userB);
    await (0, utilities_1.clickOnElement)(device2, "Message requests banner");
    await (0, utilities_1.clickOnElement)(device2, "Message request");
    await (0, utilities_1.inputText)(device2, "Message input box", "Test-message-User-B-to-User-A");
    await (0, utilities_1.clickOnElement)(device2, "Send message button");
    await device1.elementByAccessibilityId("Message request was accepted");
    return { userA, userB, device1, device2 };
};
exports.newContact = newContact;
//# sourceMappingURL=create_contact.js.map