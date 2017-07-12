// import nlu from 'watson-developer-cloud/natural-language-understanding/v1');

export default function newsService ($http, $log) {
  const vm = this
  vm.getNews = getNews;
  // vm.getSentiment = getSentiment;
  vm.requestUrl = ''

  function getNews () {
    vm.requestUrl = 'https://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBitcoin%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEthereum%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCryptocurrency%22%5D%7D%7D%2C%7B%22dateStart%22%3A%222017-06-09%22%2C%22dateEnd%22%3A%222017-07-09%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=socialScore&articlesCount=20&articlesIncludeArticleCategories=true&articlesIncludeArticleSocialScore=true&articlesIncludeArticleDetails=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceImportance=true&articlesIncludeSourceDetails=true&apiKey=8afe38d5-7f41-44dd-b6ea-c3da0af84f61'
    return $http
      .get(vm.requestUrl)
      .then(res => res)
      .catch(err => $log.error(err))
  }

  function botRequest () {
    let botUrl = 'ec2-35-164-128-80.us-west-2.compute.amazonaws.com';
    return $http
      .get(botUrl)
      .then(data => $log.log(data))
      .catch(err => $log.log(err));
  }

  // function getSentiment () {
  //   const myInstance = new Watson({
  //     api_key: '601414e2-8dbd-4c39-a53b-a3ea1c7573f8',
  //     /* username, password, version, etc... */
  //     headers: {
  //       'X-Watson-Learning-Opt-Out': true
  //     }
  //   });
  //
  //   let params = {
  //     text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
  //   };
  //
  //   nlu.sentiment(params, function (err, response) {
  //     if (err)
  //       console.log('error:', err);
  //     else
  //       console.log(JSON.stringify(response, null, 2));
  //   });
  // }
}
