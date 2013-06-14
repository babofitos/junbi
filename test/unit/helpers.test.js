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

  describe('.nextAirDate should return next air date of a show', function() {
    var now = Date.now()
      //next air date should always be todays date + 1 week from now
      , nextweek = Date.now() + 604800000

    it('should be next week from now if show aired right now', function() {
      var age = 0

      assert.equal(helpers.nextAirDate(now, age, 1), nextweek)
    })

    it('should be today if show is exactly 1 week old show', function() {
      var age = 604800000
      
      assert.equal(helpers.nextAirDate(now, age, 1), now)
    })

    it('should compensate for cached ages', function() {
      //fetched last week, and last week it was 6 days old. so it premiered on Sat Jun 1st
      var cachedAge = 518400000
        //Thur June 13 20:19:02
        , now = 1371169142663
        , fetched6DaysAgo = now - 518400000
        //its actual age is 12 days old
        , actualAge = helpers.actualAge(now, cachedAge, fetched6DaysAgo)
        , currentEp = helpers.calcCurrentEp(actualAge)
        //next airing should be Sat June 15 20:19:02 or 2 days from now
        , sat = now + 172800000

      assert.equal(helpers.nextAirDate(now, actualAge, currentEp), sat)
    })
  })
})