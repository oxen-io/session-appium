"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newContact = void 0;
const utilities_1 = require("./utilities");
const send_new_message_1 = require("./send_new_message");
const newContact = async (device1, userA, device2, userB) => {
    await (0, send_new_message_1.sendNewMessage)(device1, userB);
    await (0, utilities_1.clickOnElement)(device2, "Message requests banner");
    await (0, utilities_1.clickOnElement)(device2, "Message request");
    await (0, utilities_1.inputText)(device2, "Message input box", "Test-message-User-B-to-User-A");
    await (0, utilities_1.clickOnElement)(device2, "Send message button");
    await device1.elementByAccessibilityId("Message request was accepted");
    return { userA, userB, device1, device2 };
};
exports.newContact = newContact;
//# sourceMappingURL=create_contact.js.map