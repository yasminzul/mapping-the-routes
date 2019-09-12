import * as d3 from 'd3'
// import * as topojson from 'topojson'

const D3MAP = {}
const $ = q => document.querySelector(q)

var colorScale = d3.scaleLinear()
    .domain([0, 58])
    .range([d3.rgb("#cccccc"), d3.rgb("#08306b")])

var radiusScale = d3.scaleSqrt()
    .range([2, 15]);

var svg = d3.select("#geo-map-container")
            .append("svg")
            .attr('x', 0)
            .attr('y', 0)
            .attr('viewBox', '0 0 960 500')
            .attr('id', 'geo-map');

var g_world = svg.append("g")
    							.attr("class", "countries")

var g_china = svg.append('g')
    							.attr("class", "china-provinces")

var groups = [g_world, g_china]

var width = $("#geo-map-container").offsetWidth
var height = $("#geo-map-container").offsetHeight
var projection = d3.geoMercator()
                   .scale(130) //130 show full map, default 150
                   // .translate([width / 2, height / 1.5]);

//path generator: convert geojson feature to svg path
var path = d3.geoPath().projection(projection);

var marginTitle = { top: 50, left: 50},
		title = svg.append("text")
	    .attr("class", "vis-title")
	    .attr("transform", "translate(" + marginTitle.left + "," + marginTitle.top + ")")
	    .text("# Pangolins (select a time range)");
var marginCount = { top: 20, left: 50},
		count = svg.append("text")
	    .attr("class", "seizure-total")
	    .attr("transform", "translate(" + marginCount.left + "," + marginCount.top + ")")
	    .text("0 Pangolins");

D3MAP.renderMap = function(){
	Promise.all([
	    d3.json("assets/maps/world_countries.json"),
	    d3.json("assets/maps/china.json"),
	    d3.csv("assets/data/valid-seizure-num-date.csv")
	])
	.then(ready)
	.catch(err=>{
		console.log('d3 err', err)
	})

	function ready(values) {
		var [world, china, seizures] = values
		renderChinaHeatmap(china)
		// timeline map reference: https://bl.ocks.org/domhorvath/dd850c5e97d4022fbf0f11611a0cf528
		var parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S')

		var dataForTimeline = [],
				dateCount = {};

	  var dataForMap = seizures.map(function(d, idx) {
	      d.TIME = parseDate(d['Date']);
	      d.ESTNUM = +d['ESTNUM'];
	      d.Latitude = +d['Latitude'];
	      d.Longitude = +d['Longitude'];

	      if (!dateCount[d.TIME]) {
	          dateCount[d.TIME] = d.ESTNUM
	      } else {
	          dateCount[d.TIME] += d.ESTNUM;
	      }
	      return d
	  });
	  
	  Object.keys(dateCount).forEach(function(time) {
      dataForTimeline.push({ TIME: new Date(time), ESTNUM: dateCount[time] });
    });
    dataForTimeline.sort(function(a,b) { return a.TIME - b.TIME; });

    radiusScale.domain(d3.extent(dataForMap, function(d) { return +d.ESTNUM; }));

    makeTimeline(dataForMap, dataForTimeline);

		var seizure_data_by_country = {}
		seizures.forEach(d => seizure_data_by_country[d.Country] = d)

		//match countries names
		for (name in seizure_data_by_country) {
			if (world.features.find(d => d.properties.name == name)) {

			}
			else {
				console.log(name)
			}
		}

		g_world
	    .selectAll("path")
	    .data(world.features)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", '#ccc')
	      .style('stroke', 'white')
	      .style('stroke-width', 1.5)
	      .style("opacity",0.8)
	      // tooltips
	        .style("stroke","white")
	        .style('stroke-width', 0.3)
	        .on('mouseover',function(d){
	          d3.select(this)
	            .style("opacity", 1)
	            .style("stroke","white")
	            .style("stroke-width",1);
	        })
	        .on('mouseout', function(d){
	          d3.select(this)
	            .style("opacity", 0.8)
	            .style("stroke","white")
	            .style("stroke-width",0.3);
	        });
	}

	// zoom and pan , helper for now as munual zoom, confirm location of programatic zoom
	var zoom = d3.zoom()
    .on("zoom",function() {
      groups.forEach(g => {
      	g.attr("transform",d3.event.transform)
      })
      // console.log(d3.event.transform)
  	});

	// svg.call(zoom)

	function panZoom(transform){
		var {k, x, y} = transform
		groups.forEach(g => {
    	g.attr("transform",`translate(${x}, ${y}) scale(${k})`)
    })
    return g_world.attr('transform')
	}
}

function makeTimeline(dataForMap, dataForTimeline) {
  var margin = { top: 10, right: 10, bottom: 20, left: 15 },
      w = $('#timeline-container').offsetWidth - margin.left - margin.right,
      h = 80 - margin.top  - margin.bottom;

  var timelineSvg = d3.select("#timeline-container").append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

  var timeline = timelineSvg.append("g")
      .attr("class", "timeline")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
      .domain(d3.extent(dataForTimeline.map(function(d) { return d.TIME; })))
      .range([0, w]);

  var y = d3.scaleLinear()
      .domain(d3.extent(dataForTimeline.map(function(d) { return d.ESTNUM; })))
      .range([h, 0]);

  var xAxis = d3.axisBottom(x)

  var yAxis = d3.axisRight(y)
  	.ticks(2)
  	.tickFormat(d3.format("~s"));;

  var area = d3.area()
      .x(function(d) { return x(d.TIME); })
      .y0(h)
      .y1(function(d) { return y(d.ESTNUM); });

  timeline.append("path")
      .datum(dataForTimeline)
      .attr("class", "area")
      .attr("d", area);

  timeline.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

  timeline.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  timeline.append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", "-1em")
      .style("text-anchor", "end")
      .style("font-size", '8px')
      .text("# Pangolins");

  // Add brush to timeline, hook up to callback\
  //brush reference: http://rajvansia.com/scatterplotbrush-d3-v4.html
  var brush = d3.brushX()
      .extent([[0, 0], [w, h]]) // brushable area
      .on("brush end", function() { brushCallback(dataForMap, x); })
  var initial_range = [new Date(2000, 1, 1), new Date(2001, 12, 31)].map(x)
  timeline.append("g")
      .attr("class", "brush")
      .call(brush)
			.call(brush.move, initial_range)
};

// Called whenever the timeline brush range (extent) is updated
// Filters the map data to those points that fall within the selected timeline range
function brushCallback(dataForMap, x) {
  var newDateRange = d3.event.selection.map(x.invert) || x.domain()
  var filteredData = dataForMap.filter(d => (d.TIME >= newDateRange[0] && d.TIME <= newDateRange[1]) )
  updateMapPoints(filteredData)
  updateTitleText(newDateRange, filteredData);
}

// Updates the vis title text to include the passed date array: [start Date, end Date]
function updateTitleText(newDateArray, filteredData) {
    if (!newDateArray) {
        title.text("Pangolin seizures (select a time range)");
    } else {
        var from = (newDateArray[0].getMonth() + 1) + "/" +
                   (newDateArray[0].getDay() + 1) + "/" +
                   newDateArray[0].getFullYear(),
            to =   (newDateArray[1].getMonth() + 1) + "/" +
                   (newDateArray[1].getDay() + 1) + "/" +
                   newDateArray[1].getFullYear();
        title.text("Pangolin seizures " + from + " - " + to);
    }
    //update count
    var total = filteredData.map(d=>+d.ESTNUM).reduce((acc, cur)=>acc+cur)
    count.text(`${total} Pangolins`)
}

// Updates the points displayed on the map, to those in the passed data array
function updateMapPoints(data) {
    var circles = svg.selectAll("circle").data(data, function(d) { return d.TIME + d.ESTNUM; });

    circles // update existing points
        // .on("mouseover", tipMouseover)
        // .on("mouseout", tipMouseout)
        .attr("fill", "rgba(0, 0, 255, 0.3)")
        .attr("cx", function(d) { return projection([+d.Longitude, +d.Latitude])[0]; })
        .attr("cy", function(d) { return projection([+d.Longitude, +d.Latitude])[1]; })
        .attr("r",  function(d) { return radiusScale(+d.ESTNUM); });

    circles.enter().append("circle") // new entering points
        // .on("mouseover", tipMouseover)
        // .on("mouseout", tipMouseout)
        .attr("fill", "rgba(0, 0, 255, 0.3)")
        .attr("cx", function(d) { return projection([+d.Longitude, +d.Latitude])[0]; })
        .attr("cy", function(d) { return projection([+d.Longitude, +d.Latitude])[1]; })
        .attr("r",  0)
      .transition()
        .duration(500)
        .attr("r",  function(d) { return radiusScale(+d.ESTNUM); });

    circles.exit() // exiting points
        .attr("r",  function(d) { return radiusScale(+d.ESTNUM); })
      .transition()
        .duration(500)
        .attr("r", 0).remove();
};

function renderChinaHeatmap(china){
  var china_province_data = [{'name': '上海', 'value': 4},{'name': '云南', 'value': 3},{'name': '内蒙古', 'value': 17},{'name': '北京', 'value': 17},{'name': '吉林', 'value': 58},{'name': '四川', 'value': 4},{'name': '天津', 'value': 17},{'name': '安徽', 'value': 3},{'name': '山东', 'value': 10},{'name': '山西', 'value': 18},{'name': '广东', 'value': 4},{'name': '广西', 'value': 1},{'name': '新疆', 'value': 1},{'name': '江苏', 'value': 3},{'name': '江西', 'value': 6},{'name': '河北', 'value': 22},{'name': '河南', 'value': 20},{'name': '浙江', 'value': 5},{'name': '湖北', 'value': 7},{'name': '湖南', 'value': 3},{'name': '甘肃', 'value': 5},{'name': '贵州', 'value': 7},{'name': '辽宁', 'value': 26},{'name': '重庆', 'value': 2},{'name': '陕西', 'value': 7},{'name': '青海', 'value': 3},{'name': '黑龙江', 'value': 28}]
  var values_by_province = {}
  china_province_data.forEach(d => { values_by_province[d.name] = +d.value; });
  china.features.forEach(d => {d.value = values_by_province[d.properties.name] || 0})

	g_china
    .selectAll("path")
    .data(china.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d){ return colorScale(d.value) })
      .style('stroke', 'white')
      .style('stroke-width', 0.3)
      .style("opacity",0.8)
}
export default D3MAP