'use strict';

describe("angularApp module", function() {
  beforeEach(module('angularApp'));

  describe('RootController', function() {
    var controller;

    beforeEach(inject(function(_$rootScope_, $controller) {
      controller = $controller("RootController");
    }));

    it('scope should have Michael Irwin as name', function() {
      expect(controller.name).toBe("Michael Irwin");
    });
    
  });
  
});
