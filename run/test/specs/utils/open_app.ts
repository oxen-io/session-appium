import { main as appiumMain } from "appium";
import * as wd from "wd";
import {
  capabilities1,
  capabilities2,
  emulator1Udid,
  emulator2Udid,
  androidAppFullPath,
} from "./capabilities";
import { installAppToDeviceName } from "./utilities";

export const openApp = async () => {
  await Promise.all([
    installAppToDeviceName(androidAppFullPath, emulator1Udid),
    installAppToDeviceName(androidAppFullPath, emulator2Udid),
  ]);
  let server = await appiumMain({
    port: 4723,
    host: "localhost",
    setTimeout: 30000,
  });
  const [device1, device2] = await Promise.all([
    await wd.promiseChainRemote("localhost", 4723),
    await wd.promiseChainRemote("localhost", 4723),
  ]);
  await Promise.all([device1.init(capabilities1), device2.init(capabilities2)]);
  return [server, device1, device2];
};
