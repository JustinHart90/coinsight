'use strict'

import 'cors';

export default function D3PriceVolumeController (d3PriceVolumeService, $log) {
  const vm = this;
  vm.$onInit = $onInit

  vm.testdata = []
  vm.rawTradeData = []
  vm.tradeHistory = {}
  vm.tradeHistory = {}
  vm.currencyPair = 'XXBTZUSD'
  vm.interval = '1440'
  vm.since = '1495324800'
  let transactionDate = ''

  function $onInit () {
    candlestick();
    // poloniexData();
  }

  // function poloniexData () {
  //   d3PriceVolumeService.getBitUsd()
  //     .then(data => $log.log(data))
  //     .catch(err => $log.error(err.message))
  // }

  function candlestick () {
    d3PriceVolumeService.getTradeHistory(vm.currencyPair, vm.interval, vm.since)
      .then(data => {
        $log.log('raw trade history array: ', data.data.result[vm.currencyPair])
        vm.rawTradeData = data.data.result[vm.currencyPair]
        vm.rawTradeData.forEach(trade => {
          transactionDate = Date(+trade[0] * 1000)
          vm.tradeObject = {
            date: transactionDate,
            open: trade[1],
            high: trade[2],
            low: trade[3],
            close: trade[4],
            vwap: trade[5],
            volume: trade[6],
            count: trade[7]
          }
          vm.tradeHistory[trade[5]] = vm.tradeObject
        })
        $log.log('Trade History: ', vm.tradeHistory)
        return getD3()
      })
      .catch(err => $log.error(err))
  }

  function getD3 () {
    const svg = d3.select('svg.d3bar'),
      margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 80
      },
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - (margin.bottom * 2);

    let div = d3.select('body').append('div').attr('class', 'toolTip')

    let rates = [];

    Object.keys(vm.tradeHistory).forEach((key) => {
      rates.push({
        date: vm.tradeHistory[key].date,
        vwap: vm.tradeHistory[key].vwap
      });
    });
    $log.log('rates: ', rates)

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(Object.keys(vm.tradeHistory).map((d) => {
      return vm.tradeHistory[d].date;
    }));

    y.domain([2000, 2800]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(10))

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(7, '$'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.append('text')
      .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate(-' + (margin.left / 2) + ',' + (height / 2) + ')rotate(-90)') // text is drawn off the screen top left, move down and out and rotate
      .text('% DRI');

    g.append('text')
      .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      .text('Price & Volume History');

    g.selectAll('.bar')
      .data(rates)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => {
        return x(d.date);
      })

      .attr('y', (d) => {
        return height;
      })
      .attr('width', x.bandwidth())
      .transition()
      .duration(1000)
      .attr('y', (d) => {
        return y(d.vwap);
      })
      .attr('height', (d) => {
        return height - y(d.vwap);
      });

    d3.selectAll('.bar').on('mousemove', function(d) {
      div.style('left', d3.event.pageX + 10 + 'px');
      div.style('top', d3.event.pageY - 25 + 'px');
      div.style('display', 'inline-block');
      div.html((d.date) + '<br>' + (d.vwap) + 'BTC/ETH');
    });

    d3.selectAll('.bar').on('mouseout', function(d) {
      div.style('display', 'none');
    });
  }
}