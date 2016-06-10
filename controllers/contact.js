var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * GET /contact
 * Shows the contact form
 * @param {obj} req Request object
 * @param {obj} res Response object
 */
exports.contactGet = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Sends email to contact
 * @param {obj} req Request object
 * @param {obj} res Response object
 * @return {route} On error redirects the user to GET /contact
 */
exports.contactPost = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('message', 'Message cannot be blank').notEmpty();
  /* eslint-disable camelcase */
  req.sanitize('email').normalizeEmail({remove_dots: false});
  /* eslint-enable camelcase */

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/contact');
  }

  var mailOptions = {
    from: req.body.name + ' <' + req.body.email + '>',
    to: 'your@email.com',
    subject: '✔ Contact Form | Mega Boilerplate',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function() {
    req.flash('success', {msg: 'Thank you! Your feedback has been submitted.'});
    res.redirect('/contact');
  });
};
