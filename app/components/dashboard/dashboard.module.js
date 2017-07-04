import angular from 'angular';
import DashboardRoutes from './dashboard.route';
import DashboardComponent from './dashboard.component';
import DashboardService from './dashboard.service';

export default angular
  .module('dashboard', [])
  .component('dashboard', DashboardComponent)
  .service('dashboardService', DashboardService)
  .config(DashboardRoutes);
