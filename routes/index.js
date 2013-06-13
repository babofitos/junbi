
/*
 * GET home page.
 */
var parser = require('../lib/recent-shows-parser')
  , config = require('../config.json')

exports.index = function(req, res){
  res.render('index');
};