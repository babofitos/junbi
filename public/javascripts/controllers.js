function ShowListCtrl($scope, $http, $timeout) {
  $http.get('/shows').success(function(data) {
    var len = data.length
      , diff
    $scope.shows = data
    function countdown(diff, data) {
      var now = Date.now()
      for (var i=0;i<len;i++) {
        diff = data[i].nextAirDate - now
        diff = diff/1000
        var sec = Math.floor(diff % 60)
        diff = diff/60
        var min = Math.floor(diff % 60)
        diff = diff/60
        var hour = Math.floor(diff % 24)
        diff = diff/24
        var day = Math.floor(diff)

        var time = day + 'd ' + hour + 'h ' + min + 'm ' + sec + 's '
        data[i].eta = time
        var removeSeconds = new Date(data[i].nextAirDate).setSeconds(0)
        data[i].nextAirDateString = new Date(removeSeconds).toString()

      }
      $timeout(function() {
        countdown(diff, data)
        $scope.shows = data
      }, 1000)
    }
    countdown(diff, data)
  })
}