"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_app_1 = require("./utils/open_app");
const create_account_1 = require("./utils/create_account");
describe("User", () => {
    it("Create user", async () => {
        const [server, device] = await (0, open_app_1.openApp)();
        await (0, create_account_1.newUser)(device, "User A");
        await (0, open_app_1.closeApp)(server, device);
    }).timeout(300000);
});
//# sourceMappingURL=create_user.spec.js.map