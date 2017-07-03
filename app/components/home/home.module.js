import angular from 'angular';
import routing from '../../app.config';
import component from './home.component';
import service from './home.service';

angular
  .module('home', [])
  .component('home', component)
  .factory('homeService', service)
  .config(routing);
