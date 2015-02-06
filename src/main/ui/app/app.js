(function() {
  
  var uiStateConfig = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
      .state('root', {
        abstract : true,
        templateUrl : 'templates/root.html',
        controller : "RootController"
      })
      .state('root.home', {
        url : "/",
        templateUrl : 'templates/home.html',
        controller : "HomeController",
        resolve : {
          currentTime : /*@ngInject*/ function(TimeService) {
            return TimeService.getCurrentTime();
          }
        }
      })
      ;
  };

  var errorHandler = function($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.error("Something bad happened:", error.stack);
    });
  };

  angular.module("angularApp", ["ui.router"])
      .config(['$stateProvider', '$urlRouterProvider', uiStateConfig])
      .run(['$rootScope', errorHandler]);
      
})();