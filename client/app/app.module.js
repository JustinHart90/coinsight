import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import angularMoment from 'angular-moment';
import dashboard from './components/dashboard/dashboard.module.js';

import 'bootstrap/dist/css/bootstrap.css';
import './css/dashboard.css';
import './css/candle.css';

angular.module('app', [
  uirouter,
  angularMoment,
  'dashboard'
]);
