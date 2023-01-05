import wd from "wd";
export const inputText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  const element = await device.elementByAccessibilityId(accessibilityId);
  if (!element) {
    throw new Error(
      `inputText: Did not find accessibilityId: ${accessibilityId} `
    );
  }
  // not sure what is the type of element here, but there is a type available for it...
  return (element as any)?.type(text);
};
