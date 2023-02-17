import { doFunctionIfElementExists } from "./do_function_if_element_exists";
import { sleepFor } from "./sleep_for";
import { sendMessageTo } from "./send_message_to";
import { sendNewMessage } from "./send_new_message";
import { replyToMessage } from "./reply_message";
import { saveSessionIDIos, getSessionID } from "./get_session_id";
import { runOnlyOnIOS } from "./run_on_ios";
import { runOnlyOnAndroid } from "./run_on_android";
import {
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
} from "./has_element_been_deleted";
import { grabTextFromAccessibilityId } from "./save_text";
import { deleteText } from "./delete_text";
import { scrollDown } from "./scroll_down";
import { swipeLeft } from "./swipe_left";
import { clickOnXAndYCoordinates } from "./click_by_coordinates";
import { doesElementExist } from "./find_elements_stragegy";

export {
  doFunctionIfElementExists,
  sleepFor,
  doesElementExist,
  sendMessageTo,
  sendNewMessage,
  replyToMessage,
  saveSessionIDIos,
  getSessionID,
  runOnlyOnIOS,
  runOnlyOnAndroid,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  grabTextFromAccessibilityId,
  deleteText,
  scrollDown,
  swipeLeft,
  clickOnXAndYCoordinates,
};
