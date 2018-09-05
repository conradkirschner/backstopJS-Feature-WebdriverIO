describe('my awesome website', function() {
  it('should do some chai assertions', function() {
    console.log('#'+browser.options.test);
    browser.options.test='works';
    browser.url('http://webdriver.io');
  //browser.click();

  });
});
