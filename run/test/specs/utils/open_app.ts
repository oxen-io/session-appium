import { main as appiumMain } from "appium";
import {
  capabilities1,
  capabilities2,
  capabilities3,
  emulator1Udid,
  emulator2Udid,
  emulator3Udid,
  androidAppFullPath,
} from "./capabilities";
import { installAppToDeviceName } from "./utilities";

import * as wd from "wd";

const APPIUM_PORT = 4728;

export const openApp = async (): Promise<{
  server: any;
  device: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await installAppToDeviceName(androidAppFullPath, emulator1Udid);

  const device = await wd.promiseChainRemote("localhost", APPIUM_PORT);

  await device.init(capabilities1);

  return { server, device };
};

export const openAppTwoDevices = async (): Promise<{
  server: any;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await Promise.all([
    installAppToDeviceName(androidAppFullPath, emulator1Udid),
    installAppToDeviceName(androidAppFullPath, emulator2Udid),
  ]);

  const [device1, device2] = await Promise.all([
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
  ]);
  await Promise.all([device1.init(capabilities1), device2.init(capabilities2)]);
  return { server, device1, device2 };
};

export const openAppThreeDevices = async (): Promise<{
  server: any;
  device1: wd.PromiseWebdriver;
  device2: wd.PromiseWebdriver;
  device3: wd.PromiseWebdriver;
}> => {
  const server = await appiumMain({
    port: APPIUM_PORT,
    host: "localhost",
    setTimeout: 30000,
  });
  await Promise.all([
    installAppToDeviceName(androidAppFullPath, emulator1Udid),
    installAppToDeviceName(androidAppFullPath, emulator2Udid),
    installAppToDeviceName(androidAppFullPath, emulator3Udid),
  ]);
  const [device1, device2, device3] = await Promise.all([
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
    await wd.promiseChainRemote("localhost", APPIUM_PORT),
  ]);
  await Promise.all([
    device1.init(capabilities1),
    device2.init(capabilities2),
    device3.init(capabilities3),
  ]);
  return { server, device1, device2, device3 };
};

export const closeApp = async (
  server: any,
  device1?: wd.PromiseWebdriver,
  device2?: wd.PromiseWebdriver,
  device3?: wd.PromiseWebdriver
) => {
  await device1?.quit();
  await device2?.quit();
  await device3?.quit();

  console.info("waiting server close");

  await server.close();
  console.info("server closed");
};
