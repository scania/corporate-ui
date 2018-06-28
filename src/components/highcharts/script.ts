
declare var Highcharts: any;

Highcharts.setOptions({
  colors: ['#ceb888', '#c8c9c7', '#94a596', '#041e42', '#53565a', '#97999b', '#2c5234', '#e35205', '#9ba5b4', '#f1a982', '#ebe3cf'],
  chart: {
    style: {
      fontFamily: 'Scania Sans Condensed'
    }
  },
  global: {useUTC: false}
});

Highcharts.Polymer_BaseBehavior = {
  properties: {
    type: {type: String, observer: '_updateType'},
    title: {type: String, observer: "_titleUpdate"},
    subtitle: {type: String, observer: "_subtitleUpdate"},
    colorByPoint: {type: Boolean, value: false, reflectToAttribute:true, observer: "_cbpUpdate"},
    credits: {type: Boolean, value: false, reflectToAttribute:true, observer: "_creditsUpdate"},
    legend: {type: Boolean, value: false, reflectToAttribute:true, observer: "_legendUpdate"},
    chartOptions: {type: Object, value: function(){return {}}, observer: "_chartUpdate"},
    plotOptions: {type: Object, value: function(){return {}}, observer: "_plotUpdate"},
    xAxis: {type: Object, value: function(){return {}}, observer: "_xAxisUpdate"},
    yAxis: {type: Object, value: function(){return {}}, observer: "_yAxisUpdate"},
    xLabel: {type: String, value: "", observer: "_xAxisTitleUpdate"},
    yLabel: {type: String, value: "", observer: "_yAxisTitleUpdate"},
    label: {type: String, value: "", observer: "_labelUpdate"},
    data: {type: Array, value: function(){return []}, observer:"_dataUpdate"},
    export: {type: Boolean, value: false, reflectToAttribute: true, observer: "_exportingUpdate"},
    xZoom: {type: Boolean, value: false, reflectToAttribute: true, observer: "_zoomUpdate"},
    yZoom: {type: Boolean, value: false, reflectToAttribute: true, observer: "_zoomUpdate"},
    loading: {type: Boolean, value: false, observer: "_loadingUpdate", reflectToAttribute:true},
    loadingMessage: {type: String, value: ""},
    //Custom Chart Declarations
    legendOptions: {type: Object, value: function(){return {}}, observer: "_legendOptionsUpdate"},
    tooltipOptions: {type: Object, value: function(){return {}}, observer: "_tooltipOptionsUpdate"},
    highchartOptions: {type: Object, value: function(){return {}}, observer: "_hcUpdate"},
    _chart: {type: Object, readOnly: true},
    __microTaskDelaySetData: {type: Number, value: 25}},
  created: function() {this.__lateBindCallbacks = $.extend({}, this.__lateBindCallbacks, {_updateType:1,_loadingUpdate:1})},
  __createChart: function(namespace) {
    var xAxis = $.extend(this.vsTime?{type: 'datetime',tickPixelInterval: 150}:{},this.xAxis, {title: {text: this._getAxisLabel('X')}});
    var yAxis = $.extend(this.yAxis, {title: {text: this._getAxisLabel('Y')}});
    var Series = this.data.length && this.data[0].data instanceof Array?this.data:[{name: (this.label||this.yLabel||this.xLabel),colorByPoint: this.colorByPoint, data: this.data}]
    var __app = this
    this._set_chart(new Highcharts[namespace||"Chart"]($.extend(true,{},{
      chart: $.extend({
        renderTo: __app.$.Chart,
        defaultSeriesType: this.type,
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          click: function(e){__app.fire("chart-click",{e: e,chart: this,component:__app})},
          load: function(e){__app.fire("chart-load",{e: e,chart: this,component:__app})},
          beforePrint: function(e){__app.fire("before-print",{e: e,chart: this,component:__app})},
          afterPrint: function(e){__app.fire("after-print",{e: e,chart: this,component:__app})},
          addSeries: function(e){__app.fire("series-added",{e: e,chart: this,component:__app})},
          drilldown: function(e){__app.fire("drill-down",{e: e,chart: this,component:__app})},
          drillup: function(e){__app.fire("drill-up",{e: e,chart: this,component:__app})},
          selection: function(e){__app.fire("selection",{e: e,chart: this,component:__app})},
        }
      },this.xZoom||this.yZoom?{zoomType: (this.xZoom&&"x")+(this.yZoom&&"y")}:{},this.chartOptions),
      //Properties
  
      title: {
        text: this.title,
        style: {
          color: '#041e42',
          fontFamily: 'Scania Sans Headline',
        },
      },
      subtitle: {text: this.subtitle},
      xAxis: xAxis,
      yAxis: yAxis,
      credits: {enabled: this.credits},
      plotOptions: $.extend({
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {color: (Highcharts.theme||[]).contrastTextColor||'black'}
          }
        }
      }, this.plotOptions),
      tooltip: $.extend(this.vsTime?{formatter: function () {
          return '<b>'+this.series.name+'</b><br>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br>' +
            Highcharts.numberFormat(this.y, 2);
        }}:{},this.tooltipOptions),
      legend: $.extend({enabled: this.legend},this.legendOptions),
      exporting: {enabled: this.export},
      series: Series,
      drilldown: {series: []}
    },this.highchartOptions)))
    this.async(this.resizeChart,50)
    this.async(this.__lateBinders,50)
  },
  setData: function(x,z) {
    var __app = this, isArr = x instanceof Array;
    if (!isArr) {x = $.extend({name: (this.label||this.yLabel||this.xLabel),colorByPoint: this.colorByPoint},x)}
    if (x && x.length && x[0].data instanceof Array) {
      __app.async(function(){while (__app._chart.series.length) {__app.removeSeries(0,false)};x.forEach(function(d){__app._chart.addSeries(d)})},__app.__microTaskDelaySetData)
    } else {__app._getSeries(z)[isArr?"setData":"update"](x)}
  },
  addData: function(x,y,z,drillable) {this.pushData(x,y,z,true,drillable)},
  pushData: function(x,y,z,append,drillable) {
    if (typeof z=="boolean") {drillable = z;z=0}
    this._getSeries(z).addPoint(drillable?{name:x,y:y,drilldown:true}:[x,y],true,!append)
  },
  addSeries: function(name,data,colorByPoint,otherOptions) {this._chart.addSeries($.extend({name: name, data: (data||[]), colorByPoint: typeof colorByPoint=="undefined"?this.colorByPoint:colorByPoint},typeof otherOptions == "object"?otherOptions:{}),true)},
  addDrillSeries: function(point,data,name) {this._chart.addSeriesAsDrilldown(point, {name: name, data: data})},
  removeSeries: function(z,redraw) {var s = this._getSeries(z);s.remove(redraw);return s},
  updateSeries: function(k,v,z) {var NewEl = {};if(typeof k=="object"){NewEl = k;z=v||z}else{NewEl[k]=v};this._getSeries(z).update(NewEl)},
  resizeChart: function() {if(!this._chart){return}this._chart.reflow()},
  resizeChartFixed: function() {if(!this._chart){return}this._chart.setSize(this.$.Chart.offsetWidth,this.offsetHeight)},
  reRender: function() {if(!this._chart){return}this._set_chart(new Highcharts.Chart(this._chart.options));this.setData(this.data);this.__lateBinders()},
  downloadAs: function(name,otherOptions) {if(!this._chart){return}this._chart.exportChart($.extend({filename: name},otherOptions))},
  destroy: function() {if(!this._chart){return}this._chart.destroy()},
  showLoading: function(d) {this.loadingMessage=d;this.loading=true},
  zoomOut: function() {if(!this._chart){return};this._chart.zoomOut()},
  getSeries: function(z) {return this._getSeries(z)},
  _getSeries: function(z) {if(!this._chart){return this._returnDummySeries()};z=typeof z != "number"?0:z;var s=this._chart.series;if(!s.length){this._warn("Chart is empty [no series]");return this._returnDummySeries()};if (z<s.length){return s[(z||0)]}else{this._warn("Index z out of bounds");return this._returnDummySeries()}},
  _dataUpdate: function(d) {this.setData(d.slice?d.slice(0):d)},
  _warn: function(err,c) {console.warn("%c[highcharts-chart"+(c?"::"+c:'')+"]","font-weight:bold;background-color:yellow",err)},
  _creditsUpdate: function(c) {if(!this._chart){return};this._chart.update({credits: {enabled: c}})},
  _legendUpdate: function(s) {if(!this._chart){return};this._chart.legend.update({enabled: s})},
  _legendOptionsUpdate: function(o) {if(!this._chart){return};this._chart.legend.update(o)},
  _tooltipOptionsUpdate: function(o) {if(!this._chart){return};this._chart.tooltip.update(o)},
  _plotUpdate: function(o) {if(!this._chart){return};this._chart.update({plotOptions: o})},
  _chartUpdate: function(o) {if(!this._chart){return};Object.keys(o||{}).length && this._warn("Not doing what you wanted, maybe you meant plotOptions?","chartOptions");this._chart.update({chart: o})},
  _exportingUpdate: function(x) {if(!this._chart){return};this._chart.update({exporting: {enabled: x}})},
  _updateType: function() {if(!this.type){return};this.updateSeries("type",this.type)},
  _cbpUpdate: function() {this.updateSeries("colorByPoint",this.colorByPoint)},
  _xAxisUpdate: function() {if(!this._chart){return};this._chart.xAxis[0].update(this.xAxis)},
  _yAxisUpdate: function() {if(!this._chart){return};this._chart.yAxis[0].update(this.yAxis)},
  _zoomUpdate: function() {if(!this._chart){return};this._chart.update({chart: {zoomType: ""+(this.xZoom?"x":'')+(this.yZoom?"y":'')}})},
  _xAxisTitleUpdate: function() {if(!this._chart){return};this._chart.xAxis[0].update({title: {text: this._getAxisLabel('X')}})},
  _yAxisTitleUpdate: function() {if(!this._chart){return};this._chart.yAxis[0].update({title: {text: this._getAxisLabel('Y')}})},
  _labelUpdate: function() {if(!this._chart){return};this._xAxisTitleUpdate();this._yAxisTitleUpdate()},
  _titleUpdate: function() {if(!this._chart){return};this._chart.setTitle({text: this.title})},
  _loadingUpdate: function() {if(!this._chart){return};this._chart[(this.loading?"show":"hide")+"Loading"](this.loadingMessage)},
  _subtitleUpdate: function() {if(!this._chart){return};this._chart.setTitle(null,{text: this.subtitle})},
  _hcUpdate: function(o) {if(!this._chart){return};this._chart.update(o)},
  //Other Bindings
  _getAxisLabel: function(dim) {var l = dim.toLowerCase(),u = dim.toUpperCase(),lab = this[l+"Label"]||this.label;if(lab==u+"-Axis"){lab=this.label||lab};return lab.trim()},
  _returnDummySeries: function(){var f=function(){};return {isDummy: true, setData: f, addPoint: f, update: f,remove: f}},
  __lateBinders: function(){var me = this;Object.keys(this.__lateBindCallbacks||{}).forEach(function(cb){me[cb]()})},
  __addLateBinder: function(cb){if (!(cb instanceof Array)){cb = [cb]};if(!this.__lateBindCallbacks){this.__lateBindCallbacks={}};var me = this;cb.forEach(function(c){me.__lateBindCallbacks[c]=1})},
};

Highcharts.Polymer_ChartBehavior = {
  properties: {
    vsTime: {type: Boolean, value: false, reflectToAttribute: true, observer: "_vsTimeUpdate"},
    selected: {type: Boolean, value: false, readOnly: true, notify: true, reflectToAttribute: true},
    selectedPoints: {type: Array, readOnly: true, notify: true}},
  created: function(){this.__addLateBinder("_vsTimeUpdate")},
  _vsTimeUpdate: function(a) {if(!this._chart || typeof a == "undefined"){return};this.destroy();this.ready()},
  _checkSelected: function() {if(!this._chart){return};var points = this._chart.getSelectedPoints();this._setSelected(!!points.length);this._setSelectedPoints(points)}
};

Polymer({
  is: name,
  behaviors: [
    Highcharts.Polymer_BaseBehavior,
    Highcharts.Polymer_ChartBehavior
  ],
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    type: {
      type: String,
      value: 'spline',
      observer: '_updateType'
    },
    height: {
      type: String,
      value: '400px'
    }
  },
  ready: function() {
    Polymer.updateStyles({
      '--highcharts-height': this.height
    });

    this.__createChart();
  }
})