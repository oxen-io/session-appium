import { sendNewMessage } from "./utils/send_new_message";
import { closeApp, openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";

describe("Experimental", () => {
  it("check test works", async () => {
    const { server, device1, device2 } = await openAppTwoDevices();

    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);

    await sendNewMessage(device1, userB);
    await closeApp(server, device1);
  });
});
