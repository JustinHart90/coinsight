'use strict'
import autobahn from 'autobahn'

function homeService ($http, $log) {
  const vm = this
  vm.movieData
  vm.getTradeHistory = getTradeHistory;
  vm.getFeed = getFeed;
  vm.apiKey = '11938d3660b328fb2c7a3a87e50fa540'
  vm.wsuri = ''
  vm.connection = ''
  vm.tradeHistoryUrl = ''

  function getTradeHistory () {
    vm.tradeHistoryUrl = 'https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_NXT'
    return $http
      .get(vm.tradeHistoryUrl)
      .then(res => res)
      .catch(err => $log.error(err))
  }

  function getFeed () {
    vm.wsuri = 'wss://api.poloniex.com';
    vm.connection = new autobahn.Connection({
      url: vm.wsuri,
      realm: 'realm1'
    });

    vm.connection.onopen = function (session) {
    	function marketEvent (args,kwargs) {
    		$log.log(args);
    	}
    	function tickerEvent (args,kwargs) {
    		$log.log(args);
    	}
    	function trollboxEvent (args,kwargs) {
    		$log.log(args);
    	}
    	session.subscribe('BTC_XMR', marketEvent);
    	session.subscribe('ticker', tickerEvent);
    	session.subscribe('trollbox', trollboxEvent);
    }

    vm.connection.onclose = function () {
      $log.log('Websocket connection closed');
    }

    vm.connection.open();
  }
}

export default homeService;
