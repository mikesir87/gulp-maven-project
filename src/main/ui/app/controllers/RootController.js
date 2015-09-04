(function() {

  angular.module("angularApp")
      .controller("RootController", RootController);

  function RootController() {
    var vm = this;
    vm.name = "Michael Irwin";
  }

})();