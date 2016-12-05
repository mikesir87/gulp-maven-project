namespace App {

    class HomeController {
        public fetching = false;
        public currentTime : number;

        constructor(private TimeService: TimeService,
                    private $timeout: angular.ITimeoutService,
                    currentTime : number) {
            this.currentTime = currentTime;
        }

        refreshTime() {
            this.fetching = true;
            this.$timeout(function () {
                function onComplete(time: number) {
                    this.fetching = false;
                    this.currentTime = time;
                }

                this.TimeService
                    .getCurrentTime()
                    .then(onComplete.bind(this));
            }.bind(this), 500);
        }
    }

    angular.module("angularApp")
        .controller("HomeController", HomeController);
}