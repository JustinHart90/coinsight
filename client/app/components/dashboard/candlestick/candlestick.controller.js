'use strict'

import 'cors';

export default function CandlestickController (candlestickService, $log, moment) {
  const vm = this;
  vm.$onInit = $onInit;
  vm.resetD3 = resetD3;

  vm.dateOption = dateOption;
  vm.sma0Tool = sma0Tool;
  vm.sma1Tool = sma1Tool;
  vm.emaTool = emaTool;
  vm.macdTool = macdTool;
  vm.rsiTool = rsiTool;
  vm.calculateResizeFactor = calculateResizeFactor;
  vm.changeCoin = changeCoin;

  vm.testdata = []
  vm.rawTradeData = []
  vm.tradeHistory = {}
  vm.tradeHistory = {}
  let transactionDate = ''
  vm.selectedCoinOption = 'BTC/USD';
  vm.coins = [
    {name: 'BTC/USD'},
    {name: 'ETH/USD'},
    {name: 'LTC/USD'}
  ];

  function $onInit () {
    vm.dateOptionText = '3 Months'
    vm.showAdvancedTools = false;
    vm.showSma0 = false;
    vm.showSma1 = false;
    vm.showEma = false;
    vm.showMacd = false;
    vm.showRsi = false;
    getD3(vm.dateOptionText, 0);
  }

  function changeCoin (coin) {
    $log.log('coin in changeCoin function: ', coin);
    vm.selectedCoinOption = coin.name;
    resetD3();
    return getD3(vm.dateOptionText, 0);
  }

  function dateOption (e, selectedOption) {
    e.preventDefault();
    vm.dateOptionText = selectedOption;
    resetD3();
    return getD3(selectedOption, 0);
  }

  function sma0Tool (e) {
    e.preventDefault();
    vm.showSma0 = !vm.showSma0;
    resetD3();
    return getD3(vm.dateOptionText, 0);
  }

  function sma1Tool (e) {
    e.preventDefault();
    vm.showSma1 = !vm.showSma1;
    resetD3();
    return getD3(vm.dateOptionText, 0);
  }

  function emaTool (e) {
    e.preventDefault();
    vm.showEma = !vm.showEma;
    resetD3();
    return getD3(vm.dateOptionText, 0);
  }

  function macdTool (e) {
    e.preventDefault();
    vm.showMacd = !vm.showMacd;
    let factor = calculateResizeFactor();
    resetD3();
    return getD3(vm.dateOptionText, factor);
  }

  function rsiTool (e) {
    e.preventDefault();
    vm.showRsi = !vm.showRsi;
    let factor = calculateResizeFactor();
    resetD3();
    return getD3(vm.dateOptionText, factor);
  }

  function calculateResizeFactor () {
    let resizeFactor = 0;
    if (vm.showMacd && vm.showRsi) {
      resizeFactor = 2;
    } else if (vm.showMacd || vm.showRsi) {
      resizeFactor = 1;
    }
    return resizeFactor;
  }

  function candlestickChart () {
    return getD3(vm.dateOptionText)
    // candlestickService.getTradeData()
    //   .then(data => {
    //     $log.log('candlestick raw trade history array: ', data.data)
    //     vm.rawTradeData = data.data
    //     vm.rawTradeData.forEach(trade => {
    //       let t = new Date(+trade['time'] * 1000);
    //       // t.setSeconds();
    //       let formatted = moment(t).format('MM.DD');
    //       transactionDate = formatted
    //       vm.tradeObject = {
    //         date: transactionDate,
    //         open: +trade['open'],
    //         high: +trade['high'],
    //         low: +trade['low'],
    //         close: +trade['close'],
    //         vwap: +trade['vwap'],
    //         volume: +trade['volume'],
    //         count: trade['count']
    //       }
    //       vm.tradeHistory[trade['id']] = vm.tradeObject
    //     })
    //     $log.log('Candlestick Trade History: ', vm.tradeHistory)
    //     return getD3()
    //   })
    //   .catch(err => $log.error(err))
  }

  function resetD3 () {
    d3.select('.candleChart').selectAll('*').remove();
    d3.select('.candleSvg').append('svg.candleChart');
  }

  function getD3 (dynamicDate, resizeFactor) {
    d3.select(window).on('resize', reset);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let dimWidth;
    let dimHeight;

    // function resize () {
    //   /* Find the new window dimensions */
    //   var width = parseInt(d3.select("#graph").style("width")) - margin * 2,
    //   height = parseInt(d3.select("#graph").style("height")) - margin * 2;
    //
    //   /* Update the range of the scale with new width/height */
    //   xScale.range([0, width]).nice(d3.time.year);
    //   yScale.range([height, 0]).nice();
    //
    //   /* Update the axis with the new scale */
    //   graph.select('.x.axis')
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    //   graph.select('.y.axis')
    //     .call(yAxis);
    //
    //   /* Force D3 to recalculate and update the line */
    //   graph.selectAll('.line')
    //     .attr("d", line);
    //   /* Find the new window dimensions */
    //   var width = parseInt(d3.select("#graph").style("width")) - margin*2,
    //   height = parseInt(d3.select("#graph").style("height")) - margin*2;
    //
    //   /* Update the range of the scale with new width/height */
    //   xScale.range([0, width]).nice(d3.time.year);
    //   yScale.range([height, 0]).nice();
    //
    //   /* Update the axis with the new scale */
    //   graph.select('.x.axis')
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    //   graph.select('.y.axis')
    //     .call(yAxis);
    //
    //   /* Force D3 to recalculate and update the line */
    //   graph.selectAll('.line')
    //     .attr("d", line);
    // }

    // let svgContainerWidth = Math.round(parseFloat(d3.select('div.candleSvg').style('width')));
    // let svgContainerHeight = Math.round(parseFloat(d3.select('div.candleSvg').style('height')));
    //
    // $log.log('container width', svgContainerWidth);
    // $log.log('container height', svgContainerHeight);

    if (window.innerWidth <= 801) {
      d3.select('div.candleSvg')
        .attr('width', '100vw')
        .attr('height', '84vh');

      d3.select('#hide-when-small')
        .attr('width', '90vw')
        .attr('height', '100vh');

      dimWidth = screenWidth;
      dimHeight = screenHeight;
    } else {
      dimWidth = screenWidth * 0.67;
      dimHeight = screenHeight * 0.72;
    }

    $log.log('SVG HEIGHT: ', dimHeight);
    $log.log('SVG WIDTH: ', dimWidth);

    let ohlcHeight = dimHeight * 0.85;
    if (resizeFactor === 1) {
      ohlcHeight = dimHeight * 0.75;
      $log.log('screenHeight: ', screenHeight)
      $log.log('resizeFactor: ', resizeFactor)
      $log.log('ohlcHeight: ', ohlcHeight)
    } else if (resizeFactor === 2) {
      ohlcHeight = dimHeight * 0.65;
    }

    var dim = {
      width: dimWidth, height: dimHeight,
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      ohlc: { height: ohlcHeight },
      indicator: { height: 65, padding: 5 }
    };
    dim.plot = {
      width: dim.width - dim.margin.left - dim.margin.right,
      height: dim.height - dim.margin.top - dim.margin.bottom
    };
    dim.indicator.top = dim.ohlc.height + dim.indicator.padding;
    dim.indicator.bottom = dim.indicator.top + dim.indicator.height + dim.indicator.padding;

    var indicatorTop = d3.scaleLinear()
      .range([dim.indicator.top, dim.indicator.bottom]);

    var parseDate = d3.timeParse('%d-%b-%y');

    var zoom = d3.zoom()
      .on('zoom', zoomed);

    var x = techan.scale.financetime()
      .range([0, dim.plot.width]);

    var y = d3.scaleLinear()
      .range([dim.ohlc.height, 0]);

    var yPercent = y.copy();   // Same as y at this stage, will get a different domain later

    var yInit, yPercentInit, zoomableInit;

    var yVolume = d3.scaleLinear()
      .range([y(0), y(0.2)]);

    var candlestick = techan.plot.candlestick()
      .xScale(x)
      .yScale(y);

    var sma0 = techan.plot.sma()
      .xScale(x)
      .yScale(y);

    var sma1 = techan.plot.sma()
      .xScale(x)
      .yScale(y);

    var ema2 = techan.plot.ema()
      .xScale(x)
      .yScale(y);

    var volume = techan.plot.volume()
      .accessor(candlestick.accessor())   // Set the accessor to a ohlc accessor so we get highlighted bars
      .xScale(x)
      .yScale(yVolume);

    var trendline = techan.plot.trendline()
      .xScale(x)
      .yScale(y);

    var supstance = techan.plot.supstance()
      .xScale(x)
      .yScale(y);

    var xAxis = d3.axisBottom(x);

    var timeAnnotation = techan.plot.axisannotation()
      .axis(xAxis)
      .orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d'))
      .width(65)
      .translate([0, dim.plot.height]);

    var yAxis = d3.axisRight(y);

    var ohlcAnnotation = techan.plot.axisannotation()
      .axis(yAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);

    var percentAxis = d3.axisLeft(yPercent)
      .tickFormat(d3.format('+0.1%'));

    var percentAnnotation = techan.plot.axisannotation()
      .axis(percentAxis)
      .orient('left');

    var volumeAxis = d3.axisRight(yVolume)
      .ticks(3)
      .tickFormat(d3.format(',.3s'));

    var volumeAnnotation = techan.plot.axisannotation()
      .axis(volumeAxis)
      .orient('right')
      .width(35);

    let macdScale = d3.scaleLinear()
      .range([indicatorTop(0), indicatorTop(0)]);
    let rsiScale = macdScale.copy()
      .range([indicatorTop(1), indicatorTop(1)]);

    if (vm.showMacd) {
      macdScale = d3.scaleLinear()
        .range([indicatorTop(0) + dim.indicator.height, indicatorTop(0)]);
    }

    if (vm.showRsi) {
      rsiScale = macdScale.copy()
        .range([indicatorTop(1) + dim.indicator.height, indicatorTop(1)]);
    }

    var macd = techan.plot.macd()
      .xScale(x)
      .yScale(macdScale);

    var macdAxis = d3.axisRight(macdScale)
      .ticks(3);

    var macdAnnotation = techan.plot.axisannotation()
      .axis(macdAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);

    var macdAxisLeft = d3.axisLeft(macdScale)
      .ticks(3);

    var macdAnnotationLeft = techan.plot.axisannotation()
      .axis(macdAxisLeft)
      .orient('left')
      .format(d3.format(',.2f'));

    var rsi = techan.plot.rsi()
      .xScale(x)
      .yScale(rsiScale);

    var rsiAxis = d3.axisRight(rsiScale)
      .ticks(3);

    var rsiAnnotation = techan.plot.axisannotation()
      .axis(rsiAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);

    var rsiAxisLeft = d3.axisLeft(rsiScale)
      .ticks(3);

    var rsiAnnotationLeft = techan.plot.axisannotation()
      .axis(rsiAxisLeft)
      .orient('left')
      .format(d3.format(',.2f'));

    let macdCrosshairHeight;
    let rsiCrosshairHeight;

    vm.showMacd ? macdCrosshairHeight = 0 : macdCrosshairHeight = dim.plot.height
    vm.showRsi ? rsiCrosshairHeight = 0 : rsiCrosshairHeight = dim.plot.height

    var ohlcCrosshair = techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(ohlcAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([ohlcAnnotation, percentAnnotation, volumeAnnotation])
      .verticalWireRange([0, dim.plot.height]);

    var macdCrosshair = techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(macdAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([macdAnnotation, macdAnnotationLeft])
      .verticalWireRange([0, macdCrosshairHeight]);

    var rsiCrosshair = techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(rsiAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([rsiAnnotation, rsiAnnotationLeft])
      .verticalWireRange([0, rsiCrosshairHeight]);

    var svg = d3.select('svg.candleChart')
      .attr('width', dim.width)
      .attr('height', dim.height);

    var defs = svg.append('defs');

    defs.append('clipPath')
      .attr('id', 'ohlcClip')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', dim.plot.width)
      .attr('height', dim.ohlc.height)

    defs.selectAll('indicatorClip')
      .data([0, 1])
      .enter().append('clipPath')
      .attr('id', (d, i) => 'indicatorClip-' + i)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', dim.plot.width)
      .transition()
      .duration(1000)
      .attr('y', (d, i) => indicatorTop(i))
      .attr('height', dim.indicator.height);

    svg = svg.append('g')
      .attr('transform', 'translate(' + dim.margin.left + ',' + dim.margin.top + ')');

    // svg.on({
    //   'mouseover': (d) => {
    //     d3.select(this).style('cursor', 'grab !important')
    //   },
    //   'mousedown': (d) => {
    //     d3.select(this).style('cursor', 'grabbing')
    //   },
    //   'mouseout': (d) => {
    //     d3.select(this).style('cursor', 'default')
    //   }
    // });

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + dim.plot.height + ')');

    // svg.selectAll('rect')
    //   .attr('x', Math.min.apply(null, xRange))
    //   .attr('y', Math.min.apply(null, yRange))
    //   .attr('height', Math.abs(yRange[yRange.length-1] - yRange[0]))
    //   .attr('width', Math.abs(xRange[xRange.length-1] - xRange[0]))
    //   .on('mouseenter', () => {
    //     dispatcher.call('enter', this);
    //   })
    //   .on('mouseout', () => {
    //     dispatcher.call('out', this);
    //     // Redraw with null values to ensure when we enter again, there is nothing cached when redisplayed
    //     delete group.node().__coord__;
    //     initialiseWire(group.datum()); // Mutating data, don't need to manually pass down
    //     refresh(group, pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
    //   })
    //   .on('mousemove', mousemoveRefresh(group, pathVerticalSelection, pathHorizontalSelection,
    //     xAnnotationSelection, yAnnotationSelection)
    //   );

    var ohlcSelection = svg.append('g')
      .attr('class', 'ohlc')
      .attr('transform', 'translate(0,0)');

    ohlcSelection.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + x(1) + ',0)')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -12)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    ohlcSelection.append('g')
      .attr('class', 'volume')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'candlestick')
      .attr('clip-path', 'url(#ohlcClip)')

    if (vm.showSma0) {
      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-0')
        .attr('clip-path', 'url(#ohlcClip)');
    }

    if (vm.showSma1) {
      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-1')
        .attr('clip-path', 'url(#ohlcClip)');
    }

    if (vm.showEma) {
      ohlcSelection.append('g')
        .attr('class', 'indicator ema ma-2')
        .attr('clip-path', 'url(#ohlcClip)');
    }

    ohlcSelection.append('g')
      .attr('class', 'percent axis');

    ohlcSelection.append('g')
      .attr('class', 'volume axis');

    var indicatorSelection = svg.selectAll('svg > g.indicator').data(['macd', 'rsi']).enter()
      .append('g')
      .attr('class', function(d) { return d + ' indicator'; });

    if (vm.showMacd) {
      indicatorSelection.append('g')
        .attr('class', 'axis right')
        .attr('transform', 'translate(' + x(1) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'axis left')
        .attr('transform', 'translate(' + x(0) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'indicator-plot')
        .attr('clip-path', function(d, i) { return 'url(#indicatorClip-' + i + ')'; });

      svg.append('g')
        .attr('class', 'crosshair macd');
    }

    if (vm.showRsi) {
      svg.append('g')
        .attr('class', 'crosshair rsi');
    }

    svg.append('g')
      .attr('class', 'crosshair ohlc');

    d3.select('.resetButton').on('click', reset);

    $log.log('selectedCoin: ', vm.selectedCoinOption);

    let dataFile = 'btc.csv';

    if (vm.selectedCoinOption === 'ETH/USD') {
      dataFile = 'eth.csv';
    } else if (vm.selectedCoinOption === 'LTC/USD') {
      dataFile = 'ltc.csv';
    }

    d3.csv(dataFile, (error, data) => {
      $log.log('ALL THE DATA:', data);
      let dataLength = 0;
      if (dynamicDate === '1 Week') {
        dataLength = 7;
      }
      if (dynamicDate === '1 Month') {
        dataLength = 31;
      }
      if (dynamicDate === '3 Months') {
        dataLength = 90;
      }
      if (dynamicDate === '6 Months') {
        dataLength = 183;
      }
      if (dynamicDate === '1 Year') {
        dataLength = 365;
      }
      if (dynamicDate === '3 Years') {
        dataLength = data.length;
      }

      let newData = []
      let accessor = candlestick.accessor();
      let indicatorPreRoll = newData.length * (2 / 3);

      if (dataLength > 0) {
        for (let i = dataLength - 1; i >= 0; i--) {
          newData.push(data[i])
        }
      }

      if (newData.length) {
        data = newData.map(function(d) {
          return {
            date: parseDate(d.Date),
            open: +d.Open,
            high: +d.High,
            low: +d.Low,
            close: +d.Close,
            volume: +d.Volume
          };
        }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });
      } else {
        data = data.map(function(d) {
          return {
            date: parseDate(d.Date),
            open: +d.Open,
            high: +d.High,
            low: +d.Low,
            close: +d.Close,
            volume: +d.Volume
          };
        }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });
      }

      x.domain(techan.scale.plot.time(data).domain());
      y.domain(techan.scale.plot.ohlc(data.slice(indicatorPreRoll)).domain());
      yPercent.domain(techan.scale.plot.percent(y, accessor(data[indicatorPreRoll])).domain());
      yVolume.domain(techan.scale.plot.volume(data).domain());

      var macdData = techan.indicator.macd()(data);
      macdScale.domain(techan.scale.plot.macd(macdData).domain());

      var rsiData = techan.indicator.rsi()(data);
      rsiScale.domain(techan.scale.plot.rsi(rsiData).domain());

      svg.select('g.candlestick').datum(data).call(candlestick);

      svg.select('g.volume').datum(data).call(volume);

      if (vm.showSma0) {
        svg.select('g.sma.ma-0').datum(techan.indicator.sma().period(10)(data)).call(sma0);
      }
      if (vm.showSma1) {
        svg.select('g.sma.ma-1').datum(techan.indicator.sma().period(20)(data)).call(sma1);
      }
      if (vm.showEma) {
        svg.select('g.ema.ma-2').datum(techan.indicator.ema().period(50)(data)).call(ema2);
      }
      if (vm.showMacd) {
        svg.select('g.macd .indicator-plot').datum(macdData).call(macd);
        svg.select('g.crosshair.macd').call(macdCrosshair).call(zoom).on('wheel.zoom', null);
      }
      if (vm.showRsi) {
        svg.select('g.rsi .indicator-plot').datum(rsiData).call(rsi);
        svg.select('g.crosshair.rsi').call(rsiCrosshair).call(zoom).on('wheel.zoom', null);
      }

      svg.select('g.crosshair.ohlc').call(ohlcCrosshair).call(zoom).on('wheel.zoom', null);

      zoomableInit = x.zoomable().domain([indicatorPreRoll, data.length]).copy();
      yInit = y.copy();
      yPercentInit = yPercent.copy();

      draw();
    });

    function reset() {
      // zoom.scale(1);
      // zoom.translate([0,0]);
      draw();
    }

    function zoomed() {
      x.zoomable().domain(d3.event.transform.rescaleX(zoomableInit).domain());
      y.domain(d3.event.transform.rescaleY(yInit).domain());
      yPercent.domain(d3.event.transform.rescaleY(yPercentInit).domain());

      draw();
    }

    function draw() {
      svg.select('g.x.axis').call(xAxis);
      svg.select('g.ohlc .axis').call(yAxis);
      svg.select('g.volume.axis').call(volumeAxis);
      svg.select('g.percent.axis').call(percentAxis);

      if (vm.showMacd) {
        svg.select('g.macd .axis.right').call(macdAxis);
        svg.select('g.macd .axis.left').call(macdAxisLeft);
      }

      if (vm.showRsi) {
        svg.select('g.rsi .axis.right').call(rsiAxis);
        svg.select('g.rsi .axis.left').call(rsiAxisLeft);
      }

      // We know the data does not change, a simple refresh that does not perform data joins will suffice.
      svg.select('g.candlestick').call(candlestick.refresh);
      svg.select('g.volume').call(volume.refresh);

      if (vm.showSma0) {
        svg.select('g .sma.ma-0').call(sma0.refresh);
      }

      if (vm.showSma1) {
        svg.select('g .sma.ma-1').call(sma1.refresh);
      }

      if (vm.showEma) {
        svg.select('g .ema.ma-2').call(ema2.refresh);
      }

      if (vm.showMacd) {
        svg.select('g.macd .indicator-plot').call(macd.refresh);
        svg.select('g.crosshair.macd').call(macdCrosshair.refresh);
      }

      if (vm.showRsi) {
        svg.select('g.rsi .indicator-plot').call(rsi.refresh);
        svg.select('g.crosshair.rsi').call(rsiCrosshair.refresh);
      }

      svg.select('g.crosshair.ohlc').call(ohlcCrosshair.refresh);
    }
  }
}
