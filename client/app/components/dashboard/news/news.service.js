
export default function newsService ($http, $log) {
  const vm = this
  vm.getNews = getNews;
  vm.requestUrl = ''

  function getNews () {
    vm.requestUrl = 'http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBitcoin%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEthereum%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCryptocurrency%22%5D%7D%7D%2C%7B%22dateStart%22%3A%222017-06-09%22%2C%22dateEnd%22%3A%222017-07-09%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=socialScore&articlesCount=20&articlesIncludeArticleCategories=true&articlesIncludeArticleSocialScore=true&articlesIncludeArticleDetails=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceImportance=true&articlesIncludeSourceDetails=true&apiKey=8afe38d5-7f41-44dd-b6ea-c3da0af84f61'
    return $http
      .get(vm.requestUrl)
      .then(res => res)
      .catch(err => $log.error(err))
  }
}
