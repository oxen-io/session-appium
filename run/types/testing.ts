export type User = {
  userName: string;
  sessionID: string;
  recoveryPhrase: string;
};

export type Group = {
  userName: string;
  userOne: User;
  userTwo: User;
  userThree: User;
};

export type Strategy = "accessibility id" | "xpath" | "id" | "class name";

// export type StrategyExtraction =
//   | [Extract<Strategy, "xpath" | "id" | "class name">, string]
//   | [Extract<Strategy, "accessibility id">, AccessibilityId];

export type StrategyExtractionObj =
  | {
      strategy: Extract<Strategy, "id" | "class name">;
      selector: string;
    }
  | {
      strategy: Extract<Strategy, "accessibility id">;
      selector: AccessibilityId;
    }
  | {
      strategy: Extract<Strategy, "xpath">;
      selector: XPath;
    };

export type XPath =
  | `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[5]/android.widget.RelativeLayout/android.widget.TextView[2]`
  | `(//XCUIElementTypeImage[@name="gif cell"])[1]`
  | `//XCUIElementTypeStaticText[@name="Videos"]`
  | `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button[1]`
  | `//XCUIElementTypeSwitch[@name="Read Receipts, Send read receipts in one-to-one chats."]`
  | `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]`;

export type AccessibilityId =
  | "Create session ID"
  | "Session ID"
  | "Session ID generated"
  | "Session id input box"
  | "Enter display name"
  | "Continue"
  | "Slow mode notifications option"
  | "Continue with settings"
  | "Don’t Allow"
  | "Recovery Phrase"
  | "Navigate up"
  | "User settings"
  | "Notifications"
  | "Message requests banner"
  | "Message request"
  | "Accept message request"
  | "Your message request has been accepted."
  | "Block message request"
  | "Clear all"
  | "Clear"
  | "No pending message requests"
  | "New conversation button"
  | "New direct message"
  | "Conversations"
  | "Create group"
  | "Group name input"
  | "Contact"
  | "Contact mentions"
  | "Empty state label"
  | "Link a device"
  | "Link Device"
  | "Enter your recovery phrase"
  | "Message Notifications"
  | "Settings"
  | "Call"
  | "Answer call"
  | "Allow voice and video calls"
  | "End call button"
  | "Close button"
  | "Enable"
  | "More options"
  | "Disappearing Messages"
  | "Disappearing messages time picker"
  | "Time selector"
  | "Message input box"
  | "Message Body"
  | "Group name"
  | "Accept name change"
  | "Edit group"
  | "Group name text field"
  | "OK"
  | "Cancel"
  | "Apply changes"
  | "Apply"
  | "Conversation list item"
  | "Add members"
  | "Done"
  | "Configuration message"
  | "Mentions list"
  | "Send message button"
  | "Mentions list"
  | "Message sent status: Sent"
  | "Message sent status: Read"
  | "Message sent status pending"
  | "Leave group"
  | "Leave"
  | "Username"
  | "Delete message request"
  | "Confirm delete"
  | "Delete"
  | "Block message request"
  | "Block"
  | "Unblock"
  | "Confirm block"
  | "Blocked contacts"
  | "Blocked Contacts"
  | "Recovery phrase reminder"
  | "Back"
  | "Delete message"
  | "Delete just for me"
  | "Delete for me"
  | "Delete for everyone"
  | "Deleted message"
  | "Blocked banner"
  | "Profile picture"
  | "Photo library"
  | "Photos"
  | "Videos"
  | "Document"
  | "All Photos"
  | "Allow Access to All Photos"
  | "Photo, May 01, 1999, 7:00 AM"
  | "profile_picture.jpg, 27.75 kB, May 1, 1999"
  | "Photo, May 01, 1998, 7:00 AM"
  | "1967-05-05 21:00:00 +0000"
  | "1988-09-08 21:00:00 +0000"
  | "Attachments button"
  | "Documents folder"
  | "Untrusted attachment message"
  | "Download media"
  | "Download"
  | "Media message"
  | "Reply to message"
  | "New voice message"
  | "Voice message"
  | "GIF button"
  | "Text input box"
  | "Send button"
  | "Recents"
  | "Details"
  | "Edit user nickname"
  | "Nickname"
  | "OK_BUTTON"
  | "Next"
  | "Message user"
  | "Decline message request"
  | "Image picker"
  | "Upload"
  | "Save button"
  | "Yes"
  | "No";
