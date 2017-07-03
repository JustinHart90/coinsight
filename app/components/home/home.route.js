function homeRoutes($stateProvider, $locationProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })

  $locationProvider.html5Mode(true)
}

export default homeRoutes;
