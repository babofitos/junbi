var levelup = require('levelup')
  , db = levelup('./db', {valueEncoding: 'json'})
  , parser = require('./recent-shows-parser')
  , config = require('../config.json')

exports.save = function() {
  parser(config.url, Date.now(), function(err, resp) {
    if (err) console.log('err parsing', err)
    var ws = db.createWriteStream()

    ws.on('error', function(err) {
      console.log('ws err', err)
    })

    ws.on('close', function() {
      console.log('ws stream close')
    })

    var len = resp.length

    for (var i=0;i<len;i++) {
      ws.write({
        key: resp[i].name
      , value: resp[i]
      })
    }
    ws.end()
  }) 
}

exports.all = function(cb) {
  var rs = db.createValueStream()
    , results = []

  rs.on('data', function(data) {
    results.push(data)
  })
  rs.on('error', function(err) {
    cb(err)
  })
  rs.on('end', function() {
    console.log('read stream closed')
    cb(null, results)
  })
}
