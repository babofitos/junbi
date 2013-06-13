var config = require('../../config.json')
  , parser = require('../../lib/recent-shows-parser')
  , assert = require('assert')
  , mocha = require('mocha')
  , nock = require('nock')
  , path = require('path')

nock(config.host)
  .get(config.path)
  .replyWithFile(200, path.resolve(__dirname, 'mockhtmlresponse.html'))
describe('parser', function() {
  it('should return a list of all shows and its info', function(done) {
    var fetchedAt = Date.now()
    parser(config.url, fetchedAt, function(err, res) {
      assert.equal(err, null)
      assert.deepEqual(res, 
        [ { name: 'Miyakawa-ke no Kuufuku',
            season: 'Spring 13',
            airtime: 75600000,
            eps: '12',
            age: 3756060000,
            fetchedAt: fetchedAt
          },
          { name: 'Pocket Monsters Best Wishes Season 2 Decolora Adventure Da!',
            season: 'Spring 13',
            airtime: 25200000,
            eps: '12',
            age: 4108860000,
            fetchedAt: fetchedAt
          } 
        ]
      )
      done()
    })
  })
})