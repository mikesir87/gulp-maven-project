(function() {

  angular.module("angularApp")
      .controller("HomeController", HomeController);

  function HomeController(currentTime, TimeService, $timeout) {
    var vm = this;
    vm.currentTime = currentTime;
    vm.refreshTime = refreshTime;

    ////////

    function refreshTime() {
      vm.fetching = true;
      $timeout(function() {
        TimeService
            .getCurrentTime()
            .then(function(time) {
              vm.fetching = false;
              vm.currentTime = time;
            });
      }, 500);
    }
  }

})();