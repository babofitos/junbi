var assert = require('assert')
  , mocha = require('mocha')
  , helpers = require('../../lib/helpers')

describe('helpers', function() {
  describe('.calcCurrentEp should give this week\'s episode number', function() {
    it('should calculate < 1 week old show', function() {
      var age = 0
      assert.equal(helpers.calcCurrentEp(age), 1)
    })
    it('should calculate < 1 week old show', function() {
      var age = 10
      assert.equal(helpers.calcCurrentEp(age), 1)
    })
    it('should calculate == 1 week old show', function() {
      var age = 604800000
      assert.equal(helpers.calcCurrentEp(age), 2)
    })
    it('should calculate < 2 week old show', function() {
      var age = 1209599999
      assert.equal(helpers.calcCurrentEp(age), 2)
    })
  })

  describe('.delay should return x weeks in ms earlier from age', function() {
    it('should delay episode by 1 week', function() {
      var age = 604800000
        , delayed = helpers.delay(age, 1)

      assert.equal(delayed, 0)
    })
    it('should delay episode by 2 weeks', function() {
      var age = 604800000
        , delayed = helpers.delay(age, 2)

      assert.equal(delayed, -604800000)
    })
  })

  describe('.nextAirDate should always calculate a show 1 week from now', function() {
    var now = Date.now()
      //next air date should always be todays date + 1 week from now
      , nextweek = Date.now() + 604800000

    it('should calculate 0 week old show', function() {
      var age = 0

      assert.equal(helpers.nextAirDate(now, age, 0), nextweek)
    })

    it('should calculate a 1 week show', function() {
      var age = 604800000
      
      assert.equal(helpers.nextAirDate(now, age, 0), nextweek)
    })

    it("should calculate a cached 0 week old show that is currently 1 week old", function() {
      var cachedAge = 0
        , fetchedOneWeekAgo = now - 604800000

      assert.equal(helpers.nextAirDate(now, cachedAge, fetchedOneWeekAgo), nextweek)
    })

    it('should calculate a cached 0 week old show that is currently 1 day old', function() {
      var cachedAge = 86400000
        , fetched1DayAgo = now - 86400000

      assert.equal(helpers.nextAirDate(now, cachedAge, fetched1DayAgo), nextweek)
    })

    it('should calculate a cached 6 day old show that is currently 1 week old', function() {
      var cachedAge = 518400000
        , fetched6DaysAgo = now - 518400000

      assert.equal(helpers.nextAirDate(now, cachedAge, fetched6DaysAgo), nextweek)
    })
  })
})