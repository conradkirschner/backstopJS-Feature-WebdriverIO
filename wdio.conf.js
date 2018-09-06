/* eslint-disable no-unused-vars */

exports.config = {
  test: '',
  // =====================
  // Server Configurations
  // =====================
  // Host address of the running Selenium server. This information is usually obsolete as
  // WebdriverIO automatically connects to localhost. Also, if you are using one of the
  // supported cloud services like Sauce Labs, Browserstack, or Testing Bot you don't
  // need to define host and port information because WebdriverIO can figure that out
  // according to your user and key information. However, if you are using a private Selenium
  // backend you should define the host address, port, and path here.
  //
  hostname: 'localhost',
  port: 4444,
  path: '',
  //
  // =================
  // Service Providers
  // =================
  // WebdriverIO supports Sauce Labs, Browserstack, and Testing Bot (other cloud providers
  // should work too though). These services define specific user and key (or access key)
  // values you need to put in here in order to connect to these services.
  //

  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    'webdriverio_test/**'
  ],
  // Patterns to exclude.
  exclude: [
    'test/spec/multibrowser/**',
    'test/spec/mobile/**'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1, wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10; all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    browserName: 'chrome'
  }],
  //
  //
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'result',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: true,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: 'http://google.com',
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 1000,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  plugins: {
    'wdio-screenshot': {}

  },
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework
  // installed before running any tests.
  framework: 'jasmine',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/docs/dot-reporter.html

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd'
  },
  //
  // Options to be passed to Jasmine.
  // See also: https://github.com/webdriverio/wdio-jasmine-framework#jasminenodeopts-options
  jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 50000,
    //
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      // do something
    },
    //
    // Make use of Jasmine-specific grep functionality
    grep: null,
    invertGrep: null
  },
  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  // See also: https://github.com/webdriverio/wdio-cucumber-framework#cucumberopts-options
  cucumberOpts: {
    require: [],        // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: false,      // <boolean> fail if there are any undefined or pending steps
    tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 20000,      // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
  },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    //set viewport
    browser.setViewportSize({
      width: browser.options.viewport.width,
      height: browser.options.viewport.height
    });
    //todo add cookie loader if exist
    var viewport = JSON.parse(JSON.stringify(browser.options.viewport));
    console.log(JSON.stringify(browser.options));
    console.log("-------------");
    if(browser.options.config.isReference) {
      browser.backstopJSReferencePath = browser.options.config.paths.bitmaps_reference + '/' + browser.options.config.screenshotDateTime + '/' + browser.options.config.id + '_' + browser.options.scenarioLabelSafe + '_' + browser.options.viewport.vIndex + '_';
    }else{
      browser.backstopJSReferencePath = browser.options.config.paths.bitmaps_reference + '/' + browser.options.config.screenshotDateTime + '/' + browser.options.config.id + '_' + browser.options.scenarioLabelSafe + '_' + browser.options.viewport.vIndex + '_';
      browser.backstopJSTestPath = browser.options.config.paths.bitmaps_test + '/' + browser.options.config.screenshotDateTime + '/' + browser.options.config.id + '_' + browser.options.scenarioLabelSafe + '_' + browser.options.viewport.vIndex + '_';
    }
    console.log(browser.backstopJSTestPath);
    console.log(browser.backstopJSReferencePath);
    browser.selectorIndex = 0;
    browser.actionIndex = 0;
    //init backstopjs object

    browser.testPair = {
      "reference": "",
      "test": "",
      "selector": "te",
      "fileName": "te",
      "label": "te",
      "requireSameDimensions": true,
      "misMatchThreshold": 0.1,
      "url": "et",
      "referenceUrl": "te",
      "expect": 0,
      "viewportLabel": "te"
    };
    browser.testPairs =  [];
    browser.backstopjs = {
      "testPairs": [{
        "reference": "",
        "test": "backstop_data/bitmaps_test/20180829-191723/backstop_default_BackstopJS_Homepage_0_document_0_"+viewport.label+".png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://garris.github.io/BackstopJS/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone"
      }],
      runid:browser.options.runId
    };
  },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  beforeHook: function () {
  },
  /**
   * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
   * afterEach in Mocha)
   */
  afterHook: function () {
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest: function (test) {
  },
  //
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  beforeCommand: function (commandName, args) {
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
    //TODO Add here function to execute screenshot
    var ref_path = browser.backstopJSReferencePath + browser.options.scenario.selectors[browser.selectorIndex] + '_' + '_' + browser.selectorIndex + '_' + commandName + '_' + browser.actionIndex + '_' + browser.options.viewport.label + '.png';
    var test_path =browser.backstopJSTestPath + browser.options.scenario.selectors[browser.selectorIndex] + '_' + '_' + browser.selectorIndex + '_' + commandName + '_' + browser.actionIndex + '_' + browser.options.viewport.label + '.png';
    switch (commandName) {
      case 'url':
        console.log(JSON.stringify(browser.options));
        if(browser.options.config.isReference) {
          browser.saveViewportScreenshot(ref_path);
          browser.actionIndex++;
        }else{

          browser.saveViewportScreenshot(test_path);
          var c_testPair = JSON.parse(JSON.stringify(browser.testPair));
          c_testPair.test =test_path;
          c_testPair.reference =ref_path;
          browser.testPairs.push(c_testPair);
          browser.actionIndex++;
        }
        break;
      case 'click':
        console.log(JSON.stringify(browser.options));
        browser.saveViewportScreenshot(browser.backstopJSReferencePath+browser.options.scenario.selectors[browser.selectorIndex ]+'_'+'_'+browser.selectorIndex +'_'+commandName+'_'+browser.actionIndex+'_'+browser.options.viewport.label+'.png');
        browser.actionIndex++;

        break;
      case 'HOVER':
        browser.saveViewportScreenshot('tes123t.png');
        break;
    }
    // this is  for click / touch / key events (if enabled)
  },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
   * @param {Object} test test details
   */
  afterTest: function (test) {
    //TODO Add here function to execute screenshot
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
  },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {
    // Write results to json
    var fs = require('fs');
    fs.writeFileSync('myjsonfile1.'+browser.backstopjs.runid+'.json', JSON.stringify(browser.backstopjs), 'utf8', function () {
      console.log("saved testresults")
    });

    return result;
  },

  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: function (config, capabilities, specs) {
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onComplete: function (exitCode, config, capabilities) {
  },
  //
  // Cucumber specific hooks
  beforeFeature: function (feature) {
  },
  beforeScenario: function (scenario) {
  },
  beforeStep: function (step) {
  },
  afterStep: function (stepResult) {
  },
  afterScenario: function (scenario) {
  },
  afterFeature: function (feature) {
  }
};
