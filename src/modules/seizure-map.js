import * as d3 from 'd3'
// import * as topojson from 'topojson'

const SeizureMap = {}
const $ = q => document.querySelector(q)

var radiusScale = d3.scaleSqrt()
    .range([5, 25]);

var svg = d3.select("#geo-map-container")
            .append("svg")
            .attr('x', 0)
            .attr('y', 0)
            .attr('viewBox', '0 0 960 500')
            .attr('id', 'geo-map')

var bg = svg.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', '#3b3b3b')

var g_world = svg.append("g")
    							.attr("class", "countries")

var projection = d3.geoMercator()
                   .scale(150) //130 show full map, default 150
                   // .translate([width / 2, height / 1.5]);

//path generator: convert geojson feature to svg path
var path = d3.geoPath().projection(projection);

var title = svg.append("text")
	    .attr("class", "vis-title")
	    .attr("transform", "translate(" + 50 + "," + 460 + ")")
      .text('pangolin trafficked')

var range = title.append('tspan').attr('x', 0).attr('dy', '1.3em')
	    .text("(select a time range)");

//add red bg
var count_bg = svg.append('rect')
      .attr("transform", "translate(" + 40 + "," + 420 + ")")
      .attr('fill', 'red')

var count_text =  svg.append("text")
      .attr("transform", "translate(" + 50 + "," + 420 + ")")
	    .attr("class", "seizure-total")
	    .text("0");

//timeline svg and g init
var timelineSvg = d3.select("#timeline-container").append("svg")
var timeline = timelineSvg.append("g").attr("class", "timeline")
// var bursh_g = timeline.append("g").attr("class", "brush")

// tooltips
var bartip = d3.select('.container').append('div')
    .attr('class', 'bartip')
    .style('display', 'none');

SeizureMap.renderMap = function(){
	Promise.all([
	    d3.json("assets/maps/world_countries.json"),
	    d3.csv("assets/data/valid-seizure-num-date.csv")
	])
	.then(ready)
	.catch(err=>{
		console.log('d3 err', err)
	})

	function ready(values) {
		var [world, seizures] = values
		// timeline map reference: https://bl.ocks.org/domhorvath/dd850c5e97d4022fbf0f11611a0cf528
		var parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S')

		var dataForTimeline = [],
				dateCount = {};

	  var dataForMap = seizures.map(function(d, idx) {
	      d.TIME = parseDate(d['Date']);
        d.YEAR = d.TIME.getFullYear() //Seizure year, not the same as 'Year' in original
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
    autoplay(dataForMap)

		g_world
	    .selectAll("path")
	    .data(world.features)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", '#694b2d')
	      .style('stroke', '#3b3b3b')
	      .style('stroke-width', 0.5)
	      .style("opacity",0.8)
	}
}

function makeTimeline(dataForMap, dataForTimeline) {
  var margin = { top: 10, right: 10, bottom: 20, left: 15 },
      w = $('#timeline-container').offsetWidth - margin.left - margin.right,
      h = 80 - margin.top  - margin.bottom;

 	timelineSvg
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

  timeline
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //calculate sum of each year
  var year_sums = {}
  dataForTimeline.forEach(d =>{
  	var year = d.TIME.getFullYear() + ""
  	if (!year_sums[year]) {
  		year_sums[year] = 0
  	}
  	year_sums[year] += +d.ESTNUM
  })

  var bar_data = Object.keys(year_sums).map(year => ({
  	TIME: new Date(+year, 1, 1),
  	TOTAL: year_sums[year]
  }))

  var x = d3.scaleTime()
      .domain(d3.extent(dataForTimeline.map(function(d) { return d.TIME; })))
      .range([0, w]);

  var y = d3.scaleLinear()
      .domain(d3.extent(bar_data.map(function(d) { return d.TOTAL; })))
      .range([h, 0]);

  var xAxis = d3.axisBottom(x)

  var yAxis = d3.axisRight(y)
  	.ticks(3)
  	.tickFormat(d3.format("~s"));;

 	timeline.append("g")
 			.attr("class", "bars")
 			.selectAll('rect')
 			.data(bar_data, function(d){return d.id})
 			.enter().append('rect').attr("class", 'bar')
 			.style('fill', "#dcba7d")
 			.attr('x', function(d){return x(d.TIME)})
 			.attr('width', (Math.round(w / 20) - 10)+'px')
 			.attr('y', function(d){return y(d.TOTAL)})
 			.attr("height", function(d) { return h - y(d.TOTAL); })
      .on('mouseover', function (){
        bartip.style('display', 'inline');
        d3.select(this).style('opacity', 0.5)
      })
      .on('mousemove', function (d){
        bartip
          .html(d.TIME.getFullYear() + '<hr/>' + d.TOTAL)
          .style('left', (d3.event.pageX - 34) + 'px')
          .style('top', (d3.event.pageY - 12) + 'px');
      })
      .on('mouseout', function (){
        bartip.style('display', 'none');
        d3.select(this).style('opacity', 1)
      })


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
  // var brush = d3.brushX()
  //     .extent([[0, 0], [w, h]]) // brushable area
  //     .on("brush end", function() { brushCallback(dataForMap, x); })
  // var initial_range = [new Date(2000, 1, 1), new Date(2001, 12, 31)].map(x)
  
  // bursh_g
  //     .call(brush)
  //   	 .call(brush.move, initial_range)
};

// Called whenever the timeline brush range (extent) is updated
// Filters the map data to those points that fall within the selected timeline range
// function brushCallback(dataForMap, x) {
// 	if (!d3.event.selection){
//   	updateTitleText(null, []);
//   	updateMapPoints([])
//   	return
// 	}
//   var newDateRange = d3.event.selection.map(x.invert) || x.domain()
//   var filteredData = dataForMap.filter(d => (d.TIME >= newDateRange[0] && d.TIME <= newDateRange[1]) )
//   updateMapPoints(filteredData)
//   updateTitleText(newDateRange, filteredData);
// }

// Updates the vis title text to include the passed date array: [start Date, end Date]
function updateTitleText(newDateArray, filteredData) {
    if (!newDateArray) {
        range.text("Pangolin seizures (select a time range)");
    } else {
        var from = (newDateArray[0].getMonth() + 1) + "/" +
                   (newDateArray[0].getDay() + 1) + "/" +
                   newDateArray[0].getFullYear(),
            to =   (newDateArray[1].getMonth() + 1) + "/" +
                   (newDateArray[1].getDay() + 1) + "/" +
                   newDateArray[1].getFullYear();
        range.text(from + " - " + to);
    }
    //update count
    var total = filteredData.map(d=>+d.ESTNUM).reduce((acc, cur)=>acc+cur, 0)
    count_text.text(`${d3.format(',')(Math.round(total))}`)
    count_bg
      .attr('x', count_text.node().getBBox().x)
      .attr('y', count_text.node().getBBox().y)
      .attr('width', +count_text.node().getBBox().width + 20)
      .attr('height', '6.5em')
}

// Updates the points displayed on the map, to those in the passed data array
function updateMapPoints(data, year) {
    var circles = svg.selectAll("circle").data(data, function(d) { return d.id });

    if (year == "2000") { //reset
      svg.selectAll("circle").remove()
    }

    circles.enter().append("circle") // new entering points
        .attr("fill", "rgba(240, 135, 24, 0.3)")
        .attr("cx", function(d) { return projection([+d.Longitude, +d.Latitude])[0]; })
        .attr("cy", function(d) { return projection([+d.Longitude, +d.Latitude])[1]; })
        .attr("r",  0)
      .transition()
        .duration(500)
        .attr("r",  function(d) { return radiusScale(+d.ESTNUM); });

    circles.exit() // exiting points
      .transition()
        .duration(500)
        .attr("fill", "rgba(201, 62, 62, 0.3)")
};

function autoplay(data){
  var years = []
  data.map(d=> {
    if (years.indexOf(d.YEAR) < 0) years.push(d.YEAR)
  })
  var curr_idx = 0
  var changeYear = function(){
    var curr_year = years[curr_idx % years.length]
    var yearData = data.filter(d=>d.YEAR == curr_year)
    updateMapPoints(yearData, curr_year)
    curr_idx += 1

    //update range 
    range.text("2000 - " + curr_year);
    //update count
    var total = data.filter(d=> +d.YEAR <= curr_year).map(d=>d.ESTNUM).reduce((acc, cur)=> acc + cur, 0)
    count_text.text(`${d3.format(',')(Math.round(total))}`)
    count_bg
      .attr('x', count_text.node().getBBox().x)
      .attr('y', count_text.node().getBBox().y)
      .attr('width', +count_text.node().getBBox().width + 20)
      .attr('height', '6.5em')
  }
  return setInterval(changeYear, 1000)
}

export default SeizureMap