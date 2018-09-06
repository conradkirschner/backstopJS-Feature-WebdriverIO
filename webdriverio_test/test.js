describe('my awesome website', function() {
  it('should do some chai assertions', function() {
    console.log('#'+browser.options.test);
    browser.options.test='works';
    browser.url('http://webdriver.io');
    browser.pause(500);
    //browser.url('https://google.de');

    browser.click(".btn.btn-default.dropdown-toggle");

  });
});
