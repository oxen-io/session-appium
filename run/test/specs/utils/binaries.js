"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdbFullPath = exports.getAndroidBinariesRoot = void 0;
const getAndroidBinariesRoot = () => {
    if (process.env.APPIUM_ANDROID_BINARIES_ROOT) {
        return process.env.APPIUM_ANDROID_BINARIES_ROOT;
    }
    throw new Error("env variable `APPIUM_ANDROID_BINARIES_ROOT` needs to be set");
};
exports.getAndroidBinariesRoot = getAndroidBinariesRoot;
const getAdbFullPath = () => {
    if (!process.env.APPIUM_ADB_FULL_PATH) {
        throw new Error("env variable `APPIUM_ADB_FULL_PATH` needs to be set");
    }
    return process.env.APPIUM_ADB_FULL_PATH;
};
exports.getAdbFullPath = getAdbFullPath;
//# sourceMappingURL=binaries.js.map