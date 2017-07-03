import angular from 'angular';
import HomeRoutes from './home.route';
import HomeComponent from './home.component';
import HomeService from './home.service';

export default angular
  .module('home', [])
  .component('home', HomeComponent)
  .service('homeService', HomeService)
  .config(HomeRoutes);
