// import nlu from 'watson-developer-cloud/natural-language-understanding/v1');

export default function newsService ($http, $log) {
  const vm = this
  vm.getNews = getNews;
  vm.getEvents = getEvents;
  vm.getDbEvents = getDbEvents;
  vm.getSentiment = getSentiment;
  // vm.getSentiment = getSentiment;
  vm.requestUrl = '';

  function getSentiment (urls) {
    let urlArray = urls;
    // $log.log('getSentiment newsService urls: ', urlArray)
    return $http
      .get('http://localhost:3000/sentiment')
      .then(res => res)
      .catch(err => $log.log(err));
  }

  function getNews () {
    let apiKey = 'fda14e3b-91e2-455b-b7d4-a1283e6f8845';
    let sortBy = 'socialScore';
    let dateStart = '2017-07-08';
    let dateEnd = '2017-07-20';
    vm.requestUrl =
    'http://eventregistry.org/json/article?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCryptocurrency%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBitcoin%22%2C%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEthereum%22%5D%7D%7D%2C%7B%22dateStart%22%3A%22' + dateStart + '%22%2C%22dateEnd%22%3A%22' + dateEnd + '%22%2C%22lang%22%3A%22eng%22%7D%5D%7D%7D&action=getArticles&resultType=articles&articlesSortBy=' + sortBy + '&articlesCount=20&articlesIncludeArticleConcepts=true&articlesIncludeArticleDuplicateList=true&articlesIncludeArticleOriginalArticle=true&articlesIncludeArticleImage=true&articlesIncludeArticleSocialScore=true&articlesIncludeArticleDetails=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceImportance=true&articlesIncludeSourceDetails=true&apiKey=' + apiKey;
    return $http
      .get(vm.requestUrl)
      .then(res => res)
      .catch(err => $log.error(err))
  }

  function getEvents () {
    return $http
      .get('http://eventregistry.org/json/event?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBitcoin%22%5D%7D%7D%2C%7B%22dateStart%22%3A%222013-04-29%22%2C%22dateEnd%22%3A%222017-07-20%22%2C%22lang%22%3A%22eng%22%7D%5D%7D%7D&action=getEvents&resultType=events&eventsSortBy=date&eventsCount=20&eventsIncludeEventSummary=true&eventsIncludeEventConcepts=false&eventsIncludeEventCategories=false&eventsIncludeEventLocation=false&eventsIncludeEventSocialScore=true&eventsEventImageCount=1&eventsIncludeConceptLabel=false&eventsIncludeSourceTitle=false&eventsIncludeSourceImportance=true&eventsIncludeStoryBasicStats=true&eventsIncludeStoryDate=true&eventsIncludeStorySocialScore=true')
      .then(res => res)
      .catch(err => $log.log(err));
  }

  function getDbEvents () {
    return $http
      .get('http://localhost:3000/news')
      .then(res => res)
      .catch(err => $log.log(err));
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
