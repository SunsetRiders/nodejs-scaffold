var express = require('express');
// express middlewares
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
// reads a .env file in the root directory of a project
var dotenv = require('dotenv');
// Mongo DB driver - remove the comment below if you are going to use it
// var mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var ContactController = require('./controllers/contact');
var MessageController = require('./controllers/message');

var app = express();

/* remove this comment if you are going to use mongoose
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);
app.get('/contact', ContactController.contactGet);
app.post('/contact', ContactController.contactPost);

app.get('/message', MessageController.messageGet);
app.post('/message', MessageController.messagePost);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res /* , next*/) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
