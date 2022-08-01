/// <reference types="node"/>

// taken from https://github.com/admc/wd/issues/551

// if you need to find any other types, or make those more complete,
// use https://github.com/admc/wd/search?q=<what you need to find as type>
// this should help you find what is defined in the object in JS, which you need to add here so typescript finds it

declare namespace wd {
  // the types for TouchAction are to be ourself from this file: https://github.com/admc/wd/blob/e74df30db9f452ab188371c5eb9a53d2fcd58895/lib/actions.js
  class TouchAction {
    constructor(device: PromiseWebdriver);
    /**
     * touchAction.longPress({el, x, y})
     * pass el or (x,y) or both
     *
     * @actions
     */
    longPress: (opts: {
      el: PromiseWebdriver;
      x?: number;
      y?: number;
    }) => TouchAction;
    perform: () => Promise<void>; // this returns a promise
    toJSON: () => object;

    /**
     * touchAction.moveTo({el, x, y})
     * pass el or (x,y) or both
     *
     * @actions
     */
    moveTo: (opts: any) => TouchAction;

    /**
     * touchAction.press({el, x, y})
     * pass el or (x,y) or both
     *
     * @actions
     */
    press: (opts: any) => TouchAction;

    /**
     * touchAction.release()
     *
     * @actions
     */
    release: () => TouchAction;

    /**
     * touchAction.tap({el, x, y})
     * pass el or (x,y) or both
     *
     * @actions
     */
    tap: (opts: any) => TouchAction;

    /**
     * touchAction.wait(ms)     *
     * @actions
     */
    wait: (ms?: number) => TouchAction;

    /**
     * touchAction.cancel()
     *
     * @actions
     */
    cancel: () => TouchAction;
  }

  const promiseChainRemote: (
    host: string,
    port: number
  ) => Promise<PromiseWebdriver>;

  // the type PromiseWebDriver is most likely correct and full
  interface PromiseWebdriver {
    status(cb?: (err: any, status: any) => void): PromiseWebdriver;

    init(
      desired?: any,
      cb?: (err: any, sessionID: any, capabilities: any) => void
    ): PromiseWebdriver;

    sessions(cb?: (err: any, sessions: any) => void): PromiseWebdriver;

    altSessionCapabilities(
      cb?: (err: any, capabilities: any) => void
    ): PromiseWebdriver;

    sessionCapabilities(
      cb?: (err: any, capabilities: any) => void
    ): PromiseWebdriver;

    quit(cb?: (err: any) => void): PromiseWebdriver;

    setPageLoadTimeout(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    setCommandTimeout(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    setAsyncScriptTimeout(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    setImplicitWaitTimeout(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    windowHandle(cb?: (err: any, handle: any) => void): PromiseWebdriver;

    windowHandles(
      cb?: (err: any, arrayOfHandles: any) => void
    ): PromiseWebdriver;

    url(cb?: (err: any, url: any) => void): PromiseWebdriver;

    get(url?: any, cb?: (err: any) => void): PromiseWebdriver;

    forward(cb?: (err: any) => void): PromiseWebdriver;

    back(cb?: (err: any) => void): PromiseWebdriver;

    refresh(cb?: (err: any) => void): PromiseWebdriver;

    execute(
      code?: any,
      args?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    execute(code?: any, cb?: (err: any, result: any) => void): PromiseWebdriver;

    safeExecute(
      code?: any,
      args?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    safeExecute(
      code?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    eval(code?: any, cb?: (err: any, value: any) => void): PromiseWebdriver;

    safeEval(code?: any, cb?: (err: any, value: any) => void): PromiseWebdriver;

    executeAsync(
      code?: any,
      args?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    executeAsync(
      code?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    safeExecuteAsync(
      code?: any,
      args?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    safeExecuteAsync(
      code?: any,
      cb?: (err: any, result: any) => void
    ): PromiseWebdriver;

    takeScreenshot(cb?: (err: any, screenshot: any) => void): PromiseWebdriver;

    availableIMEEngines(
      cb?: (err: any, engines: any) => void
    ): PromiseWebdriver;

    activeIMEEngine(
      cb?: (err: any, activeEngine: any) => void
    ): PromiseWebdriver;

    activatedIMEEngine(cb?: (err: any, active: any) => void): PromiseWebdriver;

    deactivateIMEEngine(cb?: (err: any) => void): PromiseWebdriver;

    activateIMEEngine(cb?: (err: any) => void, engine?: any): PromiseWebdriver;

    frame(frameRef?: any, cb?: (err: any) => void): PromiseWebdriver;

    window(name?: any, cb?: (err: any) => void): PromiseWebdriver;

    close(cb?: (err: any) => void): PromiseWebdriver;

    windowSize(
      handle?: any,
      width?: any,
      height?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setWindowSize(
      width?: any,
      height?: any,
      handle?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setWindowSize(
      width?: any,
      height?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    getWindowSize(
      handle?: any,
      cb?: (err: any, size: any) => void
    ): PromiseWebdriver;

    getWindowSize(cb?: (err: any, size: any) => void): PromiseWebdriver;

    setWindowPosition(
      x?: any,
      y?: any,
      handle?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setWindowPosition(
      x?: any,
      y?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    getWindowPosition(
      handle?: any,
      cb?: (err: any, position: any) => void
    ): PromiseWebdriver;

    getWindowPosition(cb?: (err: any, position: any) => void): PromiseWebdriver;

    maximize(handle?: any, cb?: (err: any) => void): PromiseWebdriver;

    allCookies(): PromiseWebdriver;

    setCookie(cookie?: any, cb?: (err: any) => void): PromiseWebdriver;

    deleteAllCookies(cb?: (err: any) => void): PromiseWebdriver;

    deleteCookie(name?: any, cb?: (err: any) => void): PromiseWebdriver;

    source(cb?: (err: any, source: any) => void): PromiseWebdriver;

    title(cb?: (err: any, title: any) => void): PromiseWebdriver;

    element(
      using?: any,
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByClassName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssSelector(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementById(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByLinkText(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByPartialLinkText(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByTagName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByXPath(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCss(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosUIAutomation(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosClassChain(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAndroidUIAutomator(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAccessibilityId(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elements(
      using?: any,
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByClassName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByCssSelector(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsById(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByLinkText(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByPartialLinkText(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByTagName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByXPath(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByCss(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosUIAutomation(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosClassChain(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosPredicateString(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByAndroidUIAutomator(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByAccessibilityId(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementOrNull(
      using?: any,
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByClassNameOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssSelectorOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIdOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByNameOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByLinkTextOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByPartialLinkTextOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByTagNameOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByXPathOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosUIAutomationOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosClassChainOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosPredicateStringOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAndroidUIAutomatorOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAccessibilityIdOrNull(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementIfExists(
      using?: any,
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByClassNameIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssSelectorIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIdIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByNameIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByLinkTextIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByPartialLinkTextIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByTagNameIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByXPathIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosUIAutomationIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosClassChainIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosPredicateStringIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAndroidUIAutomatorIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAccessibilityIdIfExists(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    hasElement(
      using?: any,
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByClassName(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByCssSelector(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementById(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByName(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByLinkText(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByPartialLinkText(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByTagName(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByXPath(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByCss(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByIosUIAutomation(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByIosClassChain(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByIosPredicateString(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByAndroidUIAutomator(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    hasElementByAccessibilityId(
      value?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    active(cb?: (err: any, element: any) => void): PromiseWebdriver;

    element(
      using?: any,
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByClassName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCssSelector(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementById(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByLinkText(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByPartialLinkText(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByTagName(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByXPath(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByCss(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosUIAutomation(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosClassChain(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByIosPredicateString(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAndroidUIAutomator(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elementByAccessibilityId(
      value?: any,
      cb?: (err: any, element: any) => void
    ): PromiseWebdriver;

    elements(
      using?: any,
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByClassName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByCssSelector(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsById(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByLinkText(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByPartialLinkText(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByTagName(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByXPath(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByCss(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosUIAUtomation(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosClassChain(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByIosPredicateString(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByAndroidUIAutomator(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    elementsByAccessibilityId(
      value?: any,
      cb?: (err: any, elements: any) => void
    ): PromiseWebdriver;

    clickElement(element?: any, cb?: (err: any) => void): PromiseWebdriver;

    click(cb?: (err: any) => void): PromiseWebdriver;

    submit(element?: any, cb?: (err: any) => void): PromiseWebdriver;

    submit(cb?: (err: any) => void): PromiseWebdriver;

    text(element?: any, cb?: (err: any, text: any) => void): PromiseWebdriver;

    text(cb?: (err: any, text: any) => void): PromiseWebdriver;

    textPresent(
      searchText?: any,
      element?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    textPresent(
      searchText?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    type(element?: any, keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    type(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    keys(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    keys(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    getTagName(
      element?: any,
      cb?: (err: any, name: any) => void
    ): PromiseWebdriver;

    getTagName(cb?: (err: any, name: any) => void): PromiseWebdriver;

    clear(element?: any, cb?: (err: any) => void): PromiseWebdriver;

    clear(cb?: (err: any) => void): PromiseWebdriver;

    isSelected(
      element?: any,
      cb?: (err: any, selected: any) => void
    ): PromiseWebdriver;

    isSelected(cb?: (err: any, selected: any) => void): PromiseWebdriver;

    isEnabled(
      element?: any,
      cb?: (err: any, enabled: any) => void
    ): PromiseWebdriver;

    isEnabled(cb?: (err: any, enabled: any) => void): PromiseWebdriver;

    getAttribute(
      element?: any,
      attrName?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    getAttribute(
      attrName?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    getValue(
      element?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    getValue(cb?: (err: any, value: any) => void): PromiseWebdriver;

    equals(other?: any, cb?: (err: any, value: any) => void): PromiseWebdriver;

    equalsElement(
      element?: any,
      other?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    isDisplayed(
      element?: any,
      cb?: (err: any, displayed: any) => void
    ): PromiseWebdriver;

    isDisplayed(cb?: (err: any, displayed: any) => void): PromiseWebdriver;

    getLocation(
      element?: any,
      cb?: (err: any, location: any) => void
    ): PromiseWebdriver;

    getLocation(cb?: (err: any, location: any) => void): PromiseWebdriver;

    getLocationInView(cb?: (err: any, location: any) => void): PromiseWebdriver;

    getLocationInView(
      element?: any,
      cb?: (err: any, location: any) => void
    ): PromiseWebdriver;

    getSize(
      element?: any,
      cb?: (err: any, size: any) => void
    ): PromiseWebdriver;

    getSize(cb?: (err: any, size: any) => void): PromiseWebdriver;

    getComputedCss(
      element?: any,
      cssProperty?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    getComputedCss(
      cssProperty?: any,
      cb?: (err: any, value: any) => void
    ): PromiseWebdriver;

    getOrientation(cb?: (err: any, orientation: any) => void): PromiseWebdriver;

    setOrientation(orientation?: any): PromiseWebdriver;

    alertText(cb?: (err: any, text: any) => void): PromiseWebdriver;

    alertKeys(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    acceptAlert(cb?: (err: any) => void): PromiseWebdriver;

    dismissAlert(cb?: (err: any) => void): PromiseWebdriver;

    moveTo(
      element?: any,
      xoffset?: any,
      yoffset?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    moveTo(
      xoffset?: any,
      yoffset?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    click(button?: any, cb?: (err: any) => void): PromiseWebdriver;

    buttonDown(button?: any, cb?: (err: any) => void): PromiseWebdriver;

    buttonUp(button?: any, cb?: (err: any) => void): PromiseWebdriver;

    doubleclick(cb?: (err: any) => void): PromiseWebdriver;

    doubleClick(cb?: (err: any) => void): PromiseWebdriver;

    tap(element?: any): PromiseWebdriver;

    tap(cb?: (err: any) => void): PromiseWebdriver;

    flick(
      xSpeed?: any,
      ySpeed?: any,
      swipe?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    flick(
      element?: any,
      xoffset?: any,
      yoffset?: any,
      speed?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    flick(
      xoffset?: any,
      yoffset?: any,
      speed?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    getGeoLocation(
      cb?: (err: any, geoLocationObj: any) => void
    ): PromiseWebdriver;

    setGeoLocation(
      lat?: any,
      lon?: any,
      alt?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setLocalStorageKey(
      key?: any,
      value?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    clearLocalStorage(cb?: (err: any) => void): PromiseWebdriver;

    getLocalStorageKey(key?: any, cb?: (err: any) => void): PromiseWebdriver;

    removeLocalStorageKey(key?: any, cb?: (err: any) => void): PromiseWebdriver;

    log(
      logType?: any,
      cb?: (err: any, arrayOfLogs: any) => void
    ): PromiseWebdriver;

    logTypes(cb?: (err: any, arrayOfLogTypes: any) => void): PromiseWebdriver;

    currentContext(cb?: (err: any) => void): PromiseWebdriver;

    context(
      contextRef?: any,
      cb?: (err: any, context: any) => void
    ): PromiseWebdriver;

    contexts(cb?: (err: any, handle: any) => void): PromiseWebdriver;

    performTouchAction(touchAction?: any): PromiseWebdriver;

    performMultiAction(element?: any, multiAction?: any): PromiseWebdriver;

    performMultiAction(multiAction?: any): PromiseWebdriver;

    performMultiAction(actions?: any): PromiseWebdriver;

    shakeDevice(cb?: (err: any) => void): PromiseWebdriver;

    shake(cb?: (err: any) => void): PromiseWebdriver;

    lockDevice(seconds?: any, cb?: (err: any) => void): PromiseWebdriver;

    lock(seconds?: any, cb?: (err: any) => void): PromiseWebdriver;

    unlockDevice(cb?: (err: any) => void): PromiseWebdriver;

    unlock(cb?: (err: any) => void): PromiseWebdriver;

    deviceKeyEvent(
      keycode?: any,
      metastate?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    pressDeviceKey(
      keycode?: any,
      metastate?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    pressKeycode(
      keycode?: any,
      metastate?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    longPressKeycode(
      keycode?: any,
      metastate?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    rotateDevice(
      element?: any,
      opts?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    rotateDevice(opts?: any, cb?: (err: any) => void): PromiseWebdriver;

    rotate(
      element?: any,
      opts?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    rotate(opts?: any, cb?: (err: any) => void): PromiseWebdriver;

    rotate(opts?: any, cb?: (err: any) => void): PromiseWebdriver;

    getCurrentDeviceActivity(cb?: (err: any) => void): PromiseWebdriver;

    getCurrentActivity(cb?: (err: any) => void): PromiseWebdriver;

    getCurrentPackage(cb?: (err: any) => void): PromiseWebdriver;

    installAppOnDevice(
      appPath?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    installApp(appPath?: any, cb?: (err: any) => void): PromiseWebdriver;

    removeAppFromDevice(appId?: any, cb?: (err: any) => void): PromiseWebdriver;

    removeApp(appId?: any, cb?: (err: any) => void): PromiseWebdriver;

    isAppInstalledOnDevice(
      bundleId?: any,
      cb?: (isInstalled: any, err: any) => void
    ): PromiseWebdriver;

    isAppInstalled(
      bundleId?: any,
      cb?: (isInstalled: any, err: any) => void
    ): PromiseWebdriver;

    pushFileToDevice(
      pathOnDevice?: any,
      base64Data?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    pushFile(
      pathOnDevice?: any,
      base64Data?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    pullFileFromDevice(
      pathOnDevice?: any,
      cb?: (base64EncodedData: any, err: any) => void
    ): PromiseWebdriver;

    pullFile(
      pathOnDevice?: any,
      cb?: (base64EncodedData: any, err: any) => void
    ): PromiseWebdriver;

    pullFolderFromDevice(
      pathOnDevice?: any,
      cb?: (base64EncodedData: any, err: any) => void
    ): PromiseWebdriver;

    pullFolder(
      pathOnDevice?: any,
      cb?: (base64EncodedData: any, err: any) => void
    ): PromiseWebdriver;

    toggleAirplaneModeOnDevice(cb?: (err: any) => void): PromiseWebdriver;

    toggleAirplaneMode(cb?: (err: any) => void): PromiseWebdriver;

    toggleFlightMode(cb?: (err: any) => void): PromiseWebdriver;

    toggleWiFiOnDevice(cb?: (err: any) => void): PromiseWebdriver;

    toggleWiFi(cb?: (err: any) => void): PromiseWebdriver;

    toggleLocationServicesOnDevice(cb?: (err: any) => void): PromiseWebdriver;

    toggleLocationServices(cb?: (err: any) => void): PromiseWebdriver;

    toggleDataOnDevice(cb?: (err: any) => void): PromiseWebdriver;

    toggleData(cb?: (err: any) => void): PromiseWebdriver;

    startActivity(options?: any, cb?: (err: any) => void): PromiseWebdriver;

    getClipboard(contentType?: any, cb?: (err: any) => void): PromiseWebdriver;

    setClipboard(
      content?: any,
      contentType?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    launchApp(cb?: (err: any) => void): PromiseWebdriver;

    closeApp(cb?: (err: any) => void): PromiseWebdriver;

    resetApp(cb?: (err: any) => void): PromiseWebdriver;

    backgroundApp(seconds?: any, cb?: (err: any) => void): PromiseWebdriver;

    endTestCoverageForApp(
      intentToBroadcast?: any,
      pathOnDevice?: any
    ): PromiseWebdriver;

    endTestCoverage(
      intentToBroadcast?: any,
      pathOnDevice?: any
    ): PromiseWebdriver;

    endCoverage(intentToBroadcast?: any, pathOnDevice?: any): PromiseWebdriver;

    complexFindInApp(selector?: any): PromiseWebdriver;

    complexFind(selector?: any): PromiseWebdriver;

    getAppStrings(cb?: (err: any) => void): PromiseWebdriver;

    setImmediateValueInApp(
      element?: any,
      value?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setImmediateValue(
      element?: any,
      value?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setImmediateValueInApp(
      value?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    setImmediateValue(value?: any, cb?: (err: any) => void): PromiseWebdriver;

    getNetworkConnection(
      cb?: (err: any, networkConnectionInfo: any) => void
    ): PromiseWebdriver;

    setNetworkConnection(type?: any, cb?: (err: any) => void): PromiseWebdriver;

    isKeyboardShown(): PromiseWebdriver;

    hideKeyboard(): PromiseWebdriver;

    hideKeyboard(keyName?: any, cb?: (err: any) => void): PromiseWebdriver;

    openNotifications(cb?: (err: any) => void): PromiseWebdriver;

    getSupportedPerformanceDataTypes(cb?: (err: any) => void): PromiseWebdriver;

    getPerformanceData(
      packageName?: any,
      dataType?: any,
      dataReadTimeout?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;

    touchId(cb?: (err: any) => void): PromiseWebdriver;

    attach(sessionID?: any, cb?: (err: any) => void): PromiseWebdriver;

    detach(cb?: (err: any) => void): PromiseWebdriver;

    getSessionId(cb?: (err: any, sessionId: any) => void): PromiseWebdriver;

    getSessionId(): PromiseWebdriver;

    newWindow(url?: any, name?: any, cb?: (err: any) => void): PromiseWebdriver;

    newWindow(url?: any, cb?: (err: any) => void): PromiseWebdriver;

    windowName(cb?: (err: any, name: any) => void): PromiseWebdriver;

    configureHttp(opts?: any): PromiseWebdriver;

    waitFor(
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, return_value: any) => void
    ): PromiseWebdriver;

    waitFor(opts?: any, cb?: (err: any) => void): PromiseWebdriver;

    waitForElement(
      using?: any,
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElement(
      using?: any,
      value?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElement(
      using?: any,
      value?: any,
      opts?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElements(
      using?: any,
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElements(
      using?: any,
      value?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElements(
      using?: any,
      value?: any,
      opts?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    saveScreenshot(
      path?: any,
      cb?: (err: any, filePath: any) => void
    ): PromiseWebdriver;

    waitForElementByClassName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByCssSelector(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementById(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByLinkText(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByPartialLinkText(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByTagName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByXPath(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByCss(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByIosUIAutomation(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByIosClassChain(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByAndroidUIAutomator(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementByAccessibilityId(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementsByClassName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByCssSelector(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsById(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByLinkText(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByPartialLinkText(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByTagName(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByXPath(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByCss(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, els: any) => void
    ): PromiseWebdriver;

    waitForElementsByIosUIAutomation(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementsByIosClassChain(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementsByAndroidUIAutomator(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    waitForElementsByAccessibilityId(
      value?: any,
      asserter?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, el: any) => void
    ): PromiseWebdriver;

    getPageIndex(
      element?: any,
      cb?: (err: any, pageIndex: any) => void
    ): PromiseWebdriver;

    uploadFile(
      filepath?: any,
      cb?: (err: any, filepath: any) => void
    ): PromiseWebdriver;

    waitForConditionInBrowser(
      conditionExpr?: any,
      timeout?: any,
      pollFreq?: any,
      cb?: (err: any, boolean: any) => void
    ): PromiseWebdriver;

    sauceJobUpdate(jsonData?: any, cb?: (err: any) => void): PromiseWebdriver;

    sauceJobStatus(hasPassed?: any, cb?: (err: any) => void): PromiseWebdriver;

    sleep(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    noop(cb?: (err: any) => void): PromiseWebdriver;

    sendKeys(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    setText(keys?: any, cb?: (err: any) => void): PromiseWebdriver;

    isVisible(cb?: (err: any, boolean: any) => void): PromiseWebdriver;

    sleep(ms?: any, cb?: (err: any) => void): PromiseWebdriver;

    noop(cb?: (err: any) => void): PromiseWebdriver;

    textInclude(content?: any): PromiseWebdriver;

    jsCondition(jsConditionExpr?: any): PromiseWebdriver;

    configureHttp(opts?: any): PromiseWebdriver;

    showHideDeprecation(boolean?: any): PromiseWebdriver;

    addAsyncMethod(name?: any, func?: any): PromiseWebdriver;

    addElementAsyncMethod(name?: any, func?: any): PromiseWebdriver;

    addPromiseMethod(name?: any, func?: any): PromiseWebdriver;

    addElementPromiseMethod(name?: any, func?: any): PromiseWebdriver;

    addPromiseChainMethod(name?: any, func?: any): PromiseWebdriver;

    addElementPromiseChainMethod(name?: any, func?: any): PromiseWebdriver;

    removeMethod(name?: any, func?: any): PromiseWebdriver;

    isLocked(cb?: (err: any) => void): PromiseWebdriver;

    settings(cb?: (err: any, settingsObject: any) => void): PromiseWebdriver;

    updateSettings(
      settingsObject?: any,
      cb?: (err: any) => void
    ): PromiseWebdriver;
  }

  const VERSION: string;
}

declare module "wd" {
  export = wd;
}
