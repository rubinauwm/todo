import { inject } from 'aurelia-framework';
import { AuthService } from 'aurelia-auth';
import { Todos } from '../resources/data/todos';
import { Users } from '../resources/data/users';


@inject(AuthService, Todos, Users)
export class Home {
  constructor(auth, todos, users) {
    this.auth = auth;
    this.todos = todos;
    this.users = users;
    this.message = 'Todo';

    this.hideCompleted = false;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
  }
}
