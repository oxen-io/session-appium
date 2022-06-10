class MessageNotifications {
  // Choosing your message notification delivery page
  get fastModeOption() {
    return $("~Fast mode notifications option");
  }
  get slowModeOption() {
    return $("~Slow mode notifications option");
  }
  // Continue button exists on register-page.page.js
}

module.exports = new MessageNotifications();
