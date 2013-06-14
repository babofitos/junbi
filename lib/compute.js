var helpers = require('./helpers')

exports.computeShowInfo = function(now, show) {
  var actualAge
    , currentEp

  //convert to japanese time
  //check for DST
  if (new Date().getTimezoneOffset() === 240) {
    now = now + 46800000
  } else {
    now = now + 43200000
  }

  actualAge = helpers.actualAge(now, show.age, show.fetchedAt)
  currentEp = helpers.calcCurrentEp(actualAge)

  return {
    name: show.name
  , season: show.season
  , currentEp: currentEp
  , eps: show.eps
  , nextAirDate: helpers.nextAirDate(now, actualAge, currentEp)
  }
}