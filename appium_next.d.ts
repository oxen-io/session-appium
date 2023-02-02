import { W3CCapabilities } from "appium/build/lib/appium";
import { ExternalDriver } from "@appium/types/buildgit /lib/driver";
import { functions } from "lodash";

// typings comes from :
//    node_modules/@appium/types/build/lib/driver.d.ts
// BUT. they are defined as optional, so here we just copy and paste the one we need, and hardcode the fact that they are defined.
// We need to do this, because the iosDriver and the androidDriver do not export the typings (where they defined that those function exists)

export interface MightBeUndefinedDeviceType extends ExternalDriver<any> {}

export type AppiumNextDeviceType = {
  pushFile(remotePath: string, payloadBase64: string): promise<void>;

  // not sure at all
  touchMove(x: number, y: number): Promise<void>;
};

export type AppiumNextElementType = {
  ELEMENT: string;
};
