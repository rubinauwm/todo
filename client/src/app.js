// export class App {
//   constructor() {
//     this.message = 'Hello World!!';
//   }
// }

import {inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';
import {AuthorizeStep} from 'aurelia-auth';

@inject(FetchConfig)
export class App {
    constructor(fetchConfig){
    this.fetchConfig = fetchConfig;
  }

  activate(){
      this.fetchConfig.configure();
  }

  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'Todo';
    config.map([
      { 
	route: ['', 'home'],
	 moduleId: './modules/home',
	 name: 'Home' 
      },
      {
	 route: 'wall',
	 moduleId: './modules/list/todo',
	 name: 'Wall' , auth:"true"
     }
    ]);
  }
}
