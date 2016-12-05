namespace App {

    export class TimeService {

        constructor(private $http: angular.IHttpService) {}

        getCurrentTime() : angular.IPromise<Number> {
            return this.$http
                .get("api/currentTime")
                .then(function (response : { data : { time : number }}) {
                    return response.data.time;
                });
        };

    }

    angular.module("angularApp")
        .service("TimeService", TimeService);
}