import { LocatorsInterface } from "./index";

// SHARED LOCATORS 

export class ContinueButton extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Continue',
        } as const;
    }
}

export class ErrorMessage extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Error message',
        } as const;
    }
}

// SPLASH SCREEN 
export class CreateAccountButton extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Create account button',
        } as const;
    }
}

export class AccountRestoreButton extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Restore your session button',
        } as const;
    }
}

// CREATE ACCOUNT FLOW 

export class DisplayNameInput extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Enter display name',
        } as const;
    }
}

// LOAD ACCOUNT FLOW 

export class SeedPhraseInput extends LocatorsInterface {
    public build() {
        switch (this.platform) {  
            case 'android':  
                return {  
                    strategy: 'accessibility id',  
                    selector: 'Recovery phrase input',  
                  } as const;  
            case 'ios':  
                return {  
                    strategy: 'accessibility id',  
                    selector: 'Recovery password input',  
                  } as const;  
              }  
        } 
    }

// MESSAGE NOTIFICATIONS

export class SlowModeRadio extends LocatorsInterface {
    public build() {
        return {
            strategy: 'accessibility id',
            selector: 'Slow mode notifications button',
        } as const;
    }
}