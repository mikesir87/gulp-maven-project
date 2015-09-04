(function() {

  angular.module("angularApp")
      .service("TimeService", TimeService);

  function TimeService($q, $http) {
    return {
      getCurrentTime : getCurrentTime
    };

    ////////

    function getCurrentTime() {
      var deferred = $q.defer();
      $http
          .get("api/currentTime")
          .success(function(data) { deferred.resolve(data.time); });
      return deferred.promise;
    };
  }

})();