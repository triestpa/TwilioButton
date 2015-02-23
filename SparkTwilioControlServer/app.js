var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spark = require('spark');
var twilio = require('twilio');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var client = new twilio.RestClient('ACfb7b4de6de01b6b7af8e317fcbefe060', 'afc8a5425ab2844dce905e8ddc68f060');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

spark.on('login', function(err, body) {
  console.log('API call completed on Login event:', body);
});

spark.login({accessToken: 'd1f902debd706ffcfe30a6b59e4c6247b0012d6d'});

//Subscribe to global test event
spark.onEvent('make-call', function(data) {
  console.log("Making Call Now");
  client.makeCall({
        //to:'6178494627',
        //to:'3615480190',
        to:'6089218792',
        from:'+1 781-917-3133',
        url:'http://104.131.31.123:3000/twiml',
        record: "false",
        Method: "POST"
    }, function(err, call) {
        if (!err) {
            console.log('This call\'s unique ID is: ' + call.sid);
            console.log('This call was created at: ' + call.dateCreated);
        }
        else {
            console.log(error);
        }
    });
});

module.exports = app;
