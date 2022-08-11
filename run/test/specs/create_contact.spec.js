"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utils/utilities");
const create_account_1 = require("./utils/create_account");
const open_app_1 = require("./utils/open_app");
const send_new_message_1 = require("./utils/send_new_message");
describe("Create contact", () => {
    it("Create new contact", async () => {
        const { server, device1, device2 } = await (0, open_app_1.openAppTwoDevices)();
        const [userA, userB] = await Promise.all([
            (0, create_account_1.newUser)(device1, "User A"),
            (0, create_account_1.newUser)(device2, "User B"),
        ]);
        await (0, send_new_message_1.sendNewMessage)(device1, userB);
        await (0, utilities_1.clickOnElement)(device2, "Message requests banner");
        await (0, utilities_1.clickOnElement)(device2, "Message request");
        await (0, utilities_1.inputText)(device2, "Message input box", "Test-message-User-B-to-User-A");
        await (0, utilities_1.clickOnElement)(device2, "Send message button");
        await (0, open_app_1.closeApp)(server, device1, device2);
    });
});
//# sourceMappingURL=create_contact.spec.js.map