import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import angularMoment from 'angular-moment';
import dashboard from './components/dashboard/dashboard.module.js';

import 'bootstrap/dist/css/bootstrap.css';
import './libraries/nv.d3.css';
import './css/dashboard.css';
// import './css/d3.css';

angular.module('app', [
  uirouter,
  angularMoment,
  'dashboard'
]);
