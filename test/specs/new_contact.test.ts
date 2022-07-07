import { newUser } from "./utils/create_account";
let Appium = require("appium");
let wd = require("wd");
let capabilities = require("../../wdio-ios.conf");

describe("Contact", () => {
  it("Create new contact", async () => {
    let server = await Appium.main({
      port: 4723,
      host: "localhost",
      setTimeout: 30000,
    });
    let driver1 = await wd.promiseChainRemote("localhost", 4723);

    let [sessionId1] = await driver1.init(capabilities.deviceOne);

    sessionId1 = await newUser("user user user");
    // const userB = await newUser("User B");

    await server.close();
  }).timeout(300000);
});
