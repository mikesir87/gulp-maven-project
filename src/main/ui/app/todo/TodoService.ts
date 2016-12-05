namespace App {
  'use strict';

  /**
   * @ngdoc service
   * @name TodoService
   *
   * @description
   * A service used to save and retrieve todo list items
   */
  export class TodoService {
    private items : Todo[] = [];

    constructor(private $q : angular.IQService, private $timeout : angular.ITimeoutService) {}

    getAllItems() {
        return this.$q.when( this.items );
    }

    save(item : Todo) {
        return this.$timeout(function () {
            this.items.push(item);
            return this.items;
        }.bind(this), 250);
    }

    removeCompleted() {
        this.items = this.items
            .filter(item => !item.completed);
        return this.$q.when(this.items);
    }


  }

  angular
      .module("demo.todo")
      .service("TodoService", TodoService);
}