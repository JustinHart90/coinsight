'use strict'

export default function NewsController (newsService, $log) {
  const vm = this;
  vm.$onInit = $onInit;
  vm.getArticles = getArticles;
  vm.showSentiment = showSentiment;
  vm.showDetails = showDetails;
  vm.getSocialScore = getSocialScore;
  vm.getTimeAgo = getTimeAgo;
  vm.getSecureUrl = getSecureUrl;

  function $onInit () {
    vm.articles = [];
    vm.articlesRaw = [];
    getArticles();
  }

  function getArticles () {
    newsService.getNews()
      .then(res => {
        vm.articlesRaw = getSecureUrl(res.data.articles.results);
        $log.log(vm.articlesRaw);
        showSentiment(vm.articlesRaw);
        getSocialScore(vm.articlesRaw);
        getTimeAgo(vm.articlesRaw, null);
        let duplicates = [];
        vm.articlesRaw.forEach(article => {
          if (article.isDuplicate === true) {
            duplicates.push(article.uri)
          }
        })
        vm.articlesRaw.forEach(raw => {
          let shouldInclude = (!raw.isDuplicate && raw.sentiment !== 0 && raw.uri !== '690930357') || raw.uri === duplicates[0]
          if (shouldInclude) {
            vm.articles.push(raw);
          }
        })
        $log.log('REFINED LIST: ', vm.articles)
        vm.articles.showArticleDetails = false;
      })
      .catch(err => $log.log(err))
  }

  function showSentiment (articles) {
    let urls = [];
    articles.forEach(article => urls.push(article.url));
    return newsService.getSentiment(urls)
      .then(res => {
        $log.log('sentiment res array: ', res);
        let sentimentScores = [];
        let sentimentLabels = [];
        res.data.forEach(r => {
          if (typeof r === 'string') {
            sentimentScores.push(0);
            sentimentLabels.push('nuetral');
          } else {
            sentimentScores.push(Math.round(r.sentiment.document.score * 100));
            sentimentLabels.push(r.sentiment.document.label);
          }
        })
        let index = 0;
        vm.articlesRaw.forEach(article => {
          article.sentiment = sentimentScores[index];
          article.sentimentLabel = sentimentLabels[index];
          index++;
        })
      })
      .catch(err => $log.log(err));
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
