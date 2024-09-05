import { DMTimeOption, XPath } from '../types/testing';

export const ANDROID_XPATHS: { [key: string]: XPath } = {
  PRIVACY_TOGGLE: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[5]/android.widget.RelativeLayout/android.widget.TextView[2]`,
  FIRST_GIF: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.ImageView`,
  VOICE_TOGGLE: `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button[1]`,
  BROWSE_BUTTON: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.TabHost/android.widget.LinearLayout/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.RelativeLayout/android.widget.GridView/android.widget.LinearLayout/android.widget.LinearLayout[2]`,
};

export const IOS_XPATHS: { [key: string]: XPath } = {
  VIDEO_TOGGLE: `//XCUIElementTypeStaticText[@name="Videos"]`,
  FIRST_GIF: `(//XCUIElementTypeImage[@name="gif cell"])[1]`,
};

export const DISAPPEARING_TIMES: { [key: string]: DMTimeOption } = {
  FIVE_SECONDS: '5 seconds',
  TEN_SECONDS: '10 seconds',
  THIRTY_SECONDS: '30 seconds',
  ONE_MINUTE: '1 minute',
  FIVE_MINUTES: '5 minutes',
  THIRTY_MINUTES: '30 minutes',
  ONE_HOUR: '1 hour',
  TWELVE_HOURS: '12 hours',
  ONE_DAY: '1 day',
  ONE_WEEK: '1 week',
  OFF: 'Off',
};
