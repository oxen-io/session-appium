import wd from 'wd';
import { findElementByAccessibilityId } from './find_elements_stragegy';

export const deleteText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await findElementByAccessibilityId(device, accessibilityId);
  await selector.clear();
  console.warn(`Text has been cleared` + selector);
  return;
};
