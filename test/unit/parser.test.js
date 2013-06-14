var config = require('../../config.json')
  , parser = require('../../lib/recent-shows-parser')
  , assert = require('assert')
  , mocha = require('mocha')
  , nock = require('nock')
  , path = require('path')
  , helpers = require('../../lib/helpers')

nock(config.host)
  .get(config.path)
  .replyWithFile(200, path.resolve(__dirname, 'mockhtmlresponse.html'))
  
describe('parser', function() {
  it('should return a list of all shows and its info', function(done) {
    var now = 1371176769544
      , resultsnow = now

    if (new Date().getTimezoneOffset() === 240) {
      resultsnow = resultsnow + 46800000
    } else {
      resultsnow = resultsnow + 43200000
    }

    parser(config.url, now, function(err, res) {
      assert.equal(err, null)
      assert.deepEqual(res, 
        [ { name: 'Miyakawa-ke no Kuufuku',
            season: 'Spring 13',
            currentEp: 7,
            eps: '12',
            nextAirDate: helpers.nextAirDate(resultsnow, 3802860000, 7)
          },
          { name: 'Pocket Monsters Best Wishes Season 2 Decolora Adventure Da!',
            season: 'Spring 13',
            currentEp: 7,
            eps: '12',
            nextAirDate: helpers.nextAirDate(resultsnow, 4155660000, 7)
          } 
        ]
      )
      done()
    })
  })
})