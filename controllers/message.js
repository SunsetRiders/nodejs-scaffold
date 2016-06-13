var https = require('https');
var querystring = require('querystring');

exports.messageGet = function(req, res) {
  res.render('message', {
    title: 'Message'
  });
};

exports.messagePost = function(req, res) {
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/message');
  }

  var data = querystring.stringify({
    payload: "{\"text\": \"" + req.body.message + "\"}"
  });

  var options = {
    host: 'hooks.slack.com',
    path: '/services/T19S6M2UV/B1GEQPE2J/5IKa3uzymdVfGZuqFu8vCHET',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var request = https.request(options, function(response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
    });
  });

  request.write(data);
  request.end(); 

  req.flash('success', {msg: 'Thank you! Your message has been submitted.'});
  res.redirect('/message');
};
