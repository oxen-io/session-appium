# Automation testing for Session

This repository holds the code to do integration tests with appium and Session on iOS and Android.

# Setup

## Android SDK & Emulators

First, you need to download android studio at https://developer.android.com/studio.

Once installed, run it, open the SDK Manager and install the latest SDK tools.

Once this is done, open up the AVD Manager, click on "Create Device" -> "Pixel 4" -> Next -> Select the System Image you want (I did my tests with **R**), install it, select it, "Next" and "Finish".

Then, create a second emulator following the exact same steps (the tests need 2 different emulators to run).

Once done, you should be able to start each emulators and have them running at the same time. They will need to be running for the tests to work, because appium won't start them.

## Environment variables needed

Before you can start the tests, you need to setup some environment variables:

#### ANDROID_SDK_ROOT

`ANDROID_SDK_ROOT` should point to the folder containing the sdks, so the folder containing folders like `platform-tools`, `system-images`, etc...
`export ANDROID_SDK_ROOT=~/Android/Sdk`

#### APPIUM_ANDROID_BINARIES_ROOT

`APPIUM_ANDROID_BINARIES_ROOT` should point to the file containing the apks to install for testing (such as `session-1.13.1-x86.apk`)
`export APPIUM_ANDROID_BINARIES_ROOT=~/appium-binaries`

#### APPIUM_ADB_FULL_PATH

`APPIUM_ADB_FULL_PATH` should point to the binary of adb inside the ANDROID_SDK folder
`export APPIUM_ADB_FULL_PATH=~/Android/Sdk/platform-tools/adb`

## Appium & tests setup

First, install nvm for your system (https://github.com/nvm-sh/nvm).
For windows, head here: https://github.com/coreybutler/nvm-windows

```
nvm install #install node version from the .nvmrc file, currently v16.13.0
nvm use # use that same node version, currently v16.13.0
npm install -g yarn # install yarn
yarn install --frozen # to install packages referenced from yarn.lock
```

The, choose an option:

```
yarn build-and-test # build typescript and run the tests
yarn test # just run the tests
yarn tsc # just build typescript
```

### Multiple adb binaries

Having multiple adb on your system will make tests unreliable, because the server will be restarted by appium.

On linux, if running `which adb` does not point to the `adb` binary in the `ANDROID_SDK_ROOT` you will have issues.

You can get rid of that other adb on linux by running

```
sudo apt remove adb
sudo apt remove android-tools-adb
```

`which adb` should not return anything.

Somehow, appium asks for the sdk tools but do not force the adb binary to come from the sdk tools folder. Making sure that there is no adb in your path should solve this.
