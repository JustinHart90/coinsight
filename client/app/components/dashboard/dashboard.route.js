'use strict'

dashboardRoutes.$inject = ['$stateProvider', '$locationProvider'];

export default function dashboardRoutes ($stateProvider, $locationProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/',
      component: 'dashboard'
    })

  $locationProvider.html5Mode(true);
}
