import { SupportedPlatformsType } from "./open_app";

export const runOnlyOnAndroid = async (
  platform: SupportedPlatformsType,
  toRun: () => Promise<any>
) => {
  if (platform === "android") {
    const value = await toRun();

    return value;
  }
};
