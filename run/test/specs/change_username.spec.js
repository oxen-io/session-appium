"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_app_1 = require("./utils/open_app");
const create_account_1 = require("./utils/create_account");
const utilities_1 = require("./utils/utilities");
describe("Username", () => {
    it("Change username", async () => {
        const { server, device: device1 } = await (0, open_app_1.openApp)();
        const userA = await (0, create_account_1.newUser)(device1, "User A");
        await (0, utilities_1.clickOnElement)(device1, "Profile picture");
        await (0, utilities_1.clickOnElement)(device1, "Username");
        console.warn("Element clicked?");
        const newUsername = await (0, utilities_1.inputText)(device1, "Username input", "New username");
        console.warn(newUsername);
        await (0, utilities_1.clickOnElement)(device1, "Apply");
        await (0, open_app_1.closeApp)(server, device1);
    });
});
//# sourceMappingURL=change_username.spec.js.map