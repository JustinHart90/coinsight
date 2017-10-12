'use strict'
angular
  .module("app.home")
  .controller('HomeController', HomeController)

  HomeController.$inject = ['$http', '$state', "$window", "$location"]

  function HomeController($http, $state, $window, $location) {
    const vm = this
    vm.$onInit = $onInit;
    function $onInit () {}
  }
