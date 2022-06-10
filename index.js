const wdio = require("webdriverio");

const opts = {
  path: "/wd/hub",
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "10",
    deviceName: "Android Emulator",
    app: "/home/jubb/Downloads/ApiDemos-debug.apk",
    appPackage: "io.appium.android.apis",
    appActivity: ".view.TextFields",
    automationName: "UiAutomator2",
  },
};

async function main() {
  const client = await wdio.remote(opts);

  await client.deleteSession();
}

main();
