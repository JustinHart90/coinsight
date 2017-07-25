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
  vm.setGauges = setGauges;
  vm.overallGauge = overallGauge;

  function $onInit () {
    vm.articles = [];
    vm.articlesRaw = [];
    vm.sentimentScores = [];
    vm.showChartIcon = true;
    vm.showNewsIcon = false;
    vm.isFlipped = false;
    getArticles();
  }

  let socialMax = 0;
  let socialMin = 0;
  let socialRange = 0;

  function overallGauge () {
    let sentimentSum = 0;
    let aCount = 0;
    vm.articles.forEach(a => {
      $log.log(a.sentiment);
      let num = a.sentiment;
      sentimentSum = sentimentSum + a.sentiment;
      aCount++;
    })
    $log.log('overall sum', sentimentSum)
    $log.log('overall count', aCount)
    let overallScore = 15;
    newOverallGauge();

    function newOverallGauge() {
      var overallGauge = createGauge('.overall-gauge', {
        size: 300,
        clipWidth: 300,
        clipHeight: 240,
        ringWidth: 150,
        maxValue: 100,
        transitionMs: 4000,
      });
        overallGauge.render();
        function updateReadings() {
          overallGauge.update(15);
        }
        updateReadings();
        // setInterval(function() {
        //   updateReadings();
        // }, 5 * 1000);
    }
  }

  function newGauge(article) {
    if (article.showGaugeCharts === 0) {
      article.showGaugeCharts++;
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
        article.impactScore = Math.round(((article.sentiment * 0.4) + (article.social * 0.6)) / 2);
        sentimentGauge.update(article.sentiment);
        socialGauge.update(article.social);
        impactGauge.update(article.impactScore);
      }

      updateReadings();
      // setInterval(function() {
      //   updateReadings();
      // }, 5 * 1000);
    }
  }

  function setGauges () {
    vm.articles.forEach(article => {
      if (vm.articles[article] >= 1) {
        newGauge(article);
      }
    });
  }

  function removeGauge (article) {
    if (article.showGaugeCharts) {
      d3.select('.sentiment-gauge').remove();
      d3.select('.social-gauge').remove();
      d3.select('.impact-gauge').remove();
    }
  }

  function cardFlip () {
    vm.isFlipped = !vm.isFlipped;
  }

  let unsafeUrl = 'Bitcoin slides below $2,000 as cryptocurrency selloff continues';

  let unsafeUrl2 = 'The FBI just took down AlphaBay, an online black market for drugs that was 10 times bigger than Silk Road';

  let unsafeUrl3 = 'GPU miners sell off graphics cards as ETH & BTC values drop';

  let unsafeUrl4 = 'Hacker steals $7.4 million in ethereum during CoinDash ICO launch | ZDNet';

  let unsafeUrl5 = 'Hacker steals more than $7 million in digital currency by switching a mere link';

  let unsafeUrl6 = 'Bitcoin swings as civil war looms';

  function getArticles () {
    newsService.getNews()
      .then(res => {
        vm.articlesRaw = getSecureUrl(res.data.articles.results);
        showSentiment(vm.articlesRaw);
        checkForSentiment(vm.articlesRaw);
        getTimeAgo(vm.articlesRaw, null);
        setGauges();
        getSocialScore(vm.articlesRaw);
        calculateSocial(vm.articlesRaw);
        let duplicates = [];
        vm.articlesRaw.forEach(article => {
          article.showGaugeCharts = 0;
          if (article.isDuplicate === true) {
            duplicates.push(article.uri);
          }
          let shouldInclude = (!article.isDuplicate && article.sentiment !== 0 && article.uri !== '690930357' && article.uri !== '690235957' && article.title !== unsafeUrl) && article.title !== unsafeUrl2 && article.title !== unsafeUrl3 && article.title !== unsafeUrl4 && article.title !== unsafeUrl5 && article.title !== unsafeUrl6 || article.uri === duplicates[0]
          if (shouldInclude) {
            vm.articles.push(article);
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
        let sentimentData = res.data;
        $log.log('sentimentData: ', res);
        articles.forEach(article => {
          sentimentData.forEach(s => {
            if (s.url === article.url) {
              article.sentiment = s.score;
              article.sentimentLabel = s.label;
            }
          });
        });
      })
      .catch(err => $log.log(err));
  }

  function checkForSentiment (articles) {
    articles.forEach(a => {
      newsService.checkSentiment(a.url)
        .then(res => {
          $log.log(res);
          let doesExist = res;
          if (typeof res.data === 'object') {
            $log.log('good responseFROMdb: ', res.data)
            a.sentiment = res.data.score;
            a.sentimentLabel = res.data.label;
          } else {
            $log.log('null responseFROMdb: ', res.data)
            newsService.addSentiment(a.url)
              .then(res => {
                $log.log('RES FROM ADDING SENTIMENT: ', res);
                a.sentiment = res.data.score;
                a.sentimentLabel = res.data.label;
              })
              .catch(err => $log.log(err));
          }
        })
        .catch(err => $log.log(err));
    })
  }

  function getSocialScore (articles) {
    vm.socialRangeArray = [];
    articles.forEach(article => {
      article.socialScore = 0;
      let shares = article.shares;
      for (let key in shares) {
        if (shares[key]) {
          let score = shares[key]
          article.socialScore += score;
        }
      }
      vm.socialRangeArray.push(article.socialScore);
    })

    vm.socialRangeArray.forEach(s => {
      if (s >= socialMax) {
        socialMax = s;
      }
      if (s <= socialMin) {
        socialMin = s;
      }
    })
    socialRange = socialMax - socialMin;
  }

  function calculateSocial (articles) {
    // function parseDate(s) {
    //   let mdy = s.split('/');
    //   return new Date(mdy[2], mdy[0]-1, mdy[1]);
    // }
    //
    // function daydiff(first, second) {
    //   return Math.round((second-first)/(1000*60*60*24));
    // }
    articles.forEach(a => {
      // console.log(daydiff(parseDate(a.date), parseDate()));
      let indicator;
      if (a.sentimentLabel === 'negative') {
        a.social = Math.round(((a.socialScore / socialRange) - 0.07) * 100 * -1);
      } else {
        a.social = Math.round(((a.socialScore / socialRange) - 0.07) * 100);
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
      let linkUrl = article.url;
      if (imgUrl.indexOf(/https:/) === 0 || linkUrl.indexOf(/https:/) === 0) {
        article.source.details.thumbImage = imgUrl;
        article.url = linkUrl;
        return article;
      } else if (imgUrl.indexOf(/http:/) === 0 && linkUrl.indexOf(/http:/) === 0) {
        article.source.details.thumbImage = imgUrl.replace(/http:/, 'https:');
        article.url = linkUrl.replace(/http:/, 'https:');
        return article;
      } else {
        article.source.details.thumbImage = imgUrl.replace(/http:/, 'https:');
        article.url = linkUrl.replace(/http:/, 'https:');
        $log.log('image url error!');
        return article;
      }
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

  		minValue					: 0,
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
