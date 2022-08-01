"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApp = void 0;
const appium_1 = require("appium");
const wd = __importStar(require("wd"));
const capabilities_1 = require("./capabilities");
const utilities_1 = require("./utilities");
const openApp = async () => {
    await Promise.all([
        (0, utilities_1.installAppToDeviceName)(capabilities_1.androidAppFullPath, capabilities_1.emulator1Udid),
        (0, utilities_1.installAppToDeviceName)(capabilities_1.androidAppFullPath, capabilities_1.emulator2Udid),
    ]);
    let server = await (0, appium_1.main)({
        port: 4723,
        host: "localhost",
        setTimeout: 30000,
    });
    const [device1, device2] = await Promise.all([
        await wd.promiseChainRemote("localhost", 4723),
        await wd.promiseChainRemote("localhost", 4723),
    ]);
    await Promise.all([device1.init(capabilities_1.capabilities1), device2.init(capabilities_1.capabilities2)]);
    return [server, device1, device2];
};
exports.openApp = openApp;
//# sourceMappingURL=open_app.js.map