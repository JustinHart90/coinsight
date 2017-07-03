import homeHtml from './home.html';

let homeComponent = {
  template: homeHtml,
  controllerAs: 'home',
  controller: function(homeService, $log) {
    const vm = this;
    vm.$onInit = $onInit
    vm.mainChart = mainChart

    function $onInit () {
      mainChart();
    }

    function mainChart () {
      homeService.getTradeHistory()
        .then(data => $log.log('data', data.data))
        .catch(err => $log.error(err))
    }
  }
}

export default homeComponent;
