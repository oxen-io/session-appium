import { openApp, closeApp } from "./utils/open_app";
import { newUser } from "./utils/create_account";

describe("User", () => {
  it("Create user", async () => {
    const { server, device } = await openApp();

    await newUser(device, "User A");

    await closeApp(server, device);
  });
});
