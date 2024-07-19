import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { StrategyExtractionObj } from "../../../types/testing";
import { SupportedPlatformsType } from "../utils/open_app";

export abstract class LocatorsInterface {
  protected readonly platform: SupportedPlatformsType;

  abstract build(): StrategyExtractionObj;

  constructor(device: DeviceWrapper) {
    if (device.isAndroid()) {
      this.platform = "android";
    } else if (device.isIOS()) {
      this.platform = "ios";
    } else {
      console.warn("unsupported device type:", device);
      throw new Error("unsupported device type");
    }
  }

  protected isIos() {
    return this.platform === "ios";
  }

  protected isAndroid() {
    return this.platform === "android";
  }
}
// When applying a nickname or username change
export class TickButton extends LocatorsInterface {
  public build() {
    if (this.isIos()) {
      return { strategy: "accessibility id", selector: "Done" } as const;
    }
    return { strategy: "accessibility id", selector: "Apply" } as const;
  }
}
