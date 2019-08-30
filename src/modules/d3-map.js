import * as d3 from 'd3'
// import * as topojson from 'topojson'

const D3MAP = {}
const $ = q => document.querySelector(q)

D3MAP.renderMap = function(){

	var color = d3.scaleThreshold()
	    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
	    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

	var svg = d3.select("#geo-map-container")
	            .append("svg")
	            .attr('x', 0)
	            .attr('y', 0)
	            .attr('viewBox', '0 0 960 500')
	            .attr('id', 'geo-map');

	var width = $('#geo-map').getBBox().width
	var height = $('#geo-map').getBBox().height
	var projection = d3.geoMercator()
	                   .scale(130)
	                   // .translate([width / 2, height / 1.5]);

	var path = d3.geoPath().projection(projection);

	Promise.all([
	    d3.json("assets/maps/world_countries.json"),
	    d3.json("assets/maps/china.json"),
	    d3.tsv("assets/data/world_population.tsv"),
	])
	.then(ready)
	.catch(err=>{
		console.log('d3 data fetching err', err)
	})

	function ready(values) {
		var [world, china, population] = values
	  var populationById = {};

	  population.forEach(function(d) { populationById[d.id] = +d.population; });
	  world.features.forEach(function(d) { d.population = populationById[d.id] });

	var g_world = svg.append("g")
	    .attr("class", "countries")
	    .selectAll("path")
	    .data(world.features)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", function(d) { return color(populationById[d.id]); })
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

		var g_china = svg.append('g')
	    .attr("class", "china-provinces")
	    .selectAll("path")
	    .data(china.features)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", 'none')
	      .style('stroke', 'white')
	      .style('stroke-width', 0.3)
	      .style("opacity",0.8)
	}
}

export default D3MAP