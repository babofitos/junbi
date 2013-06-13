exports.calcCurrentEp = function(age) {
  var oneWeekinMS = 604800000

  return Math.floor(age/oneWeekinMS)+1
}

//use incase of holidays or some other delay
exports.delay = function(age, weeks) {
  return age - (weeks * 604800000)
}

exports.nextAirDate = function(now, age, fetchedAt) {
  var week = 604800000
    //since age is cached, need to add difference of time passed from cache to request
    , cachedDifference = fetchedAt ? now - fetchedAt : 0
    //if it was cached, then age given was wrong, so calculate correct age
    , actualAge = age+cachedDifference
    //get the first airing date
    , premierDate = now - actualAge

  return premierDate + actualAge + week
}