/*
ENGINE
WEBDRIVER IO
VERSION 0.1
 */
var webdriverio = require('webdriverio');
var Launcher = require('webdriverio').Launcher;


const writeFileSync = require('fs').writeFileSync;
const fs = require('./fs');
const path = require('path');
const ensureDirectoryPath = require('./ensureDirectoryPath');
const engineTools = require('./engineTools'); //needed for security reason! #0001

const TEST_TIMEOUT = 30000;
const DEFAULT_FILENAME_TEMPLATE = '{configId}_{scenarioLabel}_{selectorIndex}_{selectorLabel}_{viewportIndex}_{viewportLabel}';
const DEFAULT_BITMAPS_TEST_DIR = 'bitmaps_test';
const DEFAULT_BITMAPS_REFERENCE_DIR = 'bitmaps_reference';
const SELECTOR_NOT_FOUND_PATH = '/capture/resources/notFound.png';
const HIDDEN_SELECTOR_PATH = '/capture/resources/notVisible.png';
const BODY_SELECTOR = 'body';
const DOCUMENT_SELECTOR = 'document';
const NOCLIP_SELECTOR = 'body:noclip';
const VIEWPORT_SELECTOR = 'viewport';

const injectBackstopTools = require('../../capture/backstopTools.js');
const BackstopException = require('../util/BackstopException.js');

module.exports = function (args) {
  const scenario = args.scenario;
  const viewport = args.viewport;
  const config = args.config;
  const runId = args.id;
  const assignedPort = args.assignedPort;
  const scenarioLabelSafe = engineTools.makeSafe(scenario.label); //#0001
  const variantOrScenarioLabelSafe = scenario._parent ? engineTools.makeSafe(scenario._parent.label) : scenarioLabelSafe; //#0001
  console.log("test --- ");
  return processScenarioView(scenario, variantOrScenarioLabelSafe, scenarioLabelSafe, viewport, config, runId, assignedPort);
};

/**
 * [processScenarioView description]
 * @param  {[type]} scenario               [description]
 * @param  {[type]} variantOrScenarioLabelSafe [description]
 * @param  {[type]} scenarioLabelSafe          [description]
 * @param  {[type]} viewport               [description]
 * @param  {[type]} config                 [description]
 * @return {[type]}                        [description]
 */
function processScenarioView(scenario, variantOrScenarioLabelSafe, scenarioLabelSafe, viewport, config, runId, assignedPort) {
  /**
   *  =============
   *  WebdriverIO options
   *  =============
   */
  var options = {desiredCapabilities: {browserName: 'chrome'},scenario:scenario,variantOrScenarioLabelSafe:variantOrScenarioLabelSafe,scenarioLabelSafe:scenarioLabelSafe,viewport:viewport,config:config,runId:runId,assignedPort:assignedPort}; //required
  config.runId =runId;
  /**
   *  =============
   *  Path Empty fallback
   *  =============
   */
  console.log('#####123##############');

  if (!config.paths) {
    options.config.paths = {};
  }

  /**
   *  =============
   *  Map Label
   *  =============
   */

  if (typeof viewport.label !== 'string') {
    options.viewport.label = viewport.name || '';
  }

  const isReference = config.isReference;
  /**
   *  =============
   *  Map Viewport
   *  =============
   */
  const VP_W = viewport.width || viewport.viewport.width;
  const VP_H = viewport.height || viewport.viewport.height;

  // const PORT = (config.startingPort || CHROMY_STARTING_PORT_NUMBER) + runId;
  const PORT = assignedPort;
  /**
   *  =============
   *  Required options
   *  =============
   */

  let defaultOptions = {};

  /**
   *  =============
   *  Create Options Object
   *  =============
   */

  /**
   *  =============
   *  Set custom run Properties
   *  =============
   */


  /**
   *  =============
   *  set Default Screensize
   *  =============
   */


  console.log('Starting WebdriverIO:');
  /**
   *  =============
   *  Browser Starts
   *  =============
   */

  /**
   * =================
   * CLI BEHAVIORS
   * =================
   */

  if (isReference) {
    console.log('CREATING NEW REFERENCE FILES');
  }

  // // verbose console errors
  // if (config.debug) {
  //   console.log('Debug is enabled!');
  //   casper.on('page.error', function (msg, trace) {
  //     this.echo('Remote Error >    ' + msg, 'error');
  //     this.echo('file:     ' + trace[0].file, 'WARNING');
  //     this.echo('line:     ' + trace[0].line, 'WARNING');
  //     this.echo('function: ' + trace[0]['function'], 'WARNING');
  //   });
  // }

  // // verbose resource monitoring
  // casper.on('resource.received', function (resource) {
  //   var status = resource.status;
  //   if (status >= 400) {
  //     casper.log('remote error > ' + resource.url + ' failed to load (' + status + ')', 'error');
  //   }
  // });

  /**
   *  =============
   *  TEST UTILS
   *  =============
   */

  // --- set up console output ---
  /*
   chromy.console(function (text, consoleObj) {
      if (console[consoleObj.level]) {
        console[consoleObj.level](PORT + ' ' + (consoleObj.level).toUpperCase() + ' > ', text);
      }
    });
    */


  /**
   *  =============
   *  IMPLEMENT TEST CONFIGS
   *  =============
   */

  // --- BEFORE SCRIPT ---
  /* ============
    onBeforeScript files should export a module like so:

    module.exports = function(renderer, scenario, vp) {
    };
  ============ */
  var onBeforeScript = scenario.onBeforeScript || config.onBeforeScript;
  if (onBeforeScript) {
    //TODO
  }

  // // --- SIMPLE AUTH ---
  // if (casper.cli.options.user && casper.cli.options.password) {
  //   console.log('Auth User via CLI: ' + casper.cli.options.user);
  //   casper.setHttpAuth(casper.cli.options.user, casper.cli.options.password);
  // }

  //  --- OPEN URL ---
  var url = scenario.url;
  if (isReference && scenario.referenceUrl) {
    url = scenario.referenceUrl;
  }
  //TODO openURL


  //  --- WAIT FOR READY EVENT ---
  var readyEvent = scenario.readyEvent || config.readyEvent;
  if (readyEvent) {
    //TODO
  }

  // --- WAIT FOR SELECTOR ---
  // chromy.wait(scenario.readySelector || 0);

  // --- DELAY ---
  //TODO

  //  --- OPTION DEBUG TO CONSOLE ---
  if (config.debug) {
    //TODO
  }

  // --- REMOVE SELECTORS ---
  if (scenario.hasOwnProperty('removeSelectors')) {
    // TODO
  }

  //  --- ON READY SCRIPT ---
  /* ============
    onReadyScript files should export a module like so:

    module.exports = function(renderer, scenario, vp, isReference) {
      // run custom renderer (casper or chromy) code
    };
  ============ */
  var onReadyScript = scenario.onReadyScript || config.onReadyScript;
  if (onReadyScript) {
    //TODO
  }

  // reinstall tools in case onReadyScript has loaded a new URL.
  // injectBackstopTools(chromy);

  // --- HIDE SELECTORS ---
  if (scenario.hasOwnProperty('hideSelectors')) {
    scenario.hideSelectors.forEach(function (selector) {

    });
  }
  // CREATE SCREEN SHOTS AND TEST COMPARE CONFIGURATION (CONFIG FILE WILL BE SAVED WHEN THIS PROCESS RETURNS)
  // this.echo('Capturing screenshots for ' + makeSafe(vp.name) + ' (' + (vp.width || vp.viewport.width) + 'x' + (vp.height || vp.viewport.height) + ')', 'info');

  // --- HANDLE NO-SELECTORS ---
  if (!scenario.hasOwnProperty('selectors') || !scenario.selectors.length) {
    scenario.selectors = [DOCUMENT_SELECTOR];
  }
  /*
  Load here settings from backstop.json and port them to a wdio.conf.js
  Or
  use custom wdio.conf.js file
   */
  var wdio = new Launcher("./wdio.conf.js", options);

  /*
  *
  * TODO find a better way than a json file to comunicate
  *
  * */
  return wdio.run().then((e) => {
    console.log('JSON ', JSON.stringify(e));
    return new Promise((resolve, reject) => {
      resolve(delegateSelectors(
        null,
        scenario,
        viewport,
        variantOrScenarioLabelSafe,
        scenarioLabelSafe,
        config,
        "",
        ""
      ));
    })
  });
}

// vvv HELPERS vvv
/**
 * [delegateSelectors description]
 * @param  {[type]} chromy                     [description]
 * @param  {[type]} scenario                   [description]
 * @param  {[type]} viewport                   [description]
 * @param  {[type]} variantOrScenarioLabelSafe [description]
 * @param  {[type]} config                     [description]
 * @return {[type]}                            [description]
 */
function delegateSelectors(chromy, scenario, viewport, variantOrScenarioLabelSafe, scenarioLabelSafe, config, selectors, selectorMap) {


  const fileNameTemplate = config.fileNameTemplate || DEFAULT_FILENAME_TEMPLATE;
  const configId = config.id || engineTools.genHash(config.backstopConfigFileName); //#0001
  const bitmapsTestPath = config.paths.bitmaps_test || DEFAULT_BITMAPS_TEST_DIR;
  const bitmapsReferencePath = config.paths.bitmaps_reference || DEFAULT_BITMAPS_REFERENCE_DIR;
  const outputFileFormatSuffix = '.' + (config.outputFormat && config.outputFormat.match(/jpg|jpeg/) || 'png');

  let compareConfig = {testPairs: []};
  let captureDocument = false;
  let captureViewport = false;
  let captureList = [];
  let captureJobs = [];


  // TODO: push captureViewport into captureList (instead of calling captureScreenshot()) to improve perf.
  if (captureViewport) {
    captureJobs.push(function () {
      console.log("finished2")
    });
  }
  if (captureList.length) {
    captureJobs.push(function () {
      console.log("finished3")
    });
  }

  return new Promise(function (resolve, reject) {

    var job = null;
    var errors = [];
    var next = function () {
      if (captureJobs.length === 0) {
        if (errors.length === 0) {

          resolve();
        } else {
          reject(errors);
        }
        return;
      }
      job = captureJobs.shift();
      job.apply().catch(function (e) {
        errors.push(e);
      }).then(function () {
        next();
      });
    };
    next();
  }).then(function () {
    /**
     *  =============
     *  Close Browser if needed
     *  =============
     */
  }).catch(function (err) {
    /**
     *  =============
     *  resolve dev error logs
     *  =============
     */
  }).then(_ => {
    /*
    TODO Add return json

    {
      testPairs:
      [
        {
          reference,
          test,
          selector,
          fileName,
          label,
          requireSameDimensions,
          missMatchThreshold,
          url,
          referenceUrl,
          expect,
          viewportLabel
         }
      ]
    }
     */
    var json = require('./../../myjsonfile1.'+config.runId+'.json');
   // fs.unlink('./myjsonfile1.'+config.runId+'.json');
    console.log(JSON.stringify(json));
    console.log('JSON.stringify(json)');
    return json;
  });
}

/**
 * [captureScreenshot description]
 * @param  {[type]} chromy   [description]
 * @param  {[type]} filePath [description]
 * @param  {[type]} selector [description]
 * @param  {[type]} config   [description]
 * @return {[type]}          [description]
 */

/**
 * [FileGetter]
 * @param  TODO add param
 */
function getCurrentFileSet() {
  var cleanedSelectorName = o.replace(/[^a-z0-9_-]/gi, ''); // remove anything that's not a letter or a number
  var fileName = getFilename(scenario.sIndex, scenarioOrVariantLabel, i, cleanedSelectorName, viewportIndex, vp.label);
  var referenceFilePath = bitmapsReferencePath + '/' + getFilename(scenario.sIndex, scenarioLabel, i, cleanedSelectorName, viewportIndex, vp.label);
  var testFilePath = bitmapsTestPath + '/' + screenshotDateTime + '/' + fileName;
  var filePath = (isReference) ? referenceFilePath : testFilePath;
}
