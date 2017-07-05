'use strict'

function DashboardController (dashboardService, $log) {
  const vm = this;
  vm.$onInit = $onInit
  vm.mainChart = mainChart

  function $onInit () {
    mainChart();
  }

  function mainChart () {
    dashboardService.getTradeHistory()
      .then(data => $log.log('data', data.data))
      .catch(err => $log.error(err))
  }
}

export default DashboardController;
