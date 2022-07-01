const landingPage = require("../pageObjects/landing-page.page.js");
const registerPage = require("../pageObjects/register-page.page.js");
const displayNamePage = require("../pageObjects/display-name.page.js");
const recoveryPhrasePage = require("../pageObjects/recovery-phrase.page.js");
const navigation = require("../pageObjects/navigation.page.js");

export const newUser = async (
  userName: string
  // capabilitiesToUse: Record<string, any>
) => {
  // const window = await driver.newSession(capabilitiesToUse);

  await landingPage.createSessionIdBtn.click();
  // Save session ID as variable
  const sessionID = await registerPage.sessionId.getText();
  console.log(`Session ID: ${sessionID}`);
  await registerPage.continueBtn.click();
  // Input username
  await displayNamePage.displayNameInput.addValue(userName);
  // Click continue
  await registerPage.continueBtn.click();
  // Choose message notification options
  await registerPage.continueBtn.click();
  // Click on 'continue' button to open recovery phrase modal
  await registerPage.continueBtn.click();
  // Long Press the recovery phrase to reveal recovery phrase
  await recoveryPhrasePage.recoveryPhrase.touchAction("longPress");
  // Save recovery phrase as variable
  const recoveryPhrase = await recoveryPhrasePage.recoveryPhrase.getText();
  console.log(`Recovery Phrase: ${recoveryPhrase}`);
  // Exit modal
  await navigation.goBack.click();

  return { userName, sessionID, recoveryPhrase };
};
