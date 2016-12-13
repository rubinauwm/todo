import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataServices} from "../../resources/data/data-services";
import {Todos} from "../../resources/data/todos";
import {Users} from "../../resources/data/users";
import {AuthService} from 'aurelia-auth';

@inject(Router, DataServices, Todos, Users, AuthService)
export class Wall{

    constructor(router, data, todos,users, auth){
        this.router = router;
        this.data = data;
        this.todos = todos;
        this.users = users;
        this.auth = auth;

        this.todoSelected = false;
        this.hideCompleted = false;
        this.showList = true;
    }

    async activate(){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        await this.todos.getUsersTodos(this.user._id);
    }

    refreshTodos(){
        this.todos.getUsersTodos(this.user._id);
    
    }

newTodo(){
    this.todos.selectTodo();
    this.todoSelected = true;
    this.showList = false;
}


async save(){
    if(this.todos.selectedTodo._id){
      let response = await this.todos.saveTodo();
      if(!response.error){
          this.todos.todoArray[this.todos.selectedIndex] = response;
      }
    } else {
        this.todos.selectedTodo.todoAuthor = this.user._id;

        await this.todos.createTodo();
    }
    this.todoSelected = false;
    this.showList = true;
}

async toggleDone(index){
    this.todos.todoArray[index].completed = !this.todos.todoArray[index].completed;
    this.todos.selectTodo(index);
    await this.todos.saveTodo();
}

edit(index){
    this.todos.selectTodo(index);
    this.todoSelected = true;
    this.showList = false;
}

cancel(){
    this.todoSelected = false;
    this.showList = true;
}

toggleHideCompleted(){
    this.hideCompleted = !this.hideCompleted;
}

deleteTodo(index){
    this.todos.deleteTodo(index);
}

logout() {
     sessionStorage.removeItem('user');
    this.auth.logout();
}

}