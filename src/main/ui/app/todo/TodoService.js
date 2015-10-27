(function () {
  'use strict';

  angular
      .module("demo.todo")
      .service("TodoService", TodoService);

  /**
   * @ngdoc service
   * @name TodoService
   *
   * @description
   * A service used to save and retrieve todo list items
   */
  function TodoService($q, $timeout) {
    var items = [];

    return {
      getAllItems : getAllItems,
      save : save,
      removeCompleted : removeCompleted
    };

    ////////

    function getAllItems() {
      return $q.when( items );
    }

    function save(item) {
      return $timeout(function() {
        items.push(item);
        return items;
      }, 250);
    }

    function removeCompleted() {
      var newItems = [];
      items.forEach(function(item) {
        if (!item.completed) newItems.push(item);
      });
      items = newItems;
      return $q.when(items);
    }
  }
})();