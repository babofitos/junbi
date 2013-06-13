var parser = require('../lib/recent-shows-parser')
  , config = require('../config.json')

module.exports = function(app) {
  app.get('/shows', function(req, res, next) {
    parser(config, Date.now(), function(err, resp) {
      if (err) next(err)
      res.json(resp)
    })
  })
}