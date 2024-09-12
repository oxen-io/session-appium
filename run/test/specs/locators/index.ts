import { ANDROID_XPATHS, IOS_XPATHS } from '../../../constants';
import { DeviceWrapper } from '../../../types/DeviceWrapper';
import { StrategyExtractionObj } from '../../../types/testing';
import { SupportedPlatformsType } from '../utils/open_app';

export abstract class LocatorsInterface {
  protected readonly platform: SupportedPlatformsType;

  abstract build(): StrategyExtractionObj;

  constructor(device: DeviceWrapper) {
    if (device.isAndroid()) {
      this.platform = 'android';
    } else if (device.isIOS()) {
      this.platform = 'ios';
    } else {
      console.info('unsupported device type:', device);
      throw new Error('unsupported device type');
    }
  }

  protected isIos() {
    return this.platform === 'ios';
  }

  protected isAndroid() {
    return this.platform === 'android';
  }
}
// When applying a nickname or username change
export class TickButton extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return { strategy: 'accessibility id', selector: 'Set' } as const;
      case 'ios':
        return { strategy: 'accessibility id', selector: 'Done' } as const;
    }
  }
}

export class ApplyChanges extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: 'network.loki.messenger:id/action_apply',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Apply changes',
        } as const;
    }
  }
}

export class EditGroup extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: 'network.loki.messenger:id/title',
          text: 'Edit group',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Edit group',
        } as const;
    }
  }
}

export class EditGroupName extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Group name text field',
        } as const;
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Group name',
        } as const;
    }
  }
}

export class PrivacyButton extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'class name',
          selector: 'android.widget.TextView',
          text: 'Privacy',
        } as const;
      case 'ios':
        return { strategy: 'id', selector: 'Privacy' } as const;
    }
  }
}

export class ReadReceiptsButton extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: 'android:id/summary',
          text: 'Send read receipts in one-to-one chats.',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Read Receipts - Switch',
        } as const;
    }
  }
}

export class ExitUserProfile extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Navigate up',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Close button',
        } as const;
    }
  }
}

export class UsernameSettings extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Display name',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Username',
        } as const;
    }
  }
}

export class UsernameInput extends LocatorsInterface {
  public build() {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Enter display name',
        } as const;
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Username',
        } as const;
    }
  }
}

export class FirstGif extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'xpath',
          selector: ANDROID_XPATHS.FIRST_GIF,
        };
      case 'ios':
        return {
          strategy: 'xpath',
          selector: IOS_XPATHS.FIRST_GIF,
        };
    }
  }
}

export class MediaMessage extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Media message',
        };
      case 'ios':
        return {
          strategy: 'class name',
          selector: 'XCUIElementTypeImage',
        };
    }
  }
}
export class BlockUser extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Block This User - Switch',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Block',
        };
    }
  }
}

export class ChangeProfilePictureButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Upload',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Image picker',
        };
    }
  }
}

export class ImagePermissionsModalAllow extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: 'com.android.permissioncontroller:id/permission_allow_foreground_only_button',
        };
      case 'ios':
        return { strategy: 'accessibility id', selector: 'Allow Full Access' };
    }
  }
}

export class JoinCommunityOption extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Join community button',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Join Community',
        };
    }
  }
}

export class JoinCommunityButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Join community button',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Join',
        };
    }
  }
}

export class CommunityInput extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Community input',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Enter Community URL',
        };
    }
  }
}

export class InviteContacts extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: `network.loki.messenger:id/title`,
          text: 'Invite Contacts',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Invite Contacts',
        };
    }
  }
}

export class LeaveGroupButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: `network.loki.messenger:id/title`,
          text: 'Leave group',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Leave group',
        };
    }
  }
}

export class DeleteMessageConfirmation extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Delete just for me',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Delete for me',
        };
    }
  }
}

export class LeaveGroup extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: `network.loki.messenger:id/title`,
          text: 'Leave group',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Leave group',
        };
    }
  }
}

export class BlockUserConfirmation extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Confirm block',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Confirm block',
        };
    }
  }
}
export class BlockedContactsSettings extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Blocked contacts',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Blocked Contacts',
        };
    }
  }
}

export class DeclineMessageRequestButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Decline message request',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Delete message request',
        };
    }
  }
}

export class DeleteMessageRequestButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'id',
          selector: `android:id/title`,
          text: 'Delete',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Delete',
        };
    }
  }
}

export class DeleteMesssageRequestConfirmation extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Confirm delete',
        };
      case 'android':
        return {
          strategy: 'accessibility id',
          selector: 'Delete',
        };
    }
  }
}

// TODO update StrategyExtractionObj to include Locator class
// export class PendingMessageRequestControlMessage extends LocatorsInterface {
//   public build(): StrategyExtractionObj {
//     switch (this.platform) {
//       case 'android':
//         return {
//           strategy: 'id',
//           selector: 'network.loki.messenger:id/textSendAfterApproval',
//           text: 'You will be able to send voice messages and attachments once the recipient has approved this message request.',
//         };
//       case 'ios':
//         return {
//           strategy: 'accessibility id',
//           selector: 'Control message',
//           text: 'You will be able to send voice messages and attachments once the recipient has approved this message request.',
//         };
//     }
//   }
// }

// export class MessageRequestAcceptedDescriptionControlMessage extends LocatorsInterface {
//   public build(): StrategyExtractionObj {
//     switch (this.platform) {
//       case 'ios':
//         return {
//           strategy: 'accessibility id',
//           selector: 'Control message',
//           text: 'Sending a message to this user will automatically accept their message request and reveal your Account ID.',
//         };
//       case 'android':
//         return {
//           strategy: 'id',
//           selector: 'network.loki.messenger:id/sendAcceptsTextView',
//           text: 'Sending a message to this user will automatically accept their message request and reveal your Account ID.',
//         };
//     }
//   }
// }
