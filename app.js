var express = require('express')
var path = require('path')
//var favicon = require('serve-favicon') //TODO dodaj favicon
//var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var helmet = require('helmet')

// var database = require('./models/database')()

var index = require('./routes/index')
// var blog = require('./routes/blog')

var app = express()

app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
/*
app.use(function(req, res, next){
  req.database = database
  next()
})
*/
app.use('/', index)
// app.use('/blog', blog)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message
  //res.locals.error = req.app.get('env') === 'development' ? err : {}
  if(!err.status){
    err.status = 500
    err.message = 'Unfortunately, internal server error has occured. :( <br/>'
                + 'I will be really grateful if you contact me about the details '
                + 'of this situation (my email adress: kielak.kacper@gmail.com). '
                + 'In the meantime you can go back to <a href="/">HOME</a> page or to my '
                + '<a href="/blog">BLOG</a>'
  }
  // render the error page
  res.render('indexError', {
    errStatus: err.status,
    errMessage: err.message
  })
})


var debug = require('debug')('personalwebsite:server')
var http = require('http')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}
