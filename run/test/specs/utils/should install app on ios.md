should install app on ios
args {
hostname: '127.0.0.1',
port: 8100,
user: undefined,
pwd: undefined,
protocol: 'http:',
pathname: '/wd/hub/'
}
[Appium] Welcome to Appium v1.22.3
[HTTP] Could not start REST http interface listener. The requested port may already be in use. Please make sure there is no other instance of this server running already. 1) Create user

0 passing (88ms)
1 failing

1. User
   Create user:
   Error: listen EADDRINUSE: address already in use 0.0.0.0:4723
   at Server.setupListenHandle [as _listen2] (node:net:1372:16)
   at listenInCluster (node:net:1420:12)
   at doListen (node:net:1559:7)
   at processTicksAndRejections (node:internal/process/task_queues:84:21)

^C[Appium] Received SIGINT - shutting down
[debug] [Appium] There are no active sessions for cleanup
➜ appium_js git:(main) ✗ lsof -i :4723
➜ appium_js git:(main) ✗
➜ appium_js git:(main) ✗ lsof -i tcp:4723
➜ appium_js git:(main) ✗ lsof -i :4723  
➜ appium_js git:(main) ✗ npm run test-one 'Create user'

> test-one
> \_TESTING=0 mocha --timeout 300000 -retries 1 --jobs 1 ./run/test/specs/\*.spec.js -- --grep "Create user"

User
[Appium] Welcome to Appium v1.22.3
[Appium] Appium REST http interface listener started on 0.0.0.0:4723
should install app on ios
args {
hostname: '127.0.0.1',
port: 8100,
user: undefined,
pwd: undefined,
protocol: 'http:',
pathname: '/wd/hub/'
}
[Appium] Welcome to Appium v1.22.3
[HTTP] Could not start REST http interface listener. The requested port may already be in use. Please make sure there is no other instance of this server running already. 1) Create user

0 passing (139ms)
1 failing

1. User
   Create user:
   Error: listen EADDRINUSE: address already in use 0.0.0.0:4723
   at Server.setupListenHandle [as _listen2] (node:net:1372:16)
   at listenInCluster (node:net:1420:12)
   at doListen (node:net:1559:7)
   at processTicksAndRejections (node:internal/process/task_queues:84:21)

^C[Appium] Received SIGINT - shutting down
[debug] [Appium] There are no active sessions for cleanup
➜ appium_js git:(main) ✗ npm run test-one 'Create user'

> test-one
> \_TESTING=0 mocha --timeout 300000 -retries 1 --jobs 1 ./run/test/specs/\*.spec.js -- --grep "Create user"

User
[Appium] Welcome to Appium v1.22.3
[Appium] Non-default server args:
[Appium] port: 8100
[Appium] Appium REST http interface listener started on 0.0.0.0:8100
should install app on ios
args {
hostname: '127.0.0.1',
port: '4444',
user: undefined,
pwd: undefined,
protocol: 'http:',
pathname: '/wd/hub/'
}
[Appium] Welcome to Appium v1.22.3
[Appium] Non-default server args:
[Appium] port: 8100
[HTTP] Could not start REST http interface listener. The requested port may already be in use. Please make sure there is no other instance of this server running already. 1) Create user

0 passing (94ms)
1 failing

1. User
   Create user:
   Error: listen EADDRINUSE: address already in use 0.0.0.0:8100
   at Server.setupListenHandle [as _listen2] (node:net:1372:16)
   at listenInCluster (node:net:1420:12)
   at doListen (node:net:1559:7)
   at processTicksAndRejections (node:internal/process/task_queues:84:21)

^C[Appium] Received SIGINT - shutting down
[debug] [Appium] There are no active sessions for cleanup
➜ appium_js git:(main) ✗ npm run test-one 'Create user'

> test-one
> \_TESTING=0 mocha --timeout 300000 -retries 1 --jobs 1 ./run/test/specs/\*.spec.js -- --grep "Create user"

User
[Appium] Welcome to Appium v1.22.3
[Appium] Non-default server args:
[Appium] port: 8100
[Appium] Appium REST http interface listener started on 0.0.0.0:8100
should install app on ios
args {
hostname: '127.0.0.1',
port: '4444',
user: undefined,
pwd: undefined,
protocol: 'http:',
pathname: '/wd/hub/'
}
[Appium] Welcome to Appium v1.22.3
[Appium] Non-default server args:
[Appium] port: 8100
[HTTP] Could not start REST http interface listener. The requested port may already be in use. Please make sure there is no other instance of this server running already. 1) Create user

0 passing (85ms)
1 failing

1. User
   Create user:
   Error: listen EADDRINUSE: address already in use 0.0.0.0:8100
   at Server.setupListenHandle [as _listen2] (node:net:1372:16)
   at listenInCluster (node:net:1420:12)
   at doListen (node:net:1559:7)
   at processTicksAndRejections (node:internal/process/task_queues:84:21)

^C[Appium] Received SIGINT - shutting down
[debug] [Appium] There are no active sessions for cleanup
➜ appium_js git:(main) ✗
➜ appium_js git:(main) ✗ npm run test-one 'Create user'

> test-one
> \_TESTING=0 mocha --timeout 300000 -retries 1 --jobs 1 ./run/test/specs/\*.spec.js -- --grep "Create user"

User
[Appium] Welcome to Appium v1.22.3
[Appium] Non-default server args:
[Appium] port: 8100
[Appium] Appium REST http interface listener started on 0.0.0.0:8100
should install app on ios
args {
hostname: '127.0.0.1',
port: 8100,
user: undefined,
pwd: undefined,
protocol: 'http:',
pathname: '/wd/hub/'
}
[HTTP] --> POST /wd/hub/session
[HTTP] {"desiredCapabilities":{"platformName":"iOS","platformVersion":"15.5","deviceName":"iPhone 13 Pro Max","automationName":"XCUITest","app":"/Users/emilyburton/Desktop/Session.app","bundleId":"com.loki-project.loki-messenger","autoAcceptAlerts":true,"showXcodeLog":true,"udid":"6D6ED174-EEEF-47AD-A666-4501D5965FFF"}}
[debug] [MJSONWP] Calling AppiumDriver.createSession() with args: [{"platformName":"iOS","platformVersion":"15.5","deviceName":"iPhone 13 Pro Max","automationName":"XCUITest","app":"/Users/emilyburton/Desktop/Session.app","bundleId":"com.loki-project.loki-messenger","autoAcceptAlerts":true,"showXcodeLog":true,"udid":"6D6ED174-EEEF-47AD-A666-4501D5965FFF"},null,null]
[debug] [BaseDriver] Event 'newSessionRequested' logged at 1662431778271 (12:36:18 GMT+1000 (Australian Eastern Standard Time))
[Appium] Appium v1.22.3 creating new XCUITestDriver (v3.59.0) session
[debug] [BaseDriver] Creating session with MJSONWP desired capabilities: {
[debug] [BaseDriver] "platformName": "iOS",
[debug] [BaseDriver] "platformVersion": "15.5",
[debug] [BaseDriver] "deviceName": "iPhone 13 Pro Max",
[debug] [BaseDriver] "automationName": "XCUITest",
[debug] [BaseDriver] "app": "/Users/emilyburton/Desktop/Session.app",
[debug] [BaseDriver] "bundleId": "com.loki-project.loki-messenger",
[debug] [BaseDriver] "autoAcceptAlerts": true,
[debug] [BaseDriver] "showXcodeLog": true,
[debug] [BaseDriver] "udid": "6D6ED174-EEEF-47AD-A666-4501D5965FFF"
[debug] [BaseDriver] }
[BaseDriver] Session created with session id: 360a5297-43ec-460a-a1cb-ee7d4755a3f0
[debug] [XCUITest] Current user: 'emilyburton'
[debug] [XCUITest] Available devices:
[debug] [XCUITest] No real device with udid '6D6ED174-EEEF-47AD-A666-4501D5965FFF'. Looking for simulator
[iOSSim] Constructing iOS simulator for Xcode version 13.4.1 with udid '6D6ED174-EEEF-47AD-A666-4501D5965FFF'
[XCUITest] Determining device to run tests on: udid: '6D6ED174-EEEF-47AD-A666-4501D5965FFF', real device: false
[debug] [BaseDriver] Event 'xcodeDetailsRetrieved' logged at 1662431778733 (12:36:18 GMT+1000 (Australian Eastern Standard Time))
[BaseDriver] Using local app '/Users/emilyburton/Desktop/Session.app'
[debug] [BaseDriver] Event 'appConfigured' logged at 1662431778734 (12:36:18 GMT+1000 (Australian Eastern Standard Time))
[debug] [XCUITest] Checking whether app '/Users/emilyburton/Desktop/Session.app' is actually present on file system
[debug] [XCUITest] App is present
[debug] [BaseDriver] Event 'resetStarted' logged at 1662431778735 (12:36:18 GMT+1000 (Australian Eastern Standard Time))
[debug] [simctl] Error running 'terminate': An error was encountered processing the command (domain=NSPOSIXErrorDomain, code=3):
Application termination failed.
FBSSystemService reported failure without an error, possibly because the app is not currently running.
[XCUITest] Reset: failed to terminate Simulator application with id "com.loki-project.loki-messenger"
[XCUITest] Not scrubbing third party app in anticipation of uninstall
[debug] [BaseDriver] Event 'resetComplete' logged at 1662431779012 (12:36:19 GMT+1000 (Australian Eastern Standard Time))
[WebDriverAgent] Using WDA path: '/Users/emilyburton/appium_js/node_modules/appium/node_modules/appium-webdriveragent'
[WebDriverAgent] Using WDA agent: '/Users/emilyburton/appium_js/node_modules/appium/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj'
[debug] [IOSSimulatorLog] Starting log capture for iOS Simulator with udid '6D6ED174-EEEF-47AD-A666-4501D5965FFF' using simctl
[debug] [BaseDriver] Event 'logCaptureStarted' logged at 1662431779425 (12:36:19 GMT+1000 (Australian Eastern Standard Time))
[XCUITest] Setting up simulator
[debug] [XCUITest] No reason to set locale
[debug] [XCUITest] No iOS / app preferences to set
[debug] [XCUITest] Setting did not need to be updated
[debug] [iOSSim] Setting preferences of 6D6ED174-EEEF-47AD-A666-4501D5965FFF Simulator to {"ConnectHardwareKeyboard":false}
[debug] [iOSSim] Setting common Simulator preferences to {"RotateWindowWhenSignaledByGuest":true,"ConnectHardwareKeyboard":false,"PasteboardAutomaticSync":false}
[debug] [iOSSim] Updated 6D6ED174-EEEF-47AD-A666-4501D5965FFF Simulator preferences at '/Users/emilyburton/Library/Preferences/com.apple.iphonesimulator.plist' with {"RotateWindowWhenSignaledByGuest":true,"ConnectHardwareKeyboard":false,"PasteboardAutomaticSync":false,"DevicePreferences":{"6D6ED174-EEEF-47AD-A666-4501D5965FFF":{"ConnectHardwareKeyboard":false,"SimulatorExternalDisplay":2114,"ChromeTint":"","SimulatorWindowOrientation":"Portrait","SimulatorWindowGeometry":{"69D7D0D3-8D4F-4860-B53B-DF097B7A8592":{"WindowCenter":"{1410, 509}","WindowScale":1},"5F298D3C-2C6C-4122-B5AD-FF223B260228":{"WindowCenter":"{1222, 539}","WindowScale":1},"35575D8A-DCEA-4288-954A-C0A41198BCEB":{"WindowCenter":"{3480, 651}","WindowScale":1},"4ECD36D4-037B-4695-8909-355CC0CB54DB":{"WindowCenter":"{1515, 539}","WindowScale":1}},"SimulatorWindowRotationAngle":0}}}
[debug] [iOSSim] Got Simulator UI client PID: 31839
[iOSSim] Both Simulator with UDID '6D6ED174-EEEF-47AD-A666-4501D5965FFF' and the UI client are currently running
[debug] [BaseDriver] Event 'simStarted' logged at 1662431779928 (12:36:19 GMT+1000 (Australian Eastern Standard Time))
[debug] [XCUITest] Verifying application platform
[debug] [XCUITest] CFBundleSupportedPlatforms: ["iPhoneSimulator"]
[debug] [XCUITest] Reset requested. Removing app with id 'com.loki-project.loki-messenger' from the device
[debug] [XCUITest] Installing '/Users/emilyburton/Desktop/Session.app' on Simulator with UUID '6D6ED174-EEEF-47AD-A666-4501D5965FFF'...
[debug] [WebDriverAgent] Parsed BUILD_DIR configuration value: '/Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla/Build/Products'
[debug] [WebDriverAgent] Got derived data root: '/Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla'
[debug] [XCUITest] The app has been installed successfully.
[debug] [BaseDriver] Event 'appInstalled' logged at 1662431782842 (12:36:22 GMT+1000 (Australian Eastern Standard Time))
[debug] [WebDriverAgent] No obsolete cached processes from previous WDA sessions listening on port 8100 have been found
[DevCon Factory] Requesting connection for device 6D6ED174-EEEF-47AD-A666-4501D5965FFF on local port 8100
[debug] [DevCon Factory] Cached connections count: 0
[DevCon Factory] Successfully requested the connection for 6D6ED174-EEEF-47AD-A666-4501D5965FFF:8100
[debug] [XCUITest] Starting WebDriverAgent initialization with the synchronization key 'XCUITestDriver'
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 10 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WebDriverAgent] WDA is not listening at 'http://127.0.0.1:8100/'
[debug] [WebDriverAgent] WDA is currently not running. There is nothing to cache
[debug] [XCUITest] Trying to start WebDriverAgent 2 times with 10000ms interval
[debug] [XCUITest] These values can be customized by changing wdaStartupRetries/wdaStartupRetryInterval capabilities
[debug] [BaseDriver] Event 'wdaStartAttempted' logged at 1662431783007 (12:36:23 GMT+1000 (Australian Eastern Standard Time))
[WebDriverAgent] Launching WebDriverAgent on the device
[WebDriverAgent] WebDriverAgent does not need a cleanup. The sources are up to date (1660797305073 >= 1660797305073)
[debug] [WebDriverAgent] Killing running processes 'xcodebuild.*6D6ED174-EEEF-47AD-A666-4501D5965FFF, 6D6ED174-EEEF-47AD-A666-4501D5965FFF.*XCTRunner, xctest.*6D6ED174-EEEF-47AD-A666-4501D5965FFF' for the device 6D6ED174-EEEF-47AD-A666-4501D5965FFF...
[debug] [WebDriverAgent] 'pgrep -if xcodebuild.*6D6ED174-EEEF-47AD-A666-4501D5965FFF' didn't detect any matching processes. Return code: 1
[debug] [WebDriverAgent] 'pgrep -if 6D6ED174-EEEF-47AD-A666-4501D5965FFF.*XCTRunner' didn't detect any matching processes. Return code: 1
[debug] [WebDriverAgent] 'pgrep -if xctest.*6D6ED174-EEEF-47AD-A666-4501D5965FFF' didn't detect any matching processes. Return code: 1
[debug] [WebDriverAgent] Beginning test with command 'xcodebuild build-for-testing test-without-building -project /Users/emilyburton/appium_js/node_modules/appium/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -derivedDataPath /Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla -destination id=6D6ED174-EEEF-47AD-A666-4501D5965FFF IPHONEOS_DEPLOYMENT_TARGET=15.5 GCC_TREAT_WARNINGS_AS_ERRORS=0 COMPILER_INDEX_STORE_ENABLE=NO' in directory '/Users/emilyburton/appium_js/node_modules/appium/node_modules/appium-webdriveragent'
[debug] [WebDriverAgent] Output from xcodebuild will be logged. To change this, use 'showXcodeLog' desired capability
[Xcode] 2022-09-06 12:36:23.577 xcodebuild[41270:657705] Requested but did not find extension point with identifier Xcode.IDEKit.ExtensionSentinelHostApplications for extension Xcode.DebuggerFoundation.AppExtensionHosts.watchOS of plug-in com.apple.dt.IDEWatchSupportCore
[Xcode]
[debug] [WebDriverAgent] Waiting up to 60000ms for WebDriverAgent to start
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[Xcode] 2022-09-06 12:36:23.577 xcodebuild[41270:657705] Requested but did not find extension point with identifier Xcode.IDEKit.ExtensionPointIdentifierToBundleIdentifier for extension Xcode.DebuggerFoundation.AppExtensionToBundleIdentifierMap.watchOS of plug-in com.apple.dt.IDEWatchSupportCore
[Xcode]
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 7 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[Xcode] Command line invocation:
[Xcode]  
[Xcode] /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild build-for-testing test-without-building -project /Users/emilyburton/appium_js/node_modules/appium/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -derivedDataPath /Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla -destination id=6D6ED174-EEEF-47AD-A666-4501D5965FFF IPHONEOS_DEPLOYMENT_TARGET=15.5 GCC_TREAT_WARNINGS_AS_ERRORS=0 COMPILER_INDEX_STORE_ENABLE=NO
[Xcode]
[Xcode] User defaults from command line:
[Xcode] IDEDerivedDataPathOverride = /Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla
[Xcode] IDEPackageSupportUseBuiltinSCM = YES
[Xcode]
[Xcode] Build settings from command line:
[Xcode] COMPILER_INDEX_STORE_ENABLE = NO
[Xcode] GCC_TREAT_WARNINGS_AS_ERRORS = 0
[Xcode] IPHONEOS_DEPLOYMENT_TARGET = 15.5
[Xcode]
[Xcode]
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[Xcode] note: Using new build system
[Xcode]
[Xcode] note: Planning
[Xcode]
[Xcode] Analyze workspace
[Xcode]
[Xcode]
[Xcode] Create build description
[Xcode]
[Xcode] Build description signature: d7c669cb6b27b8d7456880ec8ab94f0a
[Xcode]
[Xcode] Build description path: /Users/emilyburton/Library/Developer/Xcode/DerivedData/WebDriverAgent-augyzdcalzmowscolvutylxegkla/Build/Intermediates.noindex/XCBuildData/d7c669cb6b27b8d7456880ec8ab94f0a-desc.xcbuild
[Xcode]
[Xcode] note: Build preparation complete
[Xcode]
[Xcode] note: Building targets in dependency order
[Xcode]
[Xcode] ** TEST BUILD SUCCEEDED **
[Xcode]
[Xcode]
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[Xcode] 2022-09-06 12:36:27.777433+1000 WebDriverAgentRunner-Runner[41277:657822] Running tests...
[Xcode]
[Xcode] Test Suite 'All tests' started at 2022-09-06 12:36:27.872
[Xcode]
[Xcode] Test Suite 'WebDriverAgentRunner.xctest' started at 2022-09-06 12:36:27.874
[Xcode]
[Xcode] Test Suite 'UITestingUITests' started at 2022-09-06 12:36:27.874
[Xcode]
[Xcode] t = nans Suite Set Up
[Xcode]
[Xcode] Test Case '-[UITestingUITests testRunner]' started.
[Xcode]
[Xcode] t = 0.00s Start Test at 2022-09-06 12:36:27.917
[Xcode]
[Xcode] t = 0.01s Set Up
[Xcode]
[Xcode] 2022-09-06 12:36:27.923055+1000 WebDriverAgentRunner-Runner[41277:657822] Built at Sep 6 2022 12:22:48
[Xcode]
[Xcode] 2022-09-06 12:36:27.940233+1000 WebDriverAgentRunner-Runner[41277:657822] Failed to start web server on port 8100 with error Error Domain=com.facebook.WebDriverAgent Code=1 "Unable to start web server on port 8100" UserInfo={NSLocalizedDescription=Unable to start web server on port 8100, NSUnderlyingError=0x600001d4ad30 {Error Domain=NSPOSIXErrorDomain Code=48 "Address already in use" UserInfo={NSLocalizedDescription=Address already in use, NSLocalizedFailureReason=Error in bind() function}}}
[Xcode]
[Xcode] 2022-09-06 12:36:27.940410+1000 WebDriverAgentRunner-Runner[41277:657822] Last attempt to start web server failed with error Error Domain=com.facebook.WebDriverAgent Code=1 "Unable to start web server on port 8100" UserInfo={NSLocalizedDescription=Unable to start web server on port 8100, NSUnderlyingError=0x600001d4ad30 {Error Domain=NSPOSIXErrorDomain Code=48 "Address already in use" UserInfo={NSLocalizedDescription=Address already in use, NSLocalizedFailureReason=Error in bind() function}}}
[Xcode]
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[Xcode] 2022-09-06 12:36:28.670257+1000 WebDriverAgentRunner-Runner[41282:657993] Running tests...
[Xcode]
[Xcode]
[Xcode] Restarting after unexpected exit, crash, or test timeout in -[UITestingUITests testRunner]; summary will include totals from previous launches.
[Xcode]
[Xcode]
[Xcode] Test Suite 'Selected tests' started at 2022-09-06 12:36:29.075
[Xcode]
[Xcode] Test Suite 'WebDriverAgentRunner.xctest' started at 2022-09-06 12:36:29.077
[Xcode]
[Xcode] Test Suite 'UITestingUITests' started at 2022-09-06 12:36:29.078
[Xcode] t = nans Suite Set Up
[Xcode]
[Xcode] Test Suite 'UITestingUITests' failed at 2022-09-06 12:36:29.119.
[Xcode] Executed 1 test, with 1 failure (0 unexpected) in 0.000 (0.041) seconds
[Xcode]
[Xcode] Test Suite 'WebDriverAgentRunner.xctest' failed at 2022-09-06 12:36:29.120.
[Xcode] Executed 1 test, with 1 failure (0 unexpected) in 0.000 (0.042) seconds
[Xcode]
[Xcode] Test Suite 'Selected tests' failed at 2022-09-06 12:36:29.120.
[Xcode] Executed 1 test, with 1 failure (0 unexpected) in 0.000 (0.045) seconds
[Xcode]
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 0 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 0 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 0 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
[debug] [WD Proxy] Matched '/status' to command name 'getStatus'
[debug] [WD Proxy] Proxying [GET /status] to [GET http://127.0.0.1:8100/status] with no body
[HTTP] --> GET /status
[HTTP] {}
[debug] [HTTP] No route found for /status
[HTTP] <-- GET /status 404 1 ms - 211
[HTTP]
[WD Proxy] Got response with status 404: {"status":9,"value":{"error":"unknown command","message":"The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource","stacktrace":""}}
[debug] [W3C] Matched W3C error code 'unknown command' to UnknownCommandError
^C[Appium] Received SIGINT - shutting down¬
