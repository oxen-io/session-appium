"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.androidAppFullPath = exports.emulator2Udid = exports.emulator1Udid = exports.capabilities2 = exports.capabilities1 = exports.sharedCapabilities = void 0;
const binaries_1 = require("./binaries");
const androidAppFullPath = `${(0, binaries_1.getAndroidBinariesRoot)()}/session-1.13.1-x86.apk`;
exports.androidAppFullPath = androidAppFullPath;
let sharedCapabilities = {
    platformName: "Android",
    platformVersion: "11",
    app: androidAppFullPath,
    appPackage: "network.loki.messenger",
    appActivity: "network.loki.messenger.RoutingActivity",
    automationName: "UiAutomator2",
    browserName: "",
    newCommandTimeout: 300000,
};
exports.sharedCapabilities = sharedCapabilities;
let emulator1Udid = "emulator-5554";
exports.emulator1Udid = emulator1Udid;
let emulator2Udid = "emulator-5556";
exports.emulator2Udid = emulator2Udid;
const capabilities1 = {
    ...sharedCapabilities,
    udid: emulator1Udid,
};
exports.capabilities1 = capabilities1;
const capabilities2 = {
    ...sharedCapabilities,
    udid: emulator2Udid,
};
exports.capabilities2 = capabilities2;
//# sourceMappingURL=capabilities.js.map