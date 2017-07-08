
import autobahn from 'autobahn';
// import Poloniex from 'poloniex-api-node';
// vm.poloniex = ''
// vm.poloniex = new Poloniex();

export default function d3PriceVolumeService ($http, $log) {
  const vm = this
  vm.movieData
  vm.getTradeHistory = getTradeHistory;
  vm.getFeed = getFeed;
  vm.apiKey = '11938d3660b328fb2c7a3a87e50fa540'
  vm.wsuri = ''
  vm.connection = ''
  vm.tradeHistoryUrl = ''

  function getTradeHistory (pair, interval, since) {
    vm.tradeHistoryUrl = 'http://microlens-proxy.herokuapp.com/?url=https://api.kraken.com/0/public/OHLC?pair=' + pair + '&interval=' + interval + '&since=' + since
    return $http
      .get(vm.tradeHistoryUrl)
      .then(res => res)
      .catch(err => $log.error(err))
  }

  // function getBitUsd () {
  //   return Poloniex.returnTicker()
  //     .then(ticker => ticker)
  //     .catch(err => $log.log(err));
  // }

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
    	session.subscribe('USD_BTC', marketEvent);
    	session.subscribe('ticker', tickerEvent);
    	session.subscribe('trollbox', trollboxEvent);
    }

    vm.connection.onclose = function () {
      $log.log('Websocket connection closed');
    }

    vm.connection.open();
  }
}
