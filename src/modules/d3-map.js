import * as d3 from 'd3'
// import * as topojson from 'topojson'

const D3MAP = {}
const $ = q => document.querySelector(q)

D3MAP.renderMap = function(){

	var color = d3.scaleLinear()
	    .domain([0, 58])
	    .range([d3.rgb("#cccccc"), d3.rgb("#08306b")])
	    // .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

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

	var width = $('#geo-map').getBBox().width
	var height = $('#geo-map').getBBox().height
	var projection = d3.geoMercator()
	                   .scale(130) //130 show full map, default 150
	                   // .translate([width / 2, height / 1.5]);

  //path generator: convert geojson feature to svg path
	var path = d3.geoPath().projection(projection);

	Promise.all([
	    d3.json("assets/maps/world_countries.json"),
	    d3.json("assets/maps/china.json"),
	])
	.then(ready)
	.catch(err=>{
		console.log('d3 data fetching err', err)
	})

	function ready(values) {
		var [world, china, population] = values

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

	  var china_province_data = [{'name': '上海', 'value': 4},{'name': '云南', 'value': 3},{'name': '内蒙古', 'value': 17},{'name': '北京', 'value': 17},{'name': '吉林', 'value': 58},{'name': '四川', 'value': 4},{'name': '天津', 'value': 17},{'name': '安徽', 'value': 3},{'name': '山东', 'value': 10},{'name': '山西', 'value': 18},{'name': '广东', 'value': 4},{'name': '广西', 'value': 1},{'name': '新疆', 'value': 1},{'name': '江苏', 'value': 3},{'name': '江西', 'value': 6},{'name': '河北', 'value': 22},{'name': '河南', 'value': 20},{'name': '浙江', 'value': 5},{'name': '湖北', 'value': 7},{'name': '湖南', 'value': 3},{'name': '甘肃', 'value': 5},{'name': '贵州', 'value': 7},{'name': '辽宁', 'value': 26},{'name': '重庆', 'value': 2},{'name': '陕西', 'value': 7},{'name': '青海', 'value': 3},{'name': '黑龙江', 'value': 28}]
	  var values_by_province = {}
	  china_province_data.forEach(d => { values_by_province[d.name] = +d.value; });
	  china.features.forEach(d => {d.value = values_by_province[d.properties.name] || 0})

		g_china
	    .selectAll("path")
	    .data(china.features)
	    .enter().append("path")
	      .attr("d", path)
	      .style("fill", function(d){ return color(d.value) })
	      .style('stroke', 'white')
	      .style('stroke-width', 0.3)
	      .style("opacity",0.8)
	}

	// zoom and pan , helper for now as munual zoom, confirm location of programatic zoom
	var zoom = d3.zoom()
	    .on("zoom",function() {
	        groups.forEach(g => {
	        	g.attr("transform",d3.event.transform)
	        })
	        // console.log(d3.event.transform)
	  });

	svg.call(zoom)

	function panZoom(transform){
		var {k, x, y} = transform
		groups.forEach(g => {
    	g.attr("transform",`translate(${x}, ${y}) scale(${k})`)
    })
    return g_world.attr('transform')
	}
}

export default D3MAP