import TweenMax from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import * as d3 from 'd3'

import 'debug.addIndicators'

const $ = q => document.querySelector(q)
const IMG = 'assets/maps/Malaysia/IMG/'
const SVG = 'assets/maps/Malaysia/SVG/'

const Malaysia = {
	jpgs: [
		`${IMG}map-01.jpg`,
		`${IMG}map-02.jpg`,
		`${IMG}map-03.jpg`,
		`${IMG}map-04.jpg`,
		`${IMG}map-05.jpg`,
		`${IMG}map-06.jpg`,
	],
	svgs:[
		`${SVG}Malaysia map-01.svg`,
		`${SVG}Malaysia map-02.svg`,
		`${SVG}Malaysia map-03.svg`,
		`${SVG}Malaysia map-04.svg`,
		`${SVG}Malaysia map-05.svg`,
		`${SVG}Malaysia map-06.svg`,
		`${SVG}Malaysia map-07.svg`,
	],
	maps: [
		$('#malaysia-routes-1'),
	]
}

Malaysia.SceneCtrl = () => {
	var controller = new ScrollMagic.Controller();

	// scroll tween
	var tween = new TimelineMax()
		
  var main_scene = new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: '150%', reverse: true})
    .setTween(tween)
    .on('enter', function(){
    	this.setPin(this.triggerElement())
    })
    .addIndicators()
    .addTo(controller);

  var duration = main_scene.duration()

  //auto play tweens
  var first_scene = new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: 0, reverse: true})
    .setTween(
    	new TimelineMax()
    		.add(TweenMax.to($('#arrows'), 0.5, {opacity: 1, ease:Linear.easeNone}))
				.add(TweenMax.to($('#melaka-label'), 0.5, {opacity: 1, ease:Linear.easeNone}))
				.add(TweenMax.to($('#caption01'), 0.5, {opacity: 1, ease:Linear.easeNone}))
    )
    .addTo(controller);

  var second_scene = new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: 0, offset: duration / 3, reverse: true})
    .setTween(
    	new TimelineMax()
    		//scene 1 elements exit
				.add(TweenMax.to($('#arrows'), 0.5, {opacity: 0, ease:Linear.easeNone}), 0)
				.add(TweenMax.to($('#melaka-label'), 0.5, {opacity: 0, ease:Linear.easeNone}), 0)
				.add(TweenMax.to($('#caption01'), 0.5, {opacity: 0, ease:Linear.easeNone}), 0)
				//forest enter
				.add(TweenMax.to($('#forest-fill'), 0.5, {opacity: 1, ease:Linear.easeNone}))
				.add(TweenMax.to($('#forest-label'), 0.3, {opacity: 1, ease:Linear.easeNone}))
    )
    .on('start', function(e){
    	var dir = e.scrollDirection,
    			scene = e.target
    	if (dir == 'FORWARD') {
    		changeBg(Malaysia.maps[0], Malaysia.jpgs[1])
    	} else {
    		changeBg(Malaysia.maps[0], Malaysia.jpgs[0])
    	}
    })
    .addIndicators()
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: 0, offset: duration * 2 / 3, reverse: true})
    .setTween(
    	new TimelineMax()
    		//forest exit
				.add(TweenMax.to($('#forest-fill'), 0.5, {opacity: 0, ease:Linear.easeNone}), 0)
				.add(TweenMax.to($('#forest-label'), 0.5, {opacity: 0, ease:Linear.easeNone}), 0)

    		.add(TweenMax.to($('polyline#thai-border'), 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
    		.add(TweenMax.to($('#thai-label'), 0.5, {opacity: 1, ease:Linear.easeNone}))
    )
    .on('start', function(e){
    	var dir = e.scrollDirection,
    			scene = e.target
    	if (dir == 'FORWARD') {
    		changeBg(Malaysia.maps[0], Malaysia.jpgs[2])
    	} else {
    		changeBg(Malaysia.maps[0], Malaysia.jpgs[1])
    	}
    })
    .addIndicators()
    .addTo(controller);
}

function changeBg($map, src){
	$map.querySelector('.routes-bg').src = src
}

const init = () => {
	Malaysia.SceneCtrl()
}

export default { init }
