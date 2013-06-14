var compute = require('../../lib/compute')
  , mocha = require('mocha')
  , assert = require('assert')
  , helpers = require('../../lib/helpers')

describe('compute', function() {
  describe('.computeShowInfo', function() {
    it('should return correct info about a show', function() {
      var now = 1371176769544
      var show = {
        name: 'Chinese Cartoon'
      , season: 'Spring 2013'
      , airtime: 25200000
      , eps: '12'
      , age: 0
      , fetchedAt: now
      }
      var deetz = compute.computeShowInfo(now, show)
      assert.deepEqual(deetz, {
        name: show.name
      , season: show.season
      , currentEp: 1
      , eps: show.eps
      , nextAirDate: now+604800000
      })
    })

    it('should put empty episodes as unknown', function() {
      var now = 1371176769544
      var show = {
        name: 'Chinese Cartoon'
      , season: 'Spring 2013'
      , airtime: 25200000
      , eps: ''
      , age: 0
      , fetchedAt: now
      }
      var deetz = compute.computeShowInfo(now, show)
      assert.equal(deetz.eps, 'Unknown')
    })
  })
})
