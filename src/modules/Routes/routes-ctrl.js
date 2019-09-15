import TweenMax from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import * as d3 from 'd3'

import 'debug.addIndicators'

const $ = q => document.querySelector(q)

const Malaysia = {
	jpgs: [
		'assets/maps/Malaysia/IMG/map-01.jpg',
		'assets/maps/Malaysia/IMG/map-02.jpg',
		'assets/maps/Malaysia/IMG/map-03.jpg',
		'assets/maps/Malaysia/IMG/map-04.jpg',
		'assets/maps/Malaysia/IMG/map-05.jpg',
		'assets/maps/Malaysia/IMG/map-06.jpg',
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
				curImg: 1,	// animate propery curImg to number of images
				roundProps: "curImg",				// only integers so it can be used as an array index
				// repeat: 3,									// repeat 3 times
				immediateRender: true,			// load first image automatically
				ease: Linear.easeNone,			// show every image the same ammount of time
				onUpdate: function () {
				  changeBg(Malaysia.maps[0], Malaysia.jpgs[obj.curImg])// set the image source
				}
			}
		), 0)

  new ScrollMagic.Scene({ triggerElement: Malaysia.maps[0], triggerHook:'onLeave', duration: 500})
    .setTween(tween)
    .on('enter', function(){
    	this.setPin(this.triggerElement())
    })
    .addIndicators()
    .addTo(controller);
}

function changeBg($map, src){
	$map.querySelector('.routes-bg').src = src
}

Malaysia.SceneCtrl()
