(function() {

  var HomeController = function($scope, currentTime, TimeService) {
    $scope.currentTime = currentTime;

    $scope.refreshTime = function() {
      TimeService.getCurrentTime().then(function(time) {
        $scope.currentTime = time;
      });
    }
  };
// this should not be copied over
  angular.module("angularApp")
      .controller("HomeController", HomeController);
})();