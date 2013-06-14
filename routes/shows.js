var config = require('../config.json')
  , db = require('../lib/db')
  , helpers = require('../lib/helpers')

module.exports = function(app) {
  app.get('/shows', function(req, res, next) {
    //array of objects
    db.all(function(err, data) {
      if (err) next(err)
      res.json(data)
    })
  })
}