"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_new_message_1 = require("./utils/send_new_message");
const open_app_1 = require("./utils/open_app");
const create_account_1 = require("./utils/create_account");
describe("Experimental", () => {
    it("check test works", async () => {
        const { server, device1, device2 } = await (0, open_app_1.openAppTwoDevices)();
        const [userA, userB] = await Promise.all([
            (0, create_account_1.newUser)(device1, "User A"),
            (0, create_account_1.newUser)(device2, "User B"),
        ]);
        await (0, send_new_message_1.sendNewMessage)(device1, userB);
        await (0, open_app_1.closeApp)(server, device1);
    });
});
//# sourceMappingURL=experiment.spec.js.map