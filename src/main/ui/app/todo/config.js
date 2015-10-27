(function() {

  angular.module("demo.todo")
      .config(uiStateConfig);

  function uiStateConfig($stateProvider) {
    $stateProvider
        .state('root.todo', {
          url : "/todo",
          templateUrl : 'todo/todo.html',
          controller : "TodoController as ctrl",
          resolve : {
            items : function(TodoService) {
              return TodoService.getAllItems();
            }
          }
        });
  }

})();