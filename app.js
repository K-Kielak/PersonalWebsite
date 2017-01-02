"use strict";
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon'); //TODO dodaj favicon
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var blogDB = require('./models/blogDB')(); //TODO zmien nazwe

var index = require('./routes/index');
var blog = require('./routes/blog');

var app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(function(req, res, next){
  req.blogDB = blogDB;
  next();
});

app.use('/', index);
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(!err.status){
    err.status = 500;
    err.message = 'Unfortunately, internal server error has occured. :( <br/>'
                + 'I will be really grateful if you contact me about the details '
                + 'of this situation (my email adress: kielak.kacper@gmail.com). '
                + 'In the meantime you can go back to <a href="/">HOME</a> page or to my '
                + '<a href="/blog">BLOG</a>';
  }
  // render the error page
  res.render('indexError', {
    errStatus: err.status,
    errMessage: err.message
  });
});


module.exports = app;
