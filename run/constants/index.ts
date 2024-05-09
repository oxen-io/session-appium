const ANDROID_XPATHS = {
  PRIVACY_TOGGLE: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[5]/android.widget.RelativeLayout/android.widget.TextView[2]`,
  FIRST_GIF: `(//XCUIElementTypeImage[@name="gif cell"])[1]`,
  VIDEO_TOGGLE: `//XCUIElementTypeStaticText[@name="Videos"]`,
  VOICE_TOGGLE: `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button[1]`,
};

export { ANDROID_XPATHS };

const DISAPPEARING_TIMES = {
  FIVE_SECONDS: "5 seconds",
  TEN_SECONDS: "10 seconds",
  THIRTY_SECONDS: "30 seconds",
  ONE_MINUTE: "1 minute",
  FIVE_MINUTES: "5 minutes",
  THIRTY_MINUTES: "30 minutes",
  ONE_HOUR: "1 hour",
  ONE_DAY: "1 day",
  ONE_WEEK: "1 week",
  OFF: "Off",
};

const DISAPPEARING_ACTION = {
  SEND: "sent",
  READ: "read",
};

// const DISAPPEARING_CONTROL_MESSAGE = {
//   YOU_LEGACY: `You set disappearing message time to 5 seconds`,
//   LEGACY_DISAPPEARING_MESSAGE: `set disappearing message time to 5 seconds`,
//   `${string} has set messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}.`,
//   : `${string} has set messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}`,
//   _3: `${string} has set messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}`,
//   _4: `${string} has set messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}.`,
//   _6: `${string} has set their messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}.`;
//   YOU: `You set your messages to disappear ${DISAPPEARING_TIMER} after they have been ${DISAPPEARING_ACTION}.`,
// };
