(function() {

  var TimeService = function($q, $http) {
    this.getCurrentTime = function() {
      var deferred = $q.defer();
      $http.get("api/currentTime").success(function(data) {
        deferred.resolve(data.time);
      });
      return deferred.promise;
    };

  };

  angular.module("angularApp")
      .service("TimeService", TimeService);

})();