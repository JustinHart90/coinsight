'use strict'

export default function NewsController (newsService, $log) {
  const vm = this;
  vm.$onInit = $onInit;
  vm.showDetails = showDetails;
  vm.articles = [];

  // let screenWidth = window.innerWidth;
  // let screenHeight = window.innerHeight;
  // $log.log('HEIGHT: ', screenHeight);
  // let news = d3.select('.news')
  //   .attr('height', screenHeight * 0.74)
  //   .attr('position', 'fixed');

  function $onInit () {
    newsService.getNews()
      .then(res => {
        vm.articles = res.data.articles.results
        $log.log(vm.articles);
        vm.articles.showArticleDetails = false;
      })
      .catch(err => $log.log(err))
  }

  function showDetails (e) {
    e.preventDefault();
  }

}
