import { doFunctionIfElementExists } from "./do_function_if_element_exists";
import { sleepFor } from "./sleep_for";
import { saveSessionIDIos, getSessionID } from "./get_session_id";
import { runOnlyOnIOS } from "./run_on_ios";
import { runOnlyOnAndroid } from "./run_on_android";
import {
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
} from "./has_element_been_deleted";

import { clickOnXAndYCoordinates } from "./click_by_coordinates";
import { doesElementExist } from "./find_elements_stragegy";

export {
  doFunctionIfElementExists,
  sleepFor,
  doesElementExist,
  saveSessionIDIos,
  getSessionID,
  runOnlyOnIOS,
  runOnlyOnAndroid,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  clickOnXAndYCoordinates,
};
