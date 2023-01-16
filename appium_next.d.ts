import { W3CCapabilities } from "appium/build/lib/appium";
import { ExternalDriver } from "@appium/types/build/lib/driver";

// typings comes from :
//    node_modules/@appium/types/build/lib/driver.d.ts
// BUT. they are defined as optional, so here we just copy and paste the one we need, and hardcode the fact that they are defined.
// We need to do this, because the iosDriver and the androidDriver do not export the typings (where they defined that those function exists)

export interface MightBeUndefinedDeviceType extends ExternalDriver<any> {}

export type AppiumNextDeviceType = {
  pushFile(remotePath: string, payloadBase64: string): promise<void>;

  findElement(
    strategy: "accessibility id" | "xpath",
    selector: string
  ): Promise<AppiumNextElementType>;
  findElements(
    strategy: "accessibility id" | "xpath",
    selector: string
  ): Promise<AppiumNextElementType[]>;
  setValue: (text: string, element: string) => Promise<void>;
  back: () => Promise<void>;
  click: (id: string) => Promise<void>;
  touchLongClick: (id: string) => Promise<void>;
  getElementRect: (
    id: string
  ) => Promise<
    undefined | { height: number; width: number; x: number; y: number }
  >;
  createSession: (
    caps: W3CCapabilities<any>
  ) => Promise<[string, Record<string, any>]>;
  deleteSession: (sessionId?: string) => Promise<void>; // not sure yet

  touchDown(x: number, y: number): Promise<void>;
  touchUp(x: number, y: number): Promise<void>;
  touchMove(x: number, y: number): Promise<void>;

  postDismissAlert(): Promise<void>;
};

export type AppiumNextElementType = {
  ELEMENT: string;
};
