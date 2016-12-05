namespace App {

  class RootController {
    name = "Michael Irwin";
  }

  angular.module("angularApp")
      .controller("RootController", RootController);

}