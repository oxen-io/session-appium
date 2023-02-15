import { doFunctionIfElementExists } from "./do_function_if_element_exists";
import {
  clickOnElement,
  clickOnElementXPath,
  tapOnElement,
  longPress,
  longPressMessage,
  longPressConversation,
  selectByText,
  pressAndHold,
} from "./element_selection";
import {
  waitForElementToBePresent,
  waitForTextElementToBePresent,
  sleepFor,
} from "./wait_for";
import {
  findMatchingTextAndAccessibilityId,
  findMatchingTextInElementArray,
  findMessageWithBody,
  findLastElementInArray,
  findConfigurationMessage,
} from "./element_locators";
import { sendMessageTo } from "./send_message_to";
import { sendNewMessage } from "./send_new_message";
import { sendMessage } from "./send_message";
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
import { inputText } from "./input_text";
import { scrollDown } from "./scroll_down";
import { swipeLeft } from "./swipe_left";
import { clickOnXAndYCoordinates } from "./click_by_coordinates";
import {
  doesElementExist,
  findElementByXpath,
  findElementByAccessibilityId,
  findElementsByAccessibilityId,
} from "./find_elements_stragegy";

export {
  doFunctionIfElementExists,
  clickOnElement,
  clickOnElementXPath,
  tapOnElement,
  longPress,
  longPressMessage,
  longPressConversation,
  selectByText,
  waitForElementToBePresent,
  waitForTextElementToBePresent,
  sleepFor,
  findMatchingTextInElementArray,
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  findLastElementInArray,
  findConfigurationMessage,
  doesElementExist,
  findElementByXpath,
  sendMessageTo,
  sendNewMessage,
  sendMessage,
  replyToMessage,
  saveSessionIDIos,
  getSessionID,
  runOnlyOnIOS,
  runOnlyOnAndroid,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  grabTextFromAccessibilityId,
  deleteText,
  inputText,
  scrollDown,
  swipeLeft,
  clickOnXAndYCoordinates,
  findElementByAccessibilityId,
  findElementsByAccessibilityId,
  pressAndHold,
};
