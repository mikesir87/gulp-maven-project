'use strict';

describe("angularApp module", function() {
  beforeEach(module('angularApp'));

  describe('RootController', function() {
    var controller, scope;

    beforeEach(inject(function(_$rootScope_, $controller, $q) {
      scope = _$rootScope_.$new();
      
      controller = $controller("RootController", { 
        $scope : scope
      });
    }));

    it('scope should have Michael Irwin as name', function() {
      expect(scope.name).toBe("Michael Irwin");
    });
    
  });
  
});
