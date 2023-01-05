import { SupportedPlatformsType } from "./open_app";

export const runOnlyOnIOS = async (
  platform: SupportedPlatformsType,
  toRun: () => Promise<any>
) => {
  if (platform === "ios") {
    const value = await toRun();

    return value;
  }
};
