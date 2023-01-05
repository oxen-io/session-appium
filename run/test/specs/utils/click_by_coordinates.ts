import wd from "wd";
export const clickOnXAndYCoordinates = async (
  device: wd.PromiseWebdriver,
  xCoordinate: number,
  yCoordinate: number
) => {
  const actions = new wd.TouchAction(device);

  actions.tap({ x: xCoordinate, y: yCoordinate });
  actions.release();

  await actions.perform();
  console.log(`Tapped coordinates`);
};
