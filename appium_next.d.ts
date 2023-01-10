export type AppiumNextDeviceType = {
  findElOrEls: (
    strategy: "accessibility id",
    token: string
  ) => Promise<AppiumNextElementType>;
};

export type AppiumNextElementType = {
  ELEMENT: string;
};
