import wd from "wd";

export const deleteText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  await selector.clear();
  console.warn(`Text has been cleared` + selector);
  return;
};
