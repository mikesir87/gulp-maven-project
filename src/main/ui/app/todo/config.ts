namespace App {

  function uiStateConfig($stateProvider : angular.ui.IStateProvider) {
    $stateProvider
        .state('root.todo', {
          url : "/todo",
          templateUrl : 'todo/todo.html',
          controller : "TodoController as ctrl",
          resolve : {
            items : function(TodoService : TodoService) {
              return TodoService.getAllItems();
            }
          }
        });
  }

    angular.module("demo.todo")
        .config(uiStateConfig);

}