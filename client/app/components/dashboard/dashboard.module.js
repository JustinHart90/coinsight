import DashboardRoutes from './dashboard.route';
import DashboardComponent from './dashboard.component';
import DashboardService from './dashboard.service';
import d3PriceVolumeComponent from './d3-price-volume/d3-price-volume.component';
import d3PriceVolumeService from './d3-price-volume/d3-price-volume.service';

export default angular
  .module('dashboard', [])
  .component('dashboard', DashboardComponent)
  .component('d3PriceVolumeComponent', d3PriceVolumeComponent)
  .service('dashboardService', DashboardService)
  .service('d3PriceVolumeService', d3PriceVolumeService)
  .config(DashboardRoutes);
