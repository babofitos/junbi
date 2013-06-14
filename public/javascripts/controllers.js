function ShowListCtrl($scope, $http) {
  $http.get('/shows').success(function(data) {
    $scope.shows = data
  })
}