import { StrategyExtractionObj } from '../../../types/testing';
import { LocatorsInterface } from './index';

export class HideRecoveryPasswordButton extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    return {
      strategy: 'accessibility id',
      selector: 'Hide recovery password button',
    } as const;
  }
}

export class HideRecoveryPasswordModalHeading extends LocatorsInterface {
  public build(): StrategyExtractionObj {
    switch (this.platform) {
      case 'android':
        return {
          strategy: 'class name',
          selector: 'android.widget.TextView',
          text: 'Hide Recovery Password Permanently',
        };
      case 'ios':
        return {
          strategy: 'accessibility id',
          selector: 'Hide Recovery Password Permanently',
        };
    }
  }
}
