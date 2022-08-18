import { main as appiumMain } from "appium";
import {
  capabilities1,
  capabilities2,
  emulator1Udid,
  emulator2Udid,
  androidAppFullPath,
} from "./capabilities";
import { installAppToDeviceName } from "./utilities";

import * as wd from "wd";

export const openApp = async (): Promise<{
  server: any;
  device: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: 4723,
    host: "localhost",
    setTimeout: 30000,
  });
  await installAppToDeviceName(androidAppFullPath, emulator1Udid);

  const device = await wd.promiseChainRemote("localhost", 4723);

  await device.init(capabilities1);

  return { server, device };
};

export const openAppTwoDevices = async (): Promise<{
  server: any;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: 4723,
    host: "localhost",
    setTimeout: 30000,
  });
  await Promise.all([
    installAppToDeviceName(androidAppFullPath, emulator1Udid),
    installAppToDeviceName(androidAppFullPath, emulator2Udid),
  ]);

  const [device1, device2] = await Promise.all([
    await wd.promiseChainRemote("localhost", 4723),
    await wd.promiseChainRemote("localhost", 4723),
  ]);
  await Promise.all([device1.init(capabilities1), device2.init(capabilities2)]);
  return { server, device1, device2 };
};

export const closeApp = async (
  server: any,
  device1?: wd.PromiseWebdriver,
  device2?: wd.PromiseWebdriver
) => {
  await device1?.quit();
  await device2?.quit();

  console.info("waiting server close");

  await server.close();
  console.info("server closed");
};
