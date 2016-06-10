/**
 * GET /
 * Shows the home page
 * @param {obj} req Request object
 * @param {obj} res Response object
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};
