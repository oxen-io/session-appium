export const clickOnElement = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  await selector.click();
};

export const saveText = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.text();
};

export const inputText = async (device, accessibilityId, text) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.type(text);
};

export const longPress = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  let action = new wd.TouchAction(device);
  action.longPress({ el: selector });
  await action.perform();
};
