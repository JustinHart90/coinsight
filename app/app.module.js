import angular from 'angular';
import uirouter from 'angular-ui-router';
import home from './components/home/home.module.js';

import 'bootstrap/dist/css/bootstrap.css';
import './css/home.css';

angular.module('app', [
  uirouter,
  'home'
]);
