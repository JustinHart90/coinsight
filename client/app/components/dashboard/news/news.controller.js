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
        article.impactScore = Math.round((article.sentiment * 0.4) + (article.social * 0.6));
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

  let unsafeUrl3 = 'https://www.zdnet.com/article/hacker-steals-7-4m-in-ethereum-during-coindash-ico-launch/';

  function getArticles () {
    newsService.getNews()
      .then(res => {
        vm.articlesRaw = getSecureUrl(res.data.articles.results);
        showSentiment(vm.articlesRaw);
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
          let shouldInclude = (!article.isDuplicate && article.sentiment !== 0 && article.uri !== '690930357' && article.uri !== '690235957' && article.title !== unsafeUrl) && article.title !== unsafeUrl2 && article.title !== unsafeUrl3 || article.uri === duplicates[0]
          if (shouldInclude) {
            vm.articles.push(article);
          }
        })
        $log.log('REFINED LIST: ', vm.articles)
        vm.articles.showArticleDetails = false;
        vm.articles.unshift({
          body: "Bitcoin is soaring on Thursday, trading up 13.01% at $2,576 a coin. The cryuptocurrency continues to rally as traders look ahead to the August 1 decision on whether or not bitcoin will be split in two. Thursday's gain has the cryptocurrency up 40% from its July 17 low of $1,852. That's the day bitcoin tumbled 20% amid renewed fears it would be split in two.",
          created_at: '2017-07-20T10:50:00Z',
          date: '2017-07-17',
          dateTime: '2017-07-20T10:50:00Z',
          image: 'http://www.socialbliss.com/assets/favicons/favicon-50ff351d794f9.ico',
          source: {
            details: {
              thumbImage: 'http://www.socialbliss.com/assets/favicons/favicon-50ff351d794f9.ico'
            }
          },
          sim: '0.6078431606292725',
          socialScore: 3039,
          sentiment: 24,
          sentimentLabel: 'positive',
          isDuplicate: false,
          url: 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=newssearch&cd=2&cad=rja&uact=8&ved=0ahUKEwjOzfqusZjVAhVksVQKHVKOA2kQqQIILygAMAE&url=http%3A%2F%2Fwww.businessinsider.com%2Fbitcoin-price-explodes-above-2500-2017-7&usg=AFQjCNFBkvxgKc4Y5mYT4JtC-K1kro-hVQ',
          title: 'Bitcoin explodes above $2500',
          social: 70,
          impactScore: 31,
          showGaugeCharts: 0
        })
      })
      .catch(err => $log.log(err))
  }

  function showSentiment (articles) {
    return newsService.getSentiment()
      .then(res => {
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
      })
      .catch(err => $log.log(err));
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
    $log.log('socialRange', socialRange);

    // calculateSocial(range);
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
      $log.log('sentimentLabel', a.sentimentLabel);
      if (a.sentimentLabel === 'negative') {
        a.social = Math.round(((a.socialScore / socialRange) + 0.05) * 100 * -1);
      } else {
        a.social = Math.round(((a.socialScore / socialRange) + 0.05) * 100);
      }
      $log.log('a.social', a.social)
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
