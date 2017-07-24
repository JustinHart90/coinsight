'use strict'

dashboardRoutes.$inject = ['$stateProvider', '$locationProvider'];

export default function dashboardRoutes ($stateProvider, $locationProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/',
      component: 'dashboard'
    })
    .state('news', {
      url: '/news',
      component: 'newsComponent'
    })

  $locationProvider.html5Mode(true);
}
