exports.calcCurrentEp = function(age) {
  var oneWeekinMS = 604800000

  return Math.floor(age/oneWeekinMS)+1
}

//use incase of holidays or some other delay
exports.delay = function(age, weeks) {
  return age - (weeks * 604800000)
}

exports.actualAge = function(now, cachedAge, fetchedAt) {
  //since age is cached, need to add difference of time passed from cache to request
  var cachedDifference = now - fetchedAt
  return cachedAge + cachedDifference
}

exports.nextAirDate = function(now, age, currentEp) {
  var week = 604800000
    //get the first airing date
    , premierDate = now - age
    , currentEp = currentEp

  return premierDate + (currentEp * week)
}

  