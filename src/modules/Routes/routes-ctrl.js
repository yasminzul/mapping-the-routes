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

	// TweenMax can tween any property of any object. We use this object to cycle through the array
	var obj = {curImg: 0};

	// create tween
	var tween = new TimelineMax()
		.add(TweenMax.to(obj, 1,
			{
				curImg: 2,	// animate propery curImg to number of images
				roundProps: "curImg",				// only integers so it can be used as an array index
				// repeat: 3,									// repeat 3 times
				immediateRender: true,			// load first image automatically
				ease: Linear.easeNone,			// show every image the same ammount of time
				onUpdate: function () {
				  changeBg(Malaysia.maps[0], Malaysia.jpgs[obj.curImg])// set the image source
				}
			}), 0)
		//map 1 part 1
		.add(TweenMax.to($('#arrows'), 0.3, {opacity: 1, ease:Linear.easeNone}), 0)
		.add(TweenMax.to($('#melaka-label'), 0.3, {opacity: 1, ease:Linear.easeNone}), 0.1)
		.add(TweenMax.to($('#caption01'), 0.3, {opacity: 1, ease:Linear.easeNone}), 0.1)


		.add(TweenMax.to($('#arrows'), 0.2, {opacity: 0, ease:Linear.easeNone}), 0.3)
		.add(TweenMax.to($('#melaka-label'), 0.1, {opacity: 0, ease:Linear.easeNone}), 0.4)
		.add(TweenMax.to($('#caption01'), 0.1, {opacity: 0, ease:Linear.easeNone}), 0.4)

		//map1 part 2
		.add(TweenMax.to($('#forest-fill'), 0.5, {opacity: 1, ease:Linear.easeNone}), 0.5)
		.add(TweenMax.to($('#forest-label'), 0.3, {opacity: 1, ease:Linear.easeNone}), 0.7)

  new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: '150%', reverse: true})
    .setTween(tween)
    .on('enter', function(){
    	this.setPin(this.triggerElement())
    })
    .addTo(controller);
}

function changeBg($map, src){
	$map.querySelector('.routes-bg').src = src
}

const init = () => {
	Malaysia.SceneCtrl()
}

export default { init }
