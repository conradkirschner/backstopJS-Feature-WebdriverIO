describe('my awesome website', function() {
  it('should do some chai assertions', function() {
    console.log('#'+browser.options.test);
    browser.url('http://webdriver.io');
    browser.saveViewportScreenshot('test.png');

  });
});
