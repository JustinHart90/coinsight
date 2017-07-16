import uirouter from '@uirouter/angularjs';
import angularMoment from 'angular-moment';

import DashboardRoutes from './dashboard.route';
import DashboardComponent from './dashboard.component';
import DashboardService from './dashboard.service';

import candlestickComponent from './candlestick/candlestick.component';
import candlestickService from './candlestick/candlestick.service';

import newsComponent from './news/news.component';
import newsService from './news/news.service';

import gaugeComponent from './news/gauge/gauge.component';
import gaugeService from './news/gauge/gauge.service';

export default angular
  .module('dashboard', [uirouter, angularMoment])
  .component('dashboard', DashboardComponent)
  .component('candlestickComponent', candlestickComponent)
  .component('newsComponent', newsComponent)
  .component('gaugeComponent', gaugeComponent)
  .service('dashboardService', DashboardService)
  .service('candlestickService', candlestickService)
  .service('newsService', newsService)
  .service('gaugeService', gaugeService)
  .config(DashboardRoutes);
