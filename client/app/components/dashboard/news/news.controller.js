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
  vm.cardFlip = cardFlip;
  vm.createGauge = createGauge;
  vm.standby = standby;
  vm.newGauge = newGauge;
  vm.removeGauge = removeGauge;

  function $onInit () {
    vm.articles = [];
    vm.articlesRaw = [];
    vm.sentimentScores = [];
    vm.showChartIcon = true;
    vm.showNewsIcon = false;
    vm.isFlipped = false;
    getArticles();
  }

  function newGauge(article) {
    var sentimentGauge = createGauge('.sentiment-gauge', {
      size: 80,
      clipWidth: 80,
      clipHeight: 60,
      ringWidth: 50,
      maxValue: 100,
      transitionMs: 4000,
    });
    var socialGauge = createGauge('.social-gauge', {
      size: 80,
      clipWidth: 80,
      clipHeight: 60,
      ringWidth: 50,
      maxValue: 100,
      transitionMs: 4000,
    });
    var impactGauge = createGauge('.impact-gauge', {
      size: 80,
      clipWidth: 80,
      clipHeight: 60,
      ringWidth: 50,
      maxValue: 100,
      transitionMs: 4000,
    });

    sentimentGauge.render();
    socialGauge.render();
    impactGauge.render();

    function updateReadings() {
      sentimentGauge.update(article.sentiment);
      socialGauge.update(10);
      impactGauge.update(25.5);
    }

    updateReadings();
    setInterval(function() {
      updateReadings();
    }, 5 * 1000);
  }

  function removeGauge () {
    $log.log('before remove')
    d3.select('.sentiment-gauge').remove();
    d3.select('.social-gauge').remove();
    d3.select('.impact-gauge').remove();
    $log.log('after remove')
  }

  function cardFlip () {
    vm.isFlipped = !vm.isFlipped;
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
          let shouldInclude = (!raw.isDuplicate && raw.sentiment !== 0 && raw.uri !== '690930357' && raw.uri !== '690235957') || raw.uri === duplicates[0]
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
    return newsService.getSentiment()
      .then(res => {
        $log.log('sentiment res array: ', res.data);
        let sentimentData = res.data;
        articles.forEach(article => {
          sentimentData.forEach(s => {
            if (s.url === article.url) {
              article.sentiment = s.score;
              article.sentimentLabel = s.label;
              if (s.label === 'positive') {
                vm.sentimentScores.push(+s.score);
              } else if (s.label === 'negative') {
                vm.sentimentScores.push(+('-' + s.score));
              } else {
                vm.sentimentScores.push(+s.score);
              }
            }
          });
        });
        $log.log('sentiment scores: ', vm.sentimentScores);
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

  function standby() {
    document.getElementsByClassName('articleThumbnail').src = 'https://static1.squarespace.com/static/56eddde762cd9413e151ac92/570cb87b5bd33022b93a0272/59146dd420099e447594a6d4/1494512206719/crypto.jpg?format=1500w';
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

  function createGauge (container, configuration) {
  	var that = {};
  	var config = {
      size						: 80,
      clipWidth					: 80,
      clipHeight					: 60,
      ringInset					: 20,
      ringWidth					: 50,

      pointerWidth				: 7,
      pointerTailLength			: 3.5,
      pointerHeadLengthPercent	: 0.7,

  		minValue					: -100,
  		maxValue					: 100,

  		minAngle					: -90,
  		maxAngle					: 90,

  		transitionMs				: 750,

  		majorTicks					: 3,
  		labelFormat					: d3v3.format(',g'),
  		labelInset					: 10,

  		arcColorFn					: d3v3.interpolateHsl(d3v3.rgb('#e8e2ca'), d3v3.rgb('#3e6c0a'))
  	};
  	var range;
  	var r;
  	var pointerHeadLength;
  	var value = 0;

  	var svg;
  	var arc;
  	var scale;
  	var ticks;
  	var tickData;
  	var pointer;

    $log.log('d3v3', d3v3);

  	var donut = d3v3.layout.pie();

  	function deg2rad(deg) {
  		return deg * Math.PI / 180;
  	}

  	function newAngle(d) {
  		var ratio = scale(d);
  		var newAngle = config.minAngle + (ratio * range);
  		return newAngle;
  	}

  	function configure(configuration) {
  		var prop = undefined;
  		for (prop in configuration) {
  			config[prop] = configuration[prop];
  		}

  		range = config.maxAngle - config.minAngle;
  		r = config.size / 2;
  		pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

  		// a linear scale that maps domain values to a percent from 0..1
  		scale = d3v3.scale.linear()
  			.range([0,1])
  			.domain([config.minValue, config.maxValue]);

  		ticks = scale.ticks(config.majorTicks);
  		tickData = d3v3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

  		arc = d3v3.svg.arc()
  			.innerRadius(r - config.ringWidth - config.ringInset)
  			.outerRadius(r - config.ringInset)
  			.startAngle(function(d, i) {
  				var ratio = d * i;
  				return deg2rad(config.minAngle + (ratio * range));
  			})
  			.endAngle(function(d, i) {
  				var ratio = d * (i+1);
  				return deg2rad(config.minAngle + (ratio * range));
  			});
  	}
  	that.configure = configure;

  	function centerTranslation() {
  		return 'translate('+r +','+ r +')';
  	}

  	function isRendered() {
  		return (svg !== undefined);
  	}
  	that.isRendered = isRendered;

  	function render(newValue) {
  		svg = d3v3.select(container)
  			.append('svg:svg')
  				.attr('class', 'gauge')
  				.attr('width', config.clipWidth)
  				.attr('height', config.clipHeight);

  		var centerTx = centerTranslation();

  		var arcs = svg.append('g')
  				.attr('class', 'arc')
  				.attr('transform', centerTx);

  		arcs.selectAll('path')
  				.data(tickData)
  			.enter().append('path')
  				.attr('fill', function(d, i) {
  					return config.arcColorFn(d * i);
  				})
  				.attr('d', arc);

  		var lg = svg.append('g')
  				.attr('class', 'label')
  				.attr('transform', centerTx);
  		lg.selectAll('text')
  				.data(ticks)
  			.enter().append('text')
  				.attr('transform', function(d) {
  					var ratio = scale(d);
  					var newAngle = config.minAngle + (ratio * range);
  					return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
  				})
  				.text(config.labelFormat);

  		var lineData = [ [config.pointerWidth / 2, 0],
  						[0, -pointerHeadLength],
  						[-(config.pointerWidth / 2), 0],
  						[0, config.pointerTailLength],
  						[config.pointerWidth / 2, 0] ];
  		var pointerLine = d3v3.svg.line().interpolate('monotone');
  		var pg = svg.append('g').data([lineData])
  				.attr('class', 'pointer')
  				.attr('transform', centerTx);

  		pointer = pg.append('path')
  			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
  			.attr('transform', 'rotate(' +config.minAngle +')');

  		update(newValue === undefined ? 0 : newValue);
  	}
  	that.render = render;

  	function update(newValue, newConfiguration) {
  		if (newConfiguration !== undefined) {
  			configure(newConfiguration);
  		}
  		var ratio = scale(newValue);
  		var newAngle = config.minAngle + (ratio * range);
  		pointer.transition()
  			.duration(config.transitionMs)
  			.ease('elastic')
  			.attr('transform', 'rotate(' +newAngle +')');
  	}
  	that.update = update;

  	configure(configuration);

  	return that;
  };

}
