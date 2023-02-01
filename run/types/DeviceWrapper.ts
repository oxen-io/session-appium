import { W3CCapabilities } from "appium/build/lib/appium";
import { AppiumNextElementType } from "../../appium_next";
import { isDeviceAndroid, isDeviceIOS } from "../test/specs/utils/utilities";

export type Coordinates = {
  x: number;
  y: number;
};

export type ActionSequence = {
  actions: string;
};

type SharedDeviceInterface = {
  back: () => Promise<void>;
  click: (elementId: string) => Promise<void>;
  clear: (elementId: string) => Promise<void>;
  getText: (elementId: string) => Promise<string>;
  setValueImmediate: (text: string, elementId: string) => Promise<void>;
  getElementRect: (
    elementId: string
  ) => Promise<
    undefined | { height: number; width: number; x: number; y: number }
  >;
  getCssProperty: (name: string, elementId: string) => Promise<string>;
  // pushFile(path: string, data: string): Promise<void>;
  getElementScreenshot: (elementId: string) => Promise<string>;
  // gestures
  scroll: (
    start: Coordinates,
    end: Coordinates,
    duration: number
  ) => Promise<void>;
  pressCoordinates: (
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ) => Promise<void>;
  performActions: (actions: any) => Promise<any>;
  performTouch: (actions: any) => Promise<any>;
  // touchAction: (actions: any) => Promise<any>;
  tap: (
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ) => Promise<any>;
  touchUp(CoOrdinates: Coordinates): Promise<void>;
  touchDown(CoOrdinates: Coordinates): Promise<void>;

  // finding elements

  findElement(
    strategy: "accessibility id" | "xpath" | "ID",
    selector: string
  ): Promise<AppiumNextElementType>;
  findElements(
    strategy: "accessibility id" | "xpath",
    selector: string
  ): Promise<Array<AppiumNextElementType>>;

  // Session management
  createSession: (
    caps: W3CCapabilities<any>
  ) => Promise<[string, Record<string, any>]>;
  deleteSession: (sessionId?: string) => Promise<void>;
};

type IOSDeviceInterface = {
  mobileTouchAndHold: (opts: {
    duration: number /* In seconds */;
    elementId: string;
  }) => Promise<void>;
} & SharedDeviceInterface;

type AndroidDeviceInterface = {
  touchLongClick: (id: string) => Promise<void>;
} & SharedDeviceInterface;

export class DeviceWrapper implements SharedDeviceInterface {
  private readonly device: DeviceWrapper;

  constructor(device: DeviceWrapper) {
    this.device = device;
  }

  /**  === all the shared actions ===  */
  public async click(element: string) {
    // this one works for both devices so just call it without casting it
    return this.toShared().click(element);
  }

  public async back(): Promise<void> {
    return this.toShared().back();
  }

  public async clear(elementId: string): Promise<void> {
    return this.toShared().clear(elementId);
  }

  public async getText(elementId: string): Promise<string> {
    return this.toShared().getText(elementId);
  }

  public async setValueImmediate(
    text: string,
    elementId: string
  ): Promise<void> {
    return this.toShared().setValueImmediate(text, elementId);
  }
  public async getElementRect(
    elementId: string
  ): Promise<
    undefined | { height: number; width: number; x: number; y: number }
  > {
    return this.toShared().getElementRect(elementId);
  }

  public async getCssProperty(
    name: string,
    elementId: string
  ): Promise<string> {
    return this.toShared().getCssProperty(name, elementId);
  }

  public async scroll(
    start: Coordinates,
    end: Coordinates,
    duration: number
  ): Promise<void> {
    const actions = [
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: start.x, y: start.y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 500 },
          {
            type: "pointerMove",
            duration,
            origin: "pointer",
            x: end.x - start.x,
            y: end.y - start.y,
          },
          { type: "pointerUp", button: 0 },
        ],
      },
    ];

    await this.toShared().performActions(actions);
  }

  public async pressCoordinates(
    xCoOrdinates: number,
    yCoOrdinates: number
  ): Promise<void> {
    const actions = [
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: xCoOrdinates,
            y: yCoOrdinates,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },

          { type: "pointerUp", button: 0 },
        ],
      },
    ];

    await this.toShared().performActions(actions);
  }

  public async tap(
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ): Promise<void> {
    const actions = {
      type: "pointer",
      x: xCoOrdinates,
      y: yCoOrdinates,
      duration,
    };
    return this.toShared().performTouch(actions);
  }

  public async performActions(actions: ActionSequence): Promise<Array<void>> {
    return this.toShared().performActions(actions);
  }

  public async performTouch(actions: any): Promise<any> {
    return this.toShared().performTouch(actions);
  }

  // public async pushFile(path: string, data: string): Promise<void> {
  //   return this.toShared().pushFile(path, data);
  // }

  public async getElementScreenshot(elementId: string): Promise<string> {
    return this.toShared().getElementScreenshot(elementId);
  }

  public async touchUp(CoOrdinates: Coordinates): Promise<void> {
    return this.toShared().touchUp(CoOrdinates);
  }
  public async touchDown(CoOrdinates: Coordinates): Promise<void> {
    return this.toShared().touchDown(CoOrdinates);
  }

  public async findElement(
    strategy: "accessibility id" | "xpath" | "ID",
    selector: string
  ): Promise<AppiumNextElementType> {
    return this.toShared().findElement(strategy, selector);
  }

  public async findElements(
    strategy: "accessibility id" | "xpath",
    selector: string
  ): Promise<Array<AppiumNextElementType>> {
    return this.toShared().findElements(strategy, selector);
  }

  // Session management
  public async createSession(
    caps: W3CCapabilities<any>
  ): Promise<[string, Record<string, any>]> {
    return this.toShared().createSession(caps);
  }

  public async deleteSession(sessionId?: string): Promise<void> {
    return this.toShared().deleteSession(sessionId);
  }

  /* === all the device-specifc function ===  */

  public async longClick(element: AppiumNextElementType, durationMs: number) {
    if (this.isIOS()) {
      // iOS takes a number in seconds
      return this.toIOS().mobileTouchAndHold({
        elementId: element.ELEMENT,
        duration: Math.floor(durationMs / 1000),
      });
    }
    return this.toAndroid().touchLongClick(element.ELEMENT);
  }

  /* === all the utilities function ===  */
  private isIOS(): boolean {
    return isDeviceIOS(this.device);
  }

  private isAndroid(): boolean {
    return isDeviceAndroid(this.device);
  }

  private toIOS(): IOSDeviceInterface {
    if (!this.isIOS()) {
      throw new Error("Not an ios device");
    }
    return this.device as unknown as IOSDeviceInterface;
  }

  private toAndroid(): AndroidDeviceInterface {
    if (!this.isAndroid()) {
      throw new Error("Not an android device");
    }
    return this.device as unknown as AndroidDeviceInterface;
  }

  private toShared(): SharedDeviceInterface {
    return this.device as unknown as SharedDeviceInterface;
  }
}
