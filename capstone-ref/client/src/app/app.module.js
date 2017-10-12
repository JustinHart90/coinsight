import angular from 'angular';
import uiRouter from 'angular-ui-router';

// css lib
// import 'bootstrap';

// css
import '../stylesheets/home.css';

// home component
import homeModule from './components/home/home.module.js';
import homeComponent from './components/home/home.component.js';
import homeController from './components/home/home.controller.js';
// import homeTemplate from './components/home/home.html';
// import homeService from './components/home/home.service';

// routing
import routing from './app.config.js';

const app = 'app';
// require('../index.html');

angular.module(app, [uiRouter, homeModule])
  .component('app.home', homeComponent)
  // .service('appService', appService)
  .config(routing)

export default app;
