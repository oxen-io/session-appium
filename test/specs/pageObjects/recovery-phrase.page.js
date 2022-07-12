class RecoveryPhrasePage {
  get recoveryPhrase(device) {
    return $("~Recovery Phrase");
  }
  get copyRecoveryPhrase() {
    return $("~Copy Recovery Phrase");
  }

  get cancelButton() {
    return $("~Cancel");
  }
}

module.exports = new RecoveryPhrasePage();
