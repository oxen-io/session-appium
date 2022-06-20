class settingsPage {
  // Editable display name
  get userNameInput() {
    return $("~Username");
  }
  // Dialog box that contains session ID
  // exists on register-page.page.js

  get recoveryPhraseMenuOption() {
    return $("~Show recovery phrase");
  }
}
module.exports = new settingsPage();
