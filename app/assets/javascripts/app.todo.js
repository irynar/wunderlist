angular.module("todo", [])
    .controller("TodoController", TodoController);

function TodoController() {
    this.list = [
        {
            title: "Test todo",
            id: Date.now(),
            done: false,
            favorite: true
        },
        {
            title: "Test todo2",
            id: Date.now() + 1,
            done: true,
            favorite: false
        }
    ];

    this.getFinishedTodos = function() {
        return this.list.filter(function(element) {
            return element.done == true;
        });
    };

    this.getUnfinishedTodos = function() {
        return this.list.filter(function(element) {
            return element.done == false;
        });
    };

    this.getFinishedCount = function() {
        return this.getFinishedTodos().length;
    };

    this.getUnfinishedCount = function() {
        return this.getUnfinishedTodos().length;
    };

    /*Todos CRUD*/
    this.add = function(todo) {
        this.list.push(
            {
                title: todo.title,
                id: Date.now(),
                done: false,
                favorite: false
            }
        );
        this.activeTodo.title = '';
    };

    this.edit = function(id) {
        this.activeTodo = this.destroy(id);
    };

    this.destroy = function(id) {
        var removedIndex;
        this.list.forEach(function(element, elementIndex) {
            if (element.id == id) {
                removedIndex = elementIndex;
            }
        });
        //  Remove element from array by Id and return it.
        return this.list.splice(removedIndex,1)[0];
    };

    this.destroyAllFinished = function() {
        this.getFinishedTodos().forEach(function(element, elementIndex) {
            this.destroy(element.id);
        }, this); // 'this' is added to change scope from internal (forEach) to external
    };

    this.markAllAsFinished = function() {
        this.getUnfinishedTodos().forEach(function(element, elementIndex) {
            element.done = true;
        });
    }
}
