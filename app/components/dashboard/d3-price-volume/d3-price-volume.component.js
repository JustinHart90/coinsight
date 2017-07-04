import d3PriceVolumeHtml from './d3-price-volume.html';

let d3PriceVolumeComponent = {
  template: d3PriceVolumeHtml,
  controllerAs: 'd3-price-volume',
  controller: function(d3PriceVolumeService, $log) {
    const vm = this;
    vm.$onInit = $onInit

    function $onInit () {}
  }
}

export default d3PriceVolumeComponent;
