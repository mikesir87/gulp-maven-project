namespace App {
  'use strict';

  /**
   * @ngdoc controller
   * @name TodoController
   *
   * @description
   * Root controller for the todo view
   */
  export class TodoController {

    displayAddForm = false;
    addingItem = false;
    newItem : Todo;
    newItemForm : angular.IFormController;

    constructor(private TodoService : TodoService, public items : Todo[]) {}

    toggleDisplayAddForm() {
      this.displayAddForm = !this.displayAddForm;
    }

    addItem() {
      if (this.newItemForm.$invalid)
        return;

      this.addingItem = true;
      this.TodoService.save(this.newItem).then(function() {
        return this.TodoService.getAllItems();
      }.bind(this)).then(function(items : Todo[]) {
        this.items = items;
        this.toggleDisplayAddForm();
        this.newItem = {};
        this.addingItem = false;
      }.bind(this));
    }

    getNumCompleted() {
      return this.items
          .filter(item => item.completed)
          .length;
    }

    removeCompleted() {
      this.TodoService.removeCompleted().then(function(items : Todo[]) {
        this.items = items;
      });
    }

  }

  angular
      .module("demo.todo")
      .controller("TodoController", TodoController);

}