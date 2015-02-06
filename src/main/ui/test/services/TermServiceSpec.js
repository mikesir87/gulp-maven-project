'use strict';

describe("angularApp module", function() {
  beforeEach(module('angularApp'));

  describe('TimeService', function() {
    var service, $rootScope, $httpBackend, promise;
    var currentTime = { time : 123456789 };

    beforeEach(inject(function(_$httpBackend_, TimeService, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      service = TimeService;
      $rootScope = _$rootScope_;

      $httpBackend.when('GET', 'api/currentTime')
          .respond(currentTime);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('getCurrentTime should fetch current time', function() {
      $httpBackend.expectGET('api/currentTime');

      promise = service.getCurrentTime();
      $httpBackend.flush();

      var resolved = false;
      promise.then(function(timeResult) { 
        resolved = true;
        expect(timeResult).toEqual(currentTime.time); 
      });
      $rootScope.$digest();
    });

  });

});
