(function() {

  angular.module("angularApp")
      .controller("HomeController", HomeController);

  function HomeController($scope, currentTime, TimeService) {
    var vm = this;
    vm.currentTime = currentTime;
    vm.refreshTime = refreshTime;

    ////////

    function refreshTime() {
      TimeService
          .getCurrentTime()
          .then(function(time) { vm.currentTime = time; });
    }
  }

})();