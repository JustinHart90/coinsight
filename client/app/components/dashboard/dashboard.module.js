import uirouter from '@uirouter/angularjs';
import angularMoment from 'angular-moment';

import DashboardRoutes from './dashboard.route';
import DashboardComponent from './dashboard.component';
import DashboardService from './dashboard.service';

import d3PriceVolumeComponent from './d3-price-volume/d3-price-volume.component';
import d3PriceVolumeService from './d3-price-volume/d3-price-volume.service';

import candlestickComponent from './candlestick/candlestick.component';
import candlestickService from './candlestick/candlestick.service';

export default angular
  .module('dashboard', [uirouter, angularMoment])
  .component('dashboard', DashboardComponent)
  .component('d3PriceVolumeComponent', d3PriceVolumeComponent)
  .component('candlestickComponent', candlestickComponent)
  .service('dashboardService', DashboardService)
  .service('d3PriceVolumeService', d3PriceVolumeService)
  .service('candlestickService', candlestickService)
  .config(DashboardRoutes);
