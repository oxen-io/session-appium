"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const utilities_1 = require("./utilities");
const sendMessage = async (device, userB) => {
    await (0, utilities_1.clickOnElement)(device, "New conversation button");
    await (0, utilities_1.clickOnElement)(device, "New direct message");
    await (0, utilities_1.inputText)(device, "Session id input box", userB.sessionID);
    await (0, utilities_1.clickOnElement)(device, "Next");
    await (0, utilities_1.inputText)(device, "Message input box", "Test-message-User-A-to-User-B");
    await (0, utilities_1.clickOnElement)(device, "Send message button");
    await device.setImplicitWaitTimeout(20000);
    await device.elementByAccessibilityId("Message sent status tick");
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=send_message.js.map