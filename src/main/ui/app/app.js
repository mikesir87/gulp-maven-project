(function() {
  
  angular.module("angularApp", ["ui.router", "demo.todo"])
      .config(['$stateProvider', '$urlRouterProvider', uiStateConfig])
      .run(['$rootScope', errorHandler]);

  function uiStateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('root', {
          abstract : true,
          templateUrl : 'templates/root.html',
          controller : "RootController as rootCtrl"
        })
        .state('root.home', {
          url : "/",
          templateUrl : 'templates/home.html',
          controller : "HomeController as ctrl",
          resolve : {
            currentTime : /*@ngInject*/ function(TimeService) {
              return TimeService.getCurrentTime();
            }
          }
        });
  }

  function errorHandler($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.error("Something bad happened:", error.stack);
    });
  };

})();