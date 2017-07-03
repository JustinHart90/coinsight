import angular from 'angular';
import uirouter from 'angular-ui-router';
import home from './components/home/home.module.js';

require('./css/home.css');

angular.module('app', [
  uirouter,
  'home'
]);
