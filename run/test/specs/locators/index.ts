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

export class ApplyChanges extends LocatorsInterface {
  public build() {
    if (this.isIos()) {
      return {
        strategy: "accessibility id",
        selector: "Apply changes",
      } as const;
    }
    return {
      strategy: "id",
      selector: "network.loki.messenger:id/action_apply",
    } as const;
  }
}

export class EditGroup extends LocatorsInterface {
  public build() {
    if (this.isIos()) {
      return { strategy: "accessibility id", selector: "Edit group" } as const;
    }
    return {
      strategy: "id",
      selector: "network.loki.messenger:id/title",
      text: "Edit group",
    } as const;
  }
}

export class PrivacyButton extends LocatorsInterface {
  public build() {
    if (this.isIos()) {
      return { strategy: "id", selector: "Privacy" } as const;
    }
    return {
      strategy: "id",
      selector: "network.loki.messenger:id/privacyButton",
    } as const;
  }
}

export class ReadReceiptsButton extends LocatorsInterface {
  public build() {
    if (this.isIos()) {
      return {
        strategy: "xpath",
        selector: `//XCUIElementTypeSwitch[@name="Read Receipts, Send read receipts in one-to-one chats."]`,
      } as const;
    }
    return {
      strategy: "id",
      selector: "android:id/summary",
      text: "Send read receipts in one-to-one chats.",
    } as const;
  }
}
