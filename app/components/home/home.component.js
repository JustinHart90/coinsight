import homeHtml from './home.html';

let homeComponent = {
  template: homeHtml,
  controllerAs: 'home',
  controller: function(homeService) {
    const vm = this;
  }
}

export default homeComponent;
