class RegisterPage {
  // Register session ID page
  get sessionId() {
    return $("~Session ID");
  }
  get continueBtn() {
    return $("~Continue");
  }

  get copyBtn() {
    return $("~Copy Session ID");
  }
}
module.exports = new RegisterPage();
