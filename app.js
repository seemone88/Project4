var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');

var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');


// view engine setup
app.set('port',(process.env.PORT || 4000));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongoose.connect
mongoose.connect('mongodb://localhost:27017/project4_db');
var db = mongoose.connection;

db.on("error",function (err) {
  console.log("DB ERROR :",err.message);
});
db.once("open",function () {
  console.log("DB connected");
});

//server
app.listen(app.get('port'),function () {
  console.log("http://127.0.0.1:"+app.get('port')+"/");
});




//passport middleware
app.use(session({secret:"test"})); //
app.use(passport.initialize()); //
app.use(passport.session()); //

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


//routes
var routes = require("./routes/index");
var users   =require("./routes/users");


app.use('/',routes);
app.use('/users', isLoggedIn, users);


//login check
var secret= require('./config/jwtsecret');
function isLoggedIn(req, res, next) {
  var openPaths = { '/users':["GET", "POST"], '/users/new':["GET"]};
  var reqPath = req._parsedUrl.pathname;
  var reqMethod = req.method;

  if( openPaths[reqPath] && openPaths[reqPath].indexOf(reqMethod) >= 0 ) return next();

  var token = req.cookies.token || req.body.token || req.param('token') || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, secret, function (err, decoded) {
      if(err){
        res.clearCookie('token');
        return res.render("login",{errmsgs:["session expired. please login again"]});
      }
      req.decoded = decoded;
      // console.log("TOKEN : ",decoded);
      next();
    });
  } else {
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
  }
}


module.exports = app;
