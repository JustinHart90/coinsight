'use strict'

export default function NewsController (newsService, $log) {
  const vm = this;
  vm.$onInit = $onInit;
  vm.showDetails = showDetails;
  vm.getSocialScore = getSocialScore;
  vm.getTimeAgo = getTimeAgo;

  function $onInit () {
    newsService.getNews()
      .then(res => {
        vm.articles = [];
        vm.articles = res.data.articles.results
        $log.log(vm.articles);
        vm.articles.showArticleDetails = false;

        getSocialScore(vm.articles);
        getTimeAgo(vm.articles);
      })
      .catch(err => $log.log(err))
  }

  function getSocialScore (articles) {
    articles.forEach(article => {
      article.socialScore = 0;
      let shares = article.shares;
      for (let key in shares) {
        if (shares[key]) {
          let score = shares[key]
          article.socialScore += score;
        }
      }
    })
  }

  function getTimeAgo (articles) {
    articles.forEach(article => {
      article.created_at = article['dateTime'];
    })
  }

  function showDetails (e) {
    e.preventDefault();
  }

}
