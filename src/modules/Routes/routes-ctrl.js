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

Malaysia.MapCtrl1 = () => {
  var map = Malaysia.maps[0],
      visiable_opt = {opacity: 1, ease:Linear.easeNone},
      hidden_opt = {opacity: 0, ease:Linear.easeNone}

  var controller = new ScrollMagic.Controller();

  var navOffset = ($('.nav').offsetHeight + $('#progress-div').offsetHeight) || 0

  var pin_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: '300%', offset: (-navOffset), reverse: true})
    .on('enter', function(){
      this.setPin(this.triggerElement(), {pushFollowers: false})
    })
    .addTo(controller)

  var duration_per = pin_scene.duration() / 3

  //first scene trigger inmediately on map pin, use onLeave triggerHook
  var first_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (-navOffset), reverse: true})
    .on('enter', () =>
      new TimelineMax()
        .add(TweenMax.to($('#arrows'), 0.5, visiable_opt))
        .add(TweenMax.to($('#melaka-label'), 0.5, visiable_opt))
    )
    .on('leave', () => {
      var targets = [$('#arrows'), $('#melaka-label')]
      TweenMax.killTweensOf(targets)
      TweenMax.to(targets, 0.5, hidden_opt)
    })
    .addTo(controller);

  var second_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (duration_per-navOffset), reverse: true})
    .on('enter', () =>
      new TimelineMax()
        .add(TweenMax.to($('#forest-fill'), 0.5, visiable_opt))
        .add(TweenMax.to($('#forest-label'), 0.3, visiable_opt))
    )
    .on('leave', () => {
      var targets = [$('#forest-fill'), $('#forest-label')]
      TweenMax.killTweensOf(targets)
      TweenMax.to(targets, 0.5, hidden_opt)
    })
    .on('start', function(e){
      var dir = e.scrollDirection,
          scene = e.target
      if (dir == 'FORWARD') {
        changeBg(map, Malaysia.jpgs[1])
      } else {
        changeBg(map, Malaysia.jpgs[0])
      }
    })
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (2 * duration_per-navOffset), reverse: true})
    .on('start', function(e){
      var dir = e.scrollDirection,
          scene = e.target
      if (dir == 'FORWARD') {
        changeBg(map, Malaysia.jpgs[2])

        new TimelineMax()
          .add(TweenMax.to($('polyline#thai-border'), 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
          .add(TweenMax.to($('#thai-label'), 0.5, visiable_opt))
      } else {
        changeBg(map, Malaysia.jpgs[1])

        var targets = [$('polyline#thai-border'), $('#thai-label')]
        TweenMax.killTweensOf(targets)

        new TimelineMax()
          .add(TweenMax.to($('polyline#thai-border'), 0.3, {strokeDashoffset: 3579.52, ease:Linear.easeNone}), 0)
          .add(TweenMax.to($('#thai-label'), 0.3, hidden_opt), 0)
      }
    })
    .setTween(
      new TimelineMax()
        .add(TweenMax.to($('#thai-line'), 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
        .add(TweenMax.to([
          $('#bukit-text'), $('#marker-bukit')
          ], 0.2, visiable_opt), 1)
        .addCallback(()=>{
          pulseMarker([
            $('#marker-bukit'),
          ])
        }, 1.2)

        .add(TweenMax.to([
          $('#marker-rantau'), $('#marker-padang'), $('#padang-text'), $('#rantau-text')
          ], 0.2, visiable_opt), 1.2)
        .addCallback(()=>{
          pulseMarker([
            $('#marker-rantau'),
            $('#marker-padang'),
          ])
        }, 1.4)
    )
    .addTo(controller);
}

function pulseMarker(markers){
	var inners = markers.map(item=>item.querySelector('.marker-inner'))
	var outters = markers.map(item=>item.querySelector('.marker-outter'))

	// TweenMax.fromTo(inners, 3, {attr:{r: 12.06}}, {attr:{r: 20}}).repeat(-1)//.yoyo(true)
	TweenMax.fromTo(outters, 1, {attr:{r: 20}, opacity: 0.4}, {attr:{r: 55.68}, opacity: 0}).repeat(-1)
}

function changeBg($map, src){
	$map.querySelector('.routes-map-bg').src = src
}

const init = () => {
  Malaysia.MapCtrl1()
}

export default { init }
