class LandingPage {
  // Buttons that tests interact with on landing page
  get createSessionIdBtn() {
    return $("~Create Session ID");
  }

  get continueYourSessionBtn() {
    return $("~Restore Your Session");
  }

  get linkDeviceBtn() {
    return $("~Link Device");
  }
}
module.exports = new LandingPage();
