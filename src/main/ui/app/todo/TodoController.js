(function () {
  'use strict';

  angular
      .module("demo.todo")
      .controller("TodoController", TodoController);

  /**
   * @ngdoc controller
   * @name TodoController
   *
   * @description
   * Root controller for the todo view
   */
  function TodoController(TodoService, items) {
    var vm = this;
    vm.displayAddForm = false;
    vm.addingItem = false;
    vm.newItem = {};
    vm.items = items;

    vm.toggleDisplayAddForm = toggleDisplayAddForm;
    vm.addItem = addItem;
    vm.getNumCompleted = getNumCompleted;
    vm.removeCompleted = removeCompleted;

    ////////

    function toggleDisplayAddForm() {
      vm.displayAddForm = !vm.displayAddForm;
      vm.newItem = {};
    }

    function addItem() {
      if (vm.newItemForm.$invalid)
        return;

      vm.addingItem = true;
      TodoService.save(vm.newItem).then(function() {
        return TodoService.getAllItems();
      }).then(function(items) {
        vm.items = items;
        vm.toggleDisplayAddForm();
        vm.newItem = {};
        vm.addingItem = false;
      });
    }

    function getNumCompleted() {
      var num = 0;
      console.log(vm.items);
      vm.items.forEach(function(item) { if (item.completed) num++; });
      return num;
    }

    function removeCompleted() {
      TodoService.removeCompleted().then(function(items) {
        vm.items = items;
      });
    }

  }
})();