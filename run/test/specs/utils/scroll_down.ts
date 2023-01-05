import * as wd from "wd";
export const scrollDown = async (device: wd.PromiseWebdriver) => {
  const action = new wd.TouchAction(device);
  action.press({ x: 760, y: 1500 });
  action.moveTo({ x: 760, y: 710 });
  action.release();
  await action.perform();
};
