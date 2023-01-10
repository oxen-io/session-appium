export function getTextFromElement(device: any, element: any): Promise<string> {
  return device.getText(element.ELEMENT);
}
