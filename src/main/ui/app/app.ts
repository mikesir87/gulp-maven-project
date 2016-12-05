namespace App {
  
  function uiStateConfig($stateProvider : angular.ui.IStateProvider,
                         $urlRouterProvider : angular.ui.IUrlRouterProvider) {
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
            currentTime : /*@ngInject*/ function(TimeService : TimeService) {
              return TimeService.getCurrentTime();
            }
          }
        });
  }

  function errorHandler($rootScope : angular.IScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.error("Something bad happened:", error.stack);
    });
  };

    angular.module("angularApp", ["ui.router", "demo.todo"])
        .config(['$stateProvider', '$urlRouterProvider', uiStateConfig])
        .run(['$rootScope', errorHandler]);
}