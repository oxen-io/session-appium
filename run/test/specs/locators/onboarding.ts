import { LocatorsInterface } from "./index";

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

// SHARED ELEMENTS 

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
        return {
            strategy: 'accessibility id',
            selector: this.isIos() ? 'Recovery password input' : 'Recovery phrase input',
        } as const;
    }
}


