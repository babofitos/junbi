var config = require('../config.json')
  , parser = require('../lib/recent-shows-parser')
  , assert = require('assert')
  , mocha = require('mocha')
  , nock = require('nock')
  , path = require('path')

nock(config.host)
  .get(config.path)
  .replyWithFile(200, path.resolve(__dirname, 'mockhtmlresponse.html'))
describe('unit', function() {
  it('should return a list of all shows and its info', function(done) {
    parser(config.url, function(err, res) {
      assert.equal(err, null)
      assert.deepEqual(res, 
        [ { name: 'Miyakawa-ke no Kuufuku',
            season: 'Spring 13',
            airtime: 'Monday 9:00PM',
            eps: '',
            age: '43d 11h 21m ' 
          },
          { name: 'Pocket Monsters Best Wishes Season 2 Decolora Adventure Da!',
            season: 'Spring 13',
            airtime: 'Thursday 7:00PM',
            eps: '',
            age: '47d 13h 21m ' 
          } 
        ]
      )
      done()
    })
  })
})