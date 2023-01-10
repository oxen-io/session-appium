import * as wd from 'wd';
import { getTextFromElement } from './element_text';
import { findElementByAccessibilityId } from './find_elements_stragegy';
export const saveText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await findElementByAccessibilityId(device, accessibilityId);
  console.warn('selector', selector);
  return await getTextFromElement(device, selector);
};
