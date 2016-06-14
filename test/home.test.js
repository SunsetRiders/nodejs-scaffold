require('./common.js');

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
