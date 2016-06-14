require('./common.js');

describe('User visits the message page', function() {
  this.timeout(10000);
  it('should render ok', function(done) {
    request(server)
    .get('/message')
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      expect(res.text).to.have.match(/Call Rest API Form/);
      done();
    });
  });
});

describe('User visits the main page and clicks the Message link', function() {
  this.timeout(10000);
  const browser = new Browser();
  it('should render ok', function(done) {
    browser.visit("http://localhost:3000",
      function() {
        browser.clickLink("Send a message", function() {
          browser.assert.text('title', 'Message');
          done();
        });
      });
  });
});

describe('User visits the message page', function() {
  this.timeout(10000);
  const browser = new Browser();

  before(function(done) {
    browser.visit('/message', done);
  });

  describe('and submits form with blank values', function() {
    before(function(done) {
      browser.pressButton('Send', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should show error message', function() {
      expect(browser.html('body')).to.contain('Message cannot be blank');
    });
  });
});

describe('User visits the message page', function() {
  this.timeout(10000);
  const browser = new Browser();

  before(function(done) {
    browser.visit('/message', done);
  });

  describe('and submits form with valid values', function() {
    before(function(done) {
      browser
      .fill('message', 'test scenario for the message feature')
      .pressButton('Send', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should show success message', function() {
      expect(browser.html('body'))
      .to.contain('Your message has been submitted');
    });
  });
});
