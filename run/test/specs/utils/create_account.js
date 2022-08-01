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
exports.newUser = void 0;
const utils = __importStar(require("./utilities"));
const newUser = async (device, userName) => {
    await utils.clickOnElement(device, "Create Session ID");
    await device.setImplicitWaitTimeout(5000);
    const sessionID = await utils.saveText(device, "Session ID");
    console.log(sessionID);
    await utils.clickOnElement(device, "Continue");
    await utils.inputText(device, "Enter display name", userName);
    await utils.clickOnElement(device, "Continue");
    await utils.clickOnElement(device, "Continue with settings");
    await utils.clickOnElement(device, "Continue");
    await utils.longPress(device, "Recovery Phrase");
    const recoveryPhrase = await utils.saveText(device, "Recovery Phrase");
    console.log("Recovery Phrase is", recoveryPhrase);
    await utils.clickOnElement(device, "Navigate up");
    return { userName, sessionID, recoveryPhrase };
};
exports.newUser = newUser;
//# sourceMappingURL=create_account.js.map