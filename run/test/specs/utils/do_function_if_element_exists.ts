import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const doFunctionIfElementExists = async (
  device: DeviceWrapper,
  strategy: "xpath" | "accessibility id",
  selector: string,
  toRun: () => Promise<any>
) => {
  try {
    await device.findElement(strategy, selector);

    // Check if element exists
    if (selector) {
      // IF yes do the thing
      console.log(`'Found ${strategy}: ${selector} so doing the thing`);
      await toRun();
    }
  } catch (e) {
    console.log(`No ${selector} so moving on`);
  }
};
