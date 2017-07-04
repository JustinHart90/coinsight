import angular from 'angular';
import uirouter from 'angular-ui-router';
import dashboard from './components/dashboard/dashboard.module.js';

import 'd3'
import 'bootstrap/dist/css/bootstrap.css';
import './css/dashboard.css';

angular.module('app', [
  uirouter,
  'dashboard'
]);
