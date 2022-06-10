class HomePage {
  get profilePicture() {
    return $("~Profile picture");
  }

  get searchIcon() {
    return $("~Search icon");
  }
}

module.exports = new HomePage();
