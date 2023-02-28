import { W3CCapabilities } from "appium/build/lib/appium";
import { isArray, isEmpty } from "lodash";
import { AppiumNextElementType } from "../../appium_next";
import { sleepFor } from "../test/specs/utils";
import { SupportedPlatformsType } from "../test/specs/utils/open_app";
import { isDeviceAndroid, isDeviceIOS } from "../test/specs/utils/utilities";
import { Group, User } from "./testing";

export type Coordinates = {
  x: number;
  y: number;
};

export type ActionSequence = {
  actions: string;
};

type SharedDeviceInterface = {
  back: () => Promise<void>;
  click: (elementId: string) => Promise<void>;
  clear: (elementId: string) => Promise<void>;
  getText: (elementId: string) => Promise<string>;
  setValueImmediate: (text: string, elementId: string) => Promise<void>;
  getElementRect: (
    elementId: string
  ) => Promise<
    undefined | { height: number; width: number; x: number; y: number }
  >;
  getCssProperty: (name: string, elementId: string) => Promise<string>;
  pushFile(path: string, data: string): Promise<void>;
  getElementScreenshot: (elementId: string) => Promise<string>;
  // gestures
  scroll: (
    start: Coordinates,
    end: Coordinates,
    duration: number
  ) => Promise<void>;
  pressCoordinates: (
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ) => Promise<void>;
  performActions: (actions: any) => Promise<any>;
  performTouch: (actions: any) => Promise<any>;
  // touchAction: (actions: any) => Promise<any>;
  tap: (
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ) => Promise<any>;
  touchUp(CoOrdinates: Coordinates): Promise<void>;
  touchDown(CoOrdinates: Coordinates): Promise<void>;

  // finding elements

  findElement(
    strategy: "accessibility id" | "xpath" | "ID",
    selector: string
  ): Promise<AppiumNextElementType>;
  findElements(
    strategy: "accessibility id" | "xpath" | "class name",
    selector: string
  ): Promise<Array<AppiumNextElementType>>;

  // Session management
  createSession: (
    caps: W3CCapabilities<any>
  ) => Promise<[string, Record<string, any>]>;
  deleteSession: (sessionId?: string) => Promise<void>;
};

type IOSDeviceInterface = {
  mobileTouchAndHold: (opts: {
    duration: number /* In seconds */;
    elementId: string;
  }) => Promise<void>;
} & SharedDeviceInterface;

type AndroidDeviceInterface = {
  touchLongClick: (id: string) => Promise<void>;
  getPageSource: () => Promise<string>;
} & SharedDeviceInterface;

export class DeviceWrapper implements SharedDeviceInterface {
  private readonly device: DeviceWrapper;

  constructor(device: DeviceWrapper) {
    this.device = device;
  }

  /**  === all the shared actions ===  */
  public async click(element: string) {
    // this one works for both devices so just call it without casting it
    return this.toShared().click(element);
  }

  public async back(): Promise<void> {
    return this.toShared().back();
  }

  public async clear(elementId: string): Promise<void> {
    return this.toShared().clear(elementId);
  }

  public async getText(elementId: string): Promise<string> {
    return this.toShared().getText(elementId);
  }

  public async setValueImmediate(
    text: string,
    elementId: string
  ): Promise<void> {
    return this.toShared().setValueImmediate(text, elementId);
  }

  public async getElementRect(
    elementId: string
  ): Promise<
    undefined | { height: number; width: number; x: number; y: number }
  > {
    return this.toShared().getElementRect(elementId);
  }

  public async getCssProperty(
    name: string,
    elementId: string
  ): Promise<string> {
    return this.toShared().getCssProperty(name, elementId);
  }

  public async scroll(
    start: Coordinates,
    end: Coordinates,
    duration: number
  ): Promise<void> {
    const actions = [
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: start.x, y: start.y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 500 },
          {
            type: "pointerMove",
            duration,
            origin: "pointer",
            x: end.x - start.x,
            y: end.y - start.y,
          },
          { type: "pointerUp", button: 0 },
        ],
      },
    ];

    await this.toShared().performActions(actions);
  }

  public async pressCoordinates(
    xCoOrdinates: number,
    yCoOrdinates: number
  ): Promise<void> {
    const actions = [
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: xCoOrdinates,
            y: yCoOrdinates,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },

          { type: "pointerUp", button: 0 },
        ],
      },
    ];

    await this.toShared().performActions(actions);
  }

  public async tap(
    xCoOrdinates: number,
    yCoOrdinates: number,
    duration?: number
  ): Promise<void> {
    const actions = {
      type: "pointer",
      x: xCoOrdinates,
      y: yCoOrdinates,
      duration,
    };
    return this.toShared().performTouch(actions);
  }

  public async performActions(actions: ActionSequence): Promise<Array<void>> {
    return this.toShared().performActions(actions);
  }

  public async performTouch(actions: any): Promise<any> {
    return this.toShared().performTouch(actions);
  }

  public async pushFile(path: string, data: string): Promise<void> {
    return this.toShared().pushFile(path, data);
  }

  public async getElementScreenshot(elementId: string): Promise<string> {
    return this.toShared().getElementScreenshot(elementId);
  }

  public async touchUp(CoOrdinates: Coordinates): Promise<void> {
    return this.toShared().touchUp(CoOrdinates);
  }
  public async touchDown(CoOrdinates: Coordinates): Promise<void> {
    return this.toShared().touchDown(CoOrdinates);
  }

  // Session management
  public async createSession(
    caps: W3CCapabilities<any>
  ): Promise<[string, Record<string, any>]> {
    return this.toShared().createSession(caps);
  }

  public async deleteSession(sessionId?: string): Promise<void> {
    return this.toShared().deleteSession(sessionId);
  }

  public async getPageSource(): Promise<string> {
    return this.toAndroid().getPageSource();
  }

  /* === all the device-specifc function ===  */

  // ELEMENT INTERACTION

  public async findElement(
    strategy: "accessibility id" | "xpath" | "ID",
    selector: string
  ): Promise<AppiumNextElementType> {
    return this.toShared().findElement(strategy, selector);
  }

  public async findElements(
    strategy: "accessibility id" | "xpath" | "class name",
    selector: string
  ): Promise<Array<AppiumNextElementType>> {
    return this.toShared().findElements(strategy, selector);
  }

  public async longClick(element: AppiumNextElementType, durationMs: number) {
    if (this.isIOS()) {
      // iOS takes a number in seconds
      return this.toIOS().mobileTouchAndHold({
        elementId: element.ELEMENT,
        duration: Math.floor(durationMs / 1000),
      });
    }
    return this.toAndroid().touchLongClick(element.ELEMENT);
  }

  public async clickOnElement(accessibilityId: string) {
    const el = await this.waitForElementToBePresent(accessibilityId);

    if (!el) {
      throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
    }
    await this.click(el.ELEMENT);
  }

  public async clickOnElementXPath(selector: string) {
    await this.waitForXPathElement(selector);
    const el = await this.findElementByXpath(selector);
    await this.click(el.ELEMENT);
  }

  public async tapOnElement(accessibilityId: string) {
    const el = await this.findElementByAccessibilityId(accessibilityId);
    if (!el) {
      throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
    }
    await this.click(el.ELEMENT);
  }

  public async longPress(accessibilityId: string) {
    const el = await this.waitForElementToBePresent(accessibilityId);
    if (!el) {
      throw new Error(
        `longPress: Could not find accessibilityId: ${accessibilityId}`
      );
    }
    await this.longClick(el, 1000);
  }

  public async longPressMessage(textToLookFor: string) {
    try {
      const el = await this.waitForTextElementToBePresent(
        "Message Body",
        textToLookFor
      );
      await this.longClick(el, 1000);
      console.log("LongClick successful");
      if (!el) {
        throw new Error(
          `longPress on message: ${textToLookFor} unsuccessful, couldn't find message`
        );
      }
    } catch {
      console.log(`Longpress on message: `, textToLookFor, `unsuccessful`);
    }
  }

  public async longPressConversation(userName: string) {
    const el = await this.waitForTextElementToBePresent(
      "Conversation list item",
      userName
    );
    await this.longClick(el, 1000);
  }

  public async pressAndHold(accessibilityId: string) {
    const el = await this.waitForElementToBePresent(accessibilityId);

    await this.longClick(el, 2000);
  }

  public async selectByText(accessibilityId: string, text: string) {
    await this.waitForTextElementToBePresent(accessibilityId, text);
    const selector = await this.findMatchingTextAndAccessibilityId(
      accessibilityId,
      text
    );
    await this.click(selector.ELEMENT);

    return text;
  }

  public async getTextFromElement(
    element: AppiumNextElementType
  ): Promise<string> {
    const text = await this.getText(element.ELEMENT);

    return text;
  }

  public async grabTextFromAccessibilityId(
    accessibilityId: string
  ): Promise<string> {
    const elementId = await this.waitForElementToBePresent(accessibilityId);

    const text = await this.getTextFromElement(elementId);
    return text;
  }

  public async deleteText(accessibilityId: string) {
    const el = await this.findElementByAccessibilityId(accessibilityId);

    await this.clear(el.ELEMENT);

    console.warn(`Text has been cleared` + accessibilityId);
    return;
  }

  // ELEMENT LOCATORS

  public async findElementByAccessibilityId(
    accessibilityId: string
  ): Promise<AppiumNextElementType> {
    const element = await this.findElement("accessibility id", accessibilityId);
    if (!element || isArray(element)) {
      throw new Error(
        `findElementByAccessibilityId: Did not find accessibilityId: ${accessibilityId} or it was an array `
      );
    }
    return element;
  }

  public async findElementsByAccessibilityId(
    accessibilityId: string
  ): Promise<Array<AppiumNextElementType>> {
    const elements = await this.findElements(
      "accessibility id",
      accessibilityId
    );
    if (!elements || !isArray(elements) || isEmpty(elements)) {
      throw new Error(
        `findElementsByAccessibilityId: Did not find accessibilityId: ${accessibilityId} `
      );
    }

    return elements;
  }

  public async findElementByXpath(xpath: string) {
    const element = await this.findElement("xpath", xpath);
    if (!element) {
      throw new Error(`findElementByXpath: Did not find xpath: ${xpath}`);
    }

    return element;
  }

  public async findMatchingTextAndAccessibilityId(
    accessibilityId: string,
    textToLookFor: string
  ): Promise<AppiumNextElementType> {
    const elements = await this.findElementsByAccessibilityId(accessibilityId);

    const foundElementMatchingText = await this.findMatchingTextInElementArray(
      elements,
      textToLookFor
    );
    if (!foundElementMatchingText) {
      throw new Error(
        `Did not find element with accessibilityId ${accessibilityId} and text body: ${textToLookFor}`
      );
    }

    return foundElementMatchingText;
  }

  public async findMatchingTextInElementArray(
    elements: Array<AppiumNextElementType>,
    textToLookFor: string
  ): Promise<AppiumNextElementType | null> {
    if (elements && elements.length) {
      const matching = await this.findAsync(elements, async (e) => {
        const text = await this.getTextFromElement(e);

        return Boolean(
          text && text.toLowerCase() === textToLookFor.toLowerCase()
        );
      });

      return matching || null;
    }
    return null;
  }

  public async findAsync(
    arr: Array<AppiumNextElementType>,
    asyncCallback: (opts: AppiumNextElementType) => Promise<boolean>
  ): Promise<AppiumNextElementType> {
    const promises = arr.map(asyncCallback);
    const results = await Promise.all(promises);
    const index = results.findIndex((result) => result);
    return arr[index];
  }

  public async findLastElementInArray(
    accessibilityId: string
  ): Promise<AppiumNextElementType> {
    const elements = await this.findElementsByAccessibilityId(accessibilityId);

    const [lastElement] = elements.slice(-1);

    if (!elements) {
      throw new Error(`No elements found with ${accessibilityId}`);
    }

    return lastElement;
  }

  public async findConfigurationMessage(messageText: string) {
    await this.waitForElementToBePresent("Configuration message");
    const configMessage = this.findMatchingTextAndAccessibilityId(
      "Configuration message",
      messageText
    );
    if (!configMessage) {
      throw new Error(`Couldnt find ${configMessage}`);
    }
    return configMessage;
  }

  public async findMessageWithBody(
    textToLookFor: string
  ): Promise<AppiumNextElementType> {
    await this.waitForTextElementToBePresent("Message Body", textToLookFor);
    const message = await this.findMatchingTextAndAccessibilityId(
      "Message Body",
      textToLookFor
    );
    return message;
  }

  public async doesElementExist(
    strategy: "accessibility id" | "xpath",
    selector: string,
    maxWait?: number
  ): Promise<AppiumNextElementType | null> {
    const beforeStart = Date.now();
    const maxWaitMSec = maxWait || 300000;
    const waitPerLoop = 100;
    let element: AppiumNextElementType | null = null;
    while (element === null) {
      try {
        element = await this.findElement(strategy, selector);
      } catch (e) {
        // console.warn("doesElementExist failed with", (e as any).message);
        await sleepFor(waitPerLoop);

        if (beforeStart + maxWaitMSec <= Date.now()) {
          console.log(element, " doesn't exist, time expired");
          break;
        } else {
          console.log(selector, "Doesn't exist but retrying");
        }
      }
    }
    return element;
  }
  // WAIT FOR FUNCTIONS

  public async waitForElementToBePresent(
    accessibilityId: string,
    maxWait?: number
  ): Promise<AppiumNextElementType> {
    const maxWaitMSec = maxWait || 30000;
    let currentWait = 0;
    const waitPerLoop = 100;
    let selector: AppiumNextElementType | null = null;

    while (selector === null) {
      try {
        console.log(
          `Waiting for accessibility ID '${accessibilityId}' to be present`
        );

        selector = await this.findElementByAccessibilityId(accessibilityId);
      } catch (e) {
        await sleepFor(waitPerLoop);
        currentWait += waitPerLoop;

        if (currentWait >= maxWaitMSec) {
          // console.log("Waited for too long");
          throw new Error(
            `waited for too long looking for '${accessibilityId}'`
          );
        }
      }
    }
    console.log(`'${accessibilityId}' has been found`);
    return selector;
  }

  public async waitForTextElementToBePresent(
    accessibilityId: string,
    text: string,
    maxWait?: number
  ): Promise<AppiumNextElementType> {
    let selector: null | AppiumNextElementType = null;
    const maxWaitMSec: number = maxWait || 3000;
    let currentWait: number = 0;
    const waitPerLoop: number = 100;

    while (selector === null) {
      try {
        console.log(
          `Waiting for accessibility ID '${accessibilityId}' to be present with ${text}`
        );

        const elements = await this.findElementsByAccessibilityId(
          accessibilityId
        );

        selector = await this.findMatchingTextInElementArray(elements, text);
      } catch (e) {
        await sleepFor(waitPerLoop);
        currentWait += waitPerLoop;

        if (currentWait >= maxWaitMSec) {
          console.log("Waited too long");
          throw new Error(
            `Waited for too long looking for '${accessibilityId}' and '${text}`
          );
        }
      }
    }
    console.log(`'${accessibilityId}' and '${text}' has been found`);
    return selector;
  }

  public async waitForXPathElement(
    xPath: string,
    maxWait?: number
  ): Promise<AppiumNextElementType> {
    let selector: null | AppiumNextElementType = null;
    const maxWaitMSec: number = maxWait || 3000;
    const waitPerLoop: number = 100;
    let currentWait: number = 0;

    while (selector === null) {
      try {
        console.log(`Waiting for xPath: '${xPath}' to be present`);

        selector = await this.findElementByXpath(xPath);
      } catch (e) {
        await sleepFor(waitPerLoop);
        currentWait += waitPerLoop;
        console.log("Waiting...");

        if (currentWait >= maxWaitMSec) {
          console.log("Waited too long");
          throw new Error(`Waited for too long looking for xPath: '${xPath}'`);
        }
      }
    }
    console.log(`'${xPath}' has been found`);
    return selector;
  }

  // UTILITY FUNCTIONS

  public async sendMessage(message: string) {
    await this.inputText("Message input box", message);
    // Click send
    await this.clickOnElement("Send message button");
    // Wait for tick
    await this.waitForElementToBePresent(`Message sent status: Sent`);

    return message;
  }

  public async sendNewMessage(user: User, message: string) {
    // Sender workflow
    // Click on plus button
    await this.clickOnElement("New conversation button");
    // Select direct message option
    await this.clickOnElement("New direct message");
    // Enter User B's session ID into input box
    await this.inputText("Session id input box", user.sessionID);
    // Click next
    await this.clickOnElement("Next");
    // Type message into message input box

    await this.inputText("Message input box", message);
    // Click send
    await this.clickOnElement("Send message button");
    // Wait for tick
    await this.waitForElementToBePresent(`Message sent status: Sent`);

    return message;
  }

  public async sendMessageTo(sender: User, receiver: User | Group) {
    const message = `'${sender.userName}' to ${receiver.userName}`;
    await this.waitForTextElementToBePresent(
      "Conversation list item",
      receiver.userName
    );
    await this.selectByText("Conversation list item", receiver.userName);
    console.log(
      `'${sender.userName}' + " sent message to ${receiver.userName}`
    );
    await this.sendMessage(message);
  }

  public async replyToMessage(user: User, body: string) {
    // Reply to media message from user B
    // Long press on imageSent element
    await this.longPressMessage(body);
    // Select 'Reply' option
    await this.clickOnElement("Reply to message");
    // Send message
    const sentMessage = await this.sendMessage(
      `${user.userName} message reply`
    );

    return sentMessage;
  }

  public async inputText(accessibilityId: string, text: string) {
    await this.waitForElementToBePresent(accessibilityId);
    const element = await this.findElementByAccessibilityId(accessibilityId);
    if (!element) {
      throw new Error(
        `inputText: Did not find accessibilityId: ${accessibilityId} `
      );
    }

    await this.setValueImmediate(text, element.ELEMENT);
  }

  // ACTIONS

  public async swipeLeft(accessibilityId: string, text: string) {
    const el = await this.findMatchingTextAndAccessibilityId(
      accessibilityId,
      text
    );

    const loc = await this.getElementRect(el.ELEMENT);
    console.log(loc);

    if (!loc) {
      throw new Error("did not find element rectangle");
    }
    await this.scroll(
      { x: loc.x + loc.width, y: loc.y + loc.height / 2 },
      { x: loc.x + loc.width / 2, y: loc.y + loc.height / 2 },
      1000
    );

    console.warn("Swiped left on " + el);
    // let some time for swipe action to happen and UI to update
  }

  public async scrollDown() {
    await this.scroll({ x: 760, y: 1500 }, { x: 760, y: 710 }, 100);
  }

  public async navigateBack(platform: SupportedPlatformsType) {
    if (platform === "ios") {
      await this.clickOnElement("Back");
    } else {
      await this.clickOnElement("Navigate up");
    }
  }

  /* === all the utilities function ===  */
  private isIOS(): boolean {
    return isDeviceIOS(this.device);
  }

  private isAndroid(): boolean {
    return isDeviceAndroid(this.device);
  }

  private toIOS(): IOSDeviceInterface {
    if (!this.isIOS()) {
      throw new Error("Not an ios device");
    }
    return this.device as unknown as IOSDeviceInterface;
  }

  private toAndroid(): AndroidDeviceInterface {
    if (!this.isAndroid()) {
      throw new Error("Not an android device");
    }
    return this.device as unknown as AndroidDeviceInterface;
  }

  private toShared(): SharedDeviceInterface {
    return this.device as unknown as SharedDeviceInterface;
  }
}
