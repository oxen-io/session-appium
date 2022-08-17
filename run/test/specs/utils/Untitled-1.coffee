  mocha:cli:options no config found in /Users/emilyburton/appium_js/package.json +0ms
  mocha:cli:mocha loaded opts {
  _: [
    './run/test/specs/change_avatar.spec.js',
    './run/test/specs/change_username.spec.js',
    './run/test/specs/create_contact.spec.js',
    './run/test/specs/create_user.spec.js',
    './run/test/specs/experiment.spec.js',
    './run/test/specs/unsend_message.spec.js'
  ],
  grep: 'plop',
  timeout: '300000',
  jobs: 1,
  config: false,
  package: false,
  diff: true,
  extension: [ 'js', 'cjs', 'mjs' ],
  reporter: 'spec',
  slow: 75,
  ui: 'bdd',
  'watch-ignore': [ 'node_modules', '.git' ]
} +0ms
  mocha:cli:mocha running Mocha in-process +2ms
  mocha:cli:cli entered main with raw args [] +0ms
  mocha:plugin-loader registered plugin def "mochaHooks" +0ms
  mocha:plugin-loader registered plugin def "mochaGlobalSetup" +0ms
  mocha:plugin-loader registered plugin def "mochaGlobalTeardown" +0ms
  mocha:plugin-loader registered 3 plugin defs (0 ignored) +0ms
  mocha:plugin-loader finalized plugins: [Object: null prototype] {} +25ms
  mocha:cli:run post-yargs config {
  package: [Getter/Setter],
  _: [],
  grep: 'plop',
  timeout: '300000',
  jobs: 1,
  config: false,
  diff: true,
  extension: [ 'js', 'cjs', 'mjs' ],
  reporter: 'spec',
  slow: 75,
  ui: 'bdd',
  'watch-ignore': [ 'node_modules', '.git' ],
  watchIgnore: [ 'node_modules', '.git' ],
  spec: [
    './run/test/specs/change_avatar.spec.js',
    './run/test/specs/change_username.spec.js',
    './run/test/specs/create_contact.spec.js',
    './run/test/specs/create_user.spec.js',
    './run/test/specs/experiment.spec.js',
    './run/test/specs/unsend_message.spec.js'
  ],
  '$0': 'mocha'
} +0ms
  mocha:suite slow 75 +0ms
  mocha:suite timeout 300000 +1ms
  mocha:mocha configured 0 global setup functions +0ms
  mocha:mocha configured 0 global teardown functions +0ms
  mocha:cli:run:helpers test files (in order):  [
  '/Users/emilyburton/appium_js/run/test/specs/change_avatar.spec.js',
  '/Users/emilyburton/appium_js/run/test/specs/change_username.spec.js',
  '/Users/emilyburton/appium_js/run/test/specs/create_contact.spec.js',
  '/Users/emilyburton/appium_js/run/test/specs/create_user.spec.js',
  '/Users/emilyburton/appium_js/run/test/specs/experiment.spec.js',
  '/Users/emilyburton/appium_js/run/test/specs/unsend_message.spec.js'
] +0ms
  mocha:cli:run:helpers single run with 6 file(s) +0ms
  mocha:mocha set lazy load to true +1ms
  mocha:suite timeout 300000 +731ms
  mocha:suite retries -1 +0ms
  mocha:suite slow 75 +0ms
  mocha:suite bail false +1ms
  mocha:runnable timeout 300000 +0ms
  mocha:runnable slow 75 +0ms
  mocha:suite timeout 300000 +2ms
  mocha:suite retries -1 +0ms
  mocha:suite slow 75 +0ms
  mocha:suite bail false +1ms
  mocha:runnable timeout 300000 +3ms
  mocha:runnable slow 75 +0ms
  mocha:suite timeout 300000 +1ms
  mocha:suite retries -1 +0ms
  mocha:suite slow 75 +0ms
  mocha:suite bail false +0ms
  mocha:runnable timeout 300000 +1ms
  mocha:runnable slow 75 +0ms
  mocha:suite timeout 300000 +1ms
  mocha:suite retries -1 +0ms
  mocha:suite slow 75 +0ms
  mocha:suite bail false +0ms
  mocha:runnable timeout 300000 +1ms
  mocha:runnable slow 75 +0ms
  mocha:suite timeout 300000 +1ms
  mocha:suite retries -1 +0ms
  mocha:suite slow 75 +0ms
  mocha:suite bail false +0ms
  mocha:runnable timeout 300000 +2ms
  mocha:runnable slow 75 +0ms
  mocha:runner grep(): setting to /.*/ +0ms
  mocha:runner globals(): setting to [
  mocha:runner   'global',             'clearInterval',
  mocha:runner   'clearTimeout',       'setInterval',
  mocha:runner   'setTimeout',         'queueMicrotask',
  mocha:runner   'performance',        'clearImmediate',
  mocha:runner   'setImmediate',       'before',
  mocha:runner   'after',              'beforeEach',
  mocha:runner   'afterEach',          'run',
  mocha:runner   'context',            'describe',
  mocha:runner   'xcontext',           'xdescribe',
  mocha:runner   'specify',            'it',
  mocha:runner   'xspecify',           'xit',
  mocha:runner   'regeneratorRuntime', '_global_npmlog',
  mocha:runner   'XMLHttpRequest',     'Date'
  mocha:runner ] +1ms
  mocha:runner grep(): setting to /plop/ +1ms
  mocha:runner globals(): setting to [] +0ms
  mocha:runner run(): got options: {
  mocha:runner   diff: true,
  mocha:runner   extension: [ 'js', 'cjs', 'mjs' ],
  mocha:runner   package: false,
  mocha:runner   reporter: 'spec',
  mocha:runner   slow: 75,
  mocha:runner   timeout: '300000',
  mocha:runner   ui: 'bdd',
  mocha:runner   'watch-ignore': [ 'node_modules', '.git' ],
  mocha:runner   _: [],
  mocha:runner   grep: /plop/,
  mocha:runner   jobs: 1,
  mocha:runner   config: false,
  mocha:runner   watchIgnore: [ 'node_modules', '.git' ],
  mocha:runner   spec: [
  mocha:runner     './run/test/specs/change_avatar.spec.js',
  mocha:runner     './run/test/specs/change_username.spec.js',
  mocha:runner     './run/test/specs/create_contact.spec.js',
  mocha:runner     './run/test/specs/create_user.spec.js',
  mocha:runner     './run/test/specs/experiment.spec.js',
  mocha:runner     './run/test/specs/unsend_message.spec.js'
  mocha:runner   ],
  mocha:runner   '$0': 'mocha',
  mocha:runner   reporterOption: undefined,
  mocha:runner   reporterOptions: undefined,
  mocha:runner   global: [],
  mocha:runner   globalSetup: [],
  mocha:runner   globalTeardown: [],
  mocha:runner   enableGlobalSetup: true,
  mocha:runner   enableGlobalTeardown: true,
  mocha:runner   files: [
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/change_avatar.spec.js',
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/change_username.spec.js',
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/create_contact.spec.js',
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/create_user.spec.js',
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/experiment.spec.js',
  mocha:runner     '/Users/emilyburton/appium_js/run/test/specs/unsend_message.spec.js'
  mocha:runner   ]
  mocha:runner } +1ms
  mocha:runner trying to remove listener for untracked object process {
  version: 'v16.16.0',
  versions: [Object],
  arch: 'x64',
  platform: 'darwin',
  release: [Object],
  _rawDebug: [Function: _rawDebug],
  moduleLoadList: [Array],
  binding: [Function: binding],
  _linkedBinding: [Function: _linkedBinding],
  _events: [Object: null prototype],
  _eventsCount: 18,
  _maxListeners: undefined,
  domain: null,
  _exiting: false,
  config: [Getter/Setter],
  dlopen: [Function: dlopen],
  uptime: [Function: uptime],
  _getActiveRequests: [Function: _getActiveRequests],
  _getActiveHandles: [Function: _getActiveHandles],
  getActiveResourcesInfo: [Function (anonymous)],
  reallyExit: [Function: processReallyExit],
  _kill: [Function: _kill],
  cpuUsage: [Function: cpuUsage],
  resourceUsage: [Function: resourceUsage],
  memoryUsage: [Function],
  kill: [Function: kill],
  exit: [Function: exit],
  hrtime: [Function],
  openStdin: [Function (anonymous)],
  getuid: [Function: getuid],
  geteuid: [Function: geteuid],
  getgid: [Function: getgid],
  getegid: [Function: getegid],
  getgroups: [Function: getgroups],
  allowedNodeEnvironmentFlags: [NodeEnvironmentFlagsSet [Set]],
  assert: [Function: deprecated],
  features: [Object],
  _fatalException: [Function (anonymous)],
  setUncaughtExceptionCaptureCallback: [Function: setUncaughtExceptionCaptureCallback],
  hasUncaughtExceptionCaptureCallback: [Function: hasUncaughtExceptionCaptureCallback],
  emitWarning: [Function: emitWarning],
  nextTick: [Function: nextTick],
  _tickCallback: [Function: runNextTicks],
  _debugProcess: [Function: _debugProcess],
  _debugEnd: [Function: _debugEnd],
  _startProfilerIdleNotifier: [Function (anonymous)],
  _stopProfilerIdleNotifier: [Function (anonymous)],
  stdout: [Getter],
  stdin: [Getter],
  stderr: [Getter],
  abort: [Function: abort],
  umask: [Function: wrappedUmask],
  chdir: [Function (anonymous)],
  cwd: [Function (anonymous)],
  initgroups: [Function: initgroups],
  setgroups: [Function: setgroups],
  setegid: [Function (anonymous)],
  seteuid: [Function (anonymous)],
  setgid: [Function (anonymous)],
  setuid: [Function (anonymous)],
  env: [Object],
  title: 'node',
  argv: [Array],
  execArgv: [],
  pid: 48516,
  ppid: 48514,
  execPath: '/Users/emilyburton/.nvm/versions/node/v16.16.0/bin/node',
  debugPort: 9229,
  argv0: 'node',
  _preload_modules: [],
  report: [Getter],
  setSourceMapsEnabled: [Function: setSourceMapsEnabled],
  mainModule: [Module],
  emit: [Function: processEmit],
  __signal_exit_emitter__: [EventEmitter],
  [Symbol(kCapture)]: false
} +0ms
  mocha:runner trying to remove listener for untracked object process {
  version: 'v16.16.0',
  versions: [Object],
  arch: 'x64',
  platform: 'darwin',
  release: [Object],
  _rawDebug: [Function: _rawDebug],
  moduleLoadList: [Array],
  binding: [Function: binding],
  _linkedBinding: [Function: _linkedBinding],
  _events: [Object: null prototype],
  _eventsCount: 18,
  _maxListeners: undefined,
  domain: null,
  _exiting: false,
  config: [Getter/Setter],
  dlopen: [Function: dlopen],
  uptime: [Function: uptime],
  _getActiveRequests: [Function: _getActiveRequests],
  _getActiveHandles: [Function: _getActiveHandles],
  getActiveResourcesInfo: [Function (anonymous)],
  reallyExit: [Function: processReallyExit],
  _kill: [Function: _kill],
  cpuUsage: [Function: cpuUsage],
  resourceUsage: [Function: resourceUsage],
  memoryUsage: [Function],
  kill: [Function: kill],
  exit: [Function: exit],
  hrtime: [Function],
  openStdin: [Function (anonymous)],
  getuid: [Function: getuid],
  geteuid: [Function: geteuid],
  getgid: [Function: getgid],
  getegid: [Function: getegid],
  getgroups: [Function: getgroups],
  allowedNodeEnvironmentFlags: [NodeEnvironmentFlagsSet [Set]],
  assert: [Function: deprecated],
  features: [Object],
  _fatalException: [Function (anonymous)],
  setUncaughtExceptionCaptureCallback: [Function: setUncaughtExceptionCaptureCallback],
  hasUncaughtExceptionCaptureCallback: [Function: hasUncaughtExceptionCaptureCallback],
  emitWarning: [Function: emitWarning],
  nextTick: [Function: nextTick],
  _tickCallback: [Function: runNextTicks],
  _debugProcess: [Function: _debugProcess],
  _debugEnd: [Function: _debugEnd],
  _startProfilerIdleNotifier: [Function (anonymous)],
  _stopProfilerIdleNotifier: [Function (anonymous)],
  stdout: [Getter],
  stdin: [Getter],
  stderr: [Getter],
  abort: [Function: abort],
  umask: [Function: wrappedUmask],
  chdir: [Function (anonymous)],
  cwd: [Function (anonymous)],
  initgroups: [Function: initgroups],
  setgroups: [Function: setgroups],
  setegid: [Function (anonymous)],
  seteuid: [Function (anonymous)],
  setgid: [Function (anonymous)],
  setuid: [Function (anonymous)],
  env: [Object],
  title: 'node',
  argv: [Array],
  execArgv: [],
  pid: 48516,
  ppid: 48514,
  execPath: '/Users/emilyburton/.nvm/versions/node/v16.16.0/bin/node',
  debugPort: 9229,
  argv0: 'node',
  _preload_modules: [],
  report: [Getter],
  setSourceMapsEnabled: [Function: setSourceMapsEnabled],
  mainModule: [Module],
  emit: [Function: processEmit],
  __signal_exit_emitter__: [EventEmitter],
  [Symbol(kCapture)]: false
} +2ms
  mocha:runner _addEventListener(): adding for event uncaughtException; 0 current listeners +1ms
  mocha:runner _addEventListener(): adding for event unhandledRejection; 0 current listeners +0ms
  mocha:runner run(): starting +1ms
  mocha:runner run(): emitting start +0ms
  mocha:runner run(): emitted start +0ms
  mocha:runner runSuite(): running  +1ms
  mocha:runner runSuite(): bailing +0ms
  mocha:runner run(): root suite completed; emitting end +0ms
  mocha:runner run(): emitted end +0ms