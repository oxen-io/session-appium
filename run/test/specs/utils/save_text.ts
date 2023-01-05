import * as wd from "wd";
export const saveText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.text();
};
