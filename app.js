
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , db = require('./lib/db')
  , cronJob = require('cron').CronJob

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.limit('20kb'))
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(err, req, res, next) {
    if (err) res.send(500, 'Something went wrong')
  })
  app.use(function(req, res) {
    res.send(404, 'Page Not Found')
  })
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index)
require('./routes/shows')(app)

//weekly parsing
var fetchShows = new cronJob('00 00 00 * * 0-6', function() {
  db.save()
}, null, false).start()

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
