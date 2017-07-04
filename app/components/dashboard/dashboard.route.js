function dashboardRoutes($stateProvider, $locationProvider) {

  $stateProvider
    .state('dashboard', {
      url: '/',
      component: 'dashboard'
    })

  $locationProvider.html5Mode(true)
}

export default dashboardRoutes;
