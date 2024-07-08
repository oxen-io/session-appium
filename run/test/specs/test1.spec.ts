// import { iosIt } from "../../types/sessionIt";
// import { sleepFor, runOnlyOnAndroid, runOnlyOnIOS } from "./utils";
// import { linkedDevice } from "./utils/link_device";
// import {
//   SupportedPlatformsType,
//   closeApp,
//   openAppMultipleDevices,
// } from "./utils/open_app";

// async function changeUsername(platform: SupportedPlatformsType) {
//   const [device1, device2] = await openAppMultipleDevices(platform, 2);
//   const userA = await linkedDevice(device1, device2, "Alice", platform);
//   console.warn("process.env.MOCHA_WORKER_ID:", process.env.MOCHA_WORKER_ID);
//   console.log("Devices for changeUsername:", device1.udid, device2.udid);
//   const newUsername = "Alice in chains";
//   // click on settings/profile avatar
//   await device1.clickOnByAccessibilityID("User settings");
//   // select username
//   await device1.clickOnByAccessibilityID("Username");
//   // type in new username
//   await sleepFor(100);
//   await device1.deleteText("Username");
//   await device1.inputText("accessibility id", "Username", newUsername);
//   const changedUsername = await device1.grabTextFromAccessibilityId("Username");
//   console.log("Changed username", changedUsername);
//   if (changedUsername === newUsername) {
//     console.log("Username change successful");
//   }
//   if (changedUsername === userA.userName) {
//     console.log("Username is still ", userA.userName);
//   }
//   if (changedUsername === "Username") {
//     console.log(
//       "Username is not picking up text but using access id text",
//       changedUsername
//     );
//   } else {
//     console.log("Username is not found`");
//   }
//   // select tick
//   await runOnlyOnAndroid(platform, () =>
//     device1.clickOnByAccessibilityID("Apply")
//   );
//   await runOnlyOnIOS(platform, () => device1.clickOnByAccessibilityID("Done"));
//   // await device1.navigateBack(platform);
//   await runOnlyOnIOS(platform, () =>
//     device1.clickOnElementAll({
//       strategy: "accessibility id",
//       selector: "Close button",
//     })
//   );
//   await Promise.all([
//     device1.clickOnElementAll({
//       strategy: "accessibility id",
//       selector: "User settings",
//     }),
//     device2.clickOnElementAll({
//       strategy: "accessibility id",
//       selector: "User settings",
//     }),
//   ]);

//   await Promise.all([
//     device1.waitForTextElementToBePresent({
//       strategy: "accessibility id",
//       selector: "Username",
//       text: newUsername,
//     }),
//     device2.waitForTextElementToBePresent({
//       strategy: "accessibility id",
//       selector: "Username",
//       text: newUsername,
//     }),
//   ]);
//   await closeApp(device1, device2);
// }
// iosIt("Test Group 1 - Change username", changeUsername);
