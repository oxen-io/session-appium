wd = require("wd");

exports.clickOnElement = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  await selector.click();
  return;
};

exports.saveText = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.text();
};

exports.inputText = async (device, accessibilityId, text) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.type(text);
};

exports.longPress = async (device, accessibilityId) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  let action = new wd.TouchAction(device);
  action.longPress({ el: selector });
  await action.perform();
};
