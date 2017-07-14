'use strict'

export default function NewsController (newsService, $log) {
  const vm = this;
  vm.$onInit = $onInit;
  vm.getArticles = getArticles;
  vm.showEvents = showEvents;
  vm.showSentiment = showSentiment;
  vm.eventsRequest = eventsRequest;
  vm.showDetails = showDetails;
  vm.getSocialScore = getSocialScore;
  vm.getTimeAgo = getTimeAgo;
  vm.getSecureUrl = getSecureUrl;

  function $onInit () {
    vm.articles = [];
    vm.events = [];
    getArticles();
    // eventsRequest();
    showEvents();
    showSentiment();
  }

  function showSentiment () {
    return newsService.getSentiment()
      .then(res => {
        $log.log('WATSON RESPONSE', res);
      })
      .catch(err => $log.log(err));
  }

  function showEvents () {
    newsService.getDbEvents()
      .then(res => {
        $log.log('EVENTS FROM DB', res);
        vm.events.showArticleDetails = false;
        vm.events = res.data;
        getTimeAgo(null, vm.events);
      })
      .catch(err => $log.log(err));
  }

  function eventsRequest () {
    newsService.getEvents()
      .then(data => {
        let eventsArray = data.data.events.results;
        let result = [];
        eventsArray.forEach(e => {
          result.push({
            eventId: e.uri,
            articleCount: e.totalArticleCount,
            date: e.eventDate,
            imgUrl: e.images[0],
            socialScore: e.socialScore,
            summary: e.summary.eng,
            title: e.title.eng
          })
        })
        $log.log('RESULT OBJ: ', result);
        // return result;
      })
      .catch(err => $log.log(err));

  }

  function getArticles () {
    newsService.getNews()
      .then(res => {
        vm.articles = getSecureUrl(res.data.articles.results);
        // $log.log(vm.articles);
        vm.articles.showArticleDetails = false;

        getSocialScore(vm.articles);
        getTimeAgo(vm.articles, null);
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

  function getTimeAgo (articles, events) {
    if (articles) {
      articles.forEach(article => {
        article.created_at = article['dateTime'];
      })
    }

    if (events) {
      events.forEach(event => {
        event.created_at = event['date'];
      })
    }
  }

  function showDetails (e) {
    e.preventDefault();
  }

  function getSecureUrl (articles) {
    return articles.map(article => {
      let imgUrl = article.source.details.thumbImage;
      if (imgUrl.indexOf('https') === 0) {
        article.source.details.thumbImage = imgUrl;
      } else if (imgUrl.indexOf('http') === 0) {
        article.source.details.thumbImage = imgUrl.replace('http://', 'https://');
        // $log.log(imgUrl);
      } else {
        $log.log('image url error!');
      }

      let linkUrl = article.url;
      if (linkUrl.indexOf('https') === 0) {
        article.url = linkUrl;
      } else if (linkUrl.indexOf('http') === 0) {
        article.url = linkUrl.replace('http://', 'https://');
        // $log.log(linkUrl);
      } else {
        $log.log('link url error!');
      }
      return article;
    })
  }

}
