import wd from "wd";
export const doFunctionIfElementExists = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  toRun: () => Promise<any>
) => {
  try {
    const selector = await device.elementByAccessibilityId(accessibilityId);
    // Check if element exists
    if (selector) {
      // IF yes do the thing
      console.log("Found selector so doing the thing");
      await toRun();
    }
  } catch (e) {
    console.log(`No ${accessibilityId} so moving on`);
  }
};
