/* global it, describe, before */
var request = require('supertest');
var server = require('../server');
var expect = require('chai').expect;
var Browser = require('zombie');

Browser.localhost('localhost', 3000);

describe('User visits the main page', function() {
  this.timeout(10000);
  it('should render ok', function(done) {
    request(server)
    .get('/')
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      expect(res.text).to.have.match(/Donec id elit non/);
      done();
    });
  });
});

describe('User visits the contact page', function() {
  this.timeout(10000);
  it('should render ok', function(done) {
    request(server)
      .get('/contact')
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      expect(res.text).to.have.match(/Contact Form/);
      done();
    });
  });
});

describe('User visits contact page', function() {
  this.timeout(10000);
  const browser = new Browser();

  before(function(done) {
    browser.visit('/contact', done);
  });

  describe('and submits form with valid values', function() {
    before(function(done) {
      browser
        .fill('name', 'test')
        .fill('email', 'test@test.com')
        .fill('message', 'test')
        .pressButton('Send', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see success message', function() {
      expect(browser.html('body'))
        .to.contain('Your feedback has been submitted');
    });
  });
});

describe('User visits contact page', function() {
  this.timeout(10000);
  const browser = new Browser();

  before(function(done) {
    browser.visit('/contact', done);
  });

  describe('and submits form with blank values', function() {
    before(function(done) {
      browser.pressButton('Send', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see error message', function() {
      expect(browser.html('body')).to.contain('Name cannot be blank');
    });
  });
});

describe('User visits contact page', function() {
  this.timeout(10000);
  const browser = new Browser();

  before(function(done) {
    browser.visit('/contact', done);
  });

  describe('and submits form with invalid values', function() {
    before(function(done) {
      browser
        .fill('name', 'test')
        .fill('email', 'testtest.com')
        .fill('message', 'test')
        .pressButton('Send', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should not see success message', function() {
      expect(browser.html('body'))
        .not.to.contain('Your feedback has been submitted');
    });
  });
});

describe('User visitis an invalid page', function() {
  this.timeout(10000);
  it('should return not found', function(done) {
    request(server)
    .get('/invalid')
    .expect(404, done);
  });
});

describe('User visits the main page and clicks the Contact link', function() {
  this.timeout(10000);
  const browser = new Browser();
  it('should render ok', function(done) {
    browser.visit("http://localhost:3000",
      function() {
        browser.clickLink("Contact", function() {
          browser.assert.text('title', 'Contact');
          done();
        });
      });
  });
});

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
