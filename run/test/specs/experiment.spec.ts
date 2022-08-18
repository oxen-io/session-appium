import { sendNewMessage } from "./utils/send_new_message";
import { closeApp, openAppTwoDevices } from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { getTextElement, longPress } from "./utils/utilities";
import * as wd from "wd";

describe("Experimental", () => {
  it("check test works", async () => {
    const { server, device1, device2 } = await openAppTwoDevices();

    const [userA, userB] = await Promise.all([
      newUser(device1, "User A"),
      newUser(device2, "User B"),
    ]);

    await sendNewMessage(device1, userB);
    const text = await getTextElement(device1, "howdy");
    const action = new wd.TouchAction(device1);
    action.longPress({ el: text });
    await action.perform();
    // await closeApp(server, device1);
  });
});
