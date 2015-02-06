(function() {
  
  var RootController = function($scope) {
    $scope.name = "Michael Irwin";
  };
  
  angular.module("angularApp")
      .controller("RootController", RootController);
})();