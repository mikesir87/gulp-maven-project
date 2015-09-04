'use strict';

describe("angularApp module", function() {
  beforeEach(module('angularApp'));

  describe('HomeController', function() {
    var controller, scope, deferred;
    var currentTime = 123456789;
    var TimeService = { getCurrentTime : function() { } };

    beforeEach(inject(function($rootScope, $controller, $q) {
      scope = $rootScope.$new();
      deferred = $q.defer();
      
      controller = $controller("HomeController", { 
        $scope : scope,
        currentTime : currentTime,
        TimeService : TimeService
      });
    }));

    it('initializes correctly', function() {
      expect(controller.currentTime).toBe(currentTime);
    });
    
    it('refresh fetches a new time and updates the scope', function() {
      var newTime = 987654321;

      spyOn(TimeService, 'getCurrentTime').and.returnValue(deferred.promise);
      controller.refreshTime();
      expect(TimeService.getCurrentTime).toHaveBeenCalled();

      deferred.resolve(newTime);
      scope.$root.$digest();
      expect(controller.currentTime).toBe(newTime);
    });

  });

});
