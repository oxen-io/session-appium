import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from '.';
import { DeviceWrapper } from '../../../types/DeviceWrapper';
import { User, Username } from '../../../types/testing';
import { SupportedPlatformsType } from './open_app';

export const newUser = async (
  device: DeviceWrapper,
  userName: Username,
  platform: SupportedPlatformsType
): Promise<User> => {
  // Click create session ID

  await device.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Create account button',
  });
  // Click continue on session Id creation
  await device.clickOnByAccessibilityID('Continue');
  // Input username
  await device.inputText(userName, {
    strategy: 'accessibility id',
    selector: 'Enter display name',
  });
  // Click continue
  await device.clickOnByAccessibilityID('Continue');
  // Choose message notification options
  // Want to choose 'Slow Mode' so notifications don't interrupt test
  await device.clickOnByAccessibilityID('Slow mode notifications button');
  // Select Continue to save notification settings
  await device.clickOnByAccessibilityID('Continue');
  // Need to add Don't allow notifications dismiss here
  await device.checkPermissions(`Allow`);
  // Click on 'continue' button to open recovery phrase modal
  await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Reveal recovery phrase button',
  });
  await runOnlyOnIOS(platform, () => device.clickOnByAccessibilityID('Continue'));
  await runOnlyOnAndroid(platform, () =>
    device.clickOnElementAll({
      strategy: 'accessibility id',
      selector: 'Reveal recovery phrase button',
    })
  );
  //Save recovery passwprd
  await device.clickOnByAccessibilityID('Recovery password container');
  await runOnlyOnAndroid(platform, () => device.clickOnByAccessibilityID('Copy button'));
  // Save recovery phrase as variable
  const recoveryPhrase = await device.grabTextFromAccessibilityId('Recovery password container');
  console.log(`${userName}s recovery phrase is "${recoveryPhrase}"`);
  // Exit Modal
  await device.navigateBack(platform);
  await device.clickOnByAccessibilityID('User settings');
  const accountID = await device.grabTextFromAccessibilityId('Account ID');
  await runOnlyOnAndroid(platform, () => device.navigateBack(platform));
  await runOnlyOnIOS(platform, () =>
    device.clickOnElementAll({
      strategy: 'accessibility id',
      selector: 'Close button',
    })
  );
  return { userName, accountID, recoveryPhrase };
};
