class Navigation {
  //  Elements used in the toolbar navigation (that comes from device)
  get goBack() {
    return $("~Navigate up");
  }
}
module.exports = new Navigation();
