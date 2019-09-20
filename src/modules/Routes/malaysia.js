import TweenMax from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'

import 'debug.addIndicators'

const $ = q => document.querySelector(q)
const MOBILE = 'assets/maps/Malaysia/mobile/'

const Malaysia = {
	maps: [
    $('#malaysia-routes-1'),
    $('#malaysia-routes-2'),
	],
  pics_m: [
    `${MOBILE}m-01.jpg`,
    `${MOBILE}m-02.jpg`,
    `${MOBILE}m-03.jpg`,


    `${MOBILE}m-04.jpg`,
    `${MOBILE}m-05.jpg`,
    `${MOBILE}m-06.jpg`,
    `${MOBILE}m-07.jpg`,
  ],
  maps_m: [
    $('#malaysia-routes-m-1'),
    $('#malaysia-routes-m-2'),
    $('#malaysia-routes-m-3'),
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
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (2 * duration_per-navOffset), reverse: true})
    .setTween(
      new TimelineMax()
        .add(TweenMax.to($('#highway-line'), 0.7, {strokeDashoffset: 0, ease:Linear.easeNone}))
        .add(TweenMax.to([
          $('#bukit-text'), $('#marker-bukit')
          ], 0, visiable_opt), 0.7)
        .addCallback(()=>{
          pulseMarker([
            $('#marker-bukit'),
          ])
        }, 0.7)

        .add(TweenMax.to([
          $('#marker-rantau'), $('#marker-padang'), $('#padang-text'), $('#rantau-text')
          ], 0, visiable_opt), 0.8)
        .addCallback(()=>{
          pulseMarker([
            $('#marker-rantau'),
            $('#marker-padang'),
          ])
        }, 0.8)
    )
    .addTo(controller);

    return controller
}

Malaysia.MapCtrl2 = () => {
  var map = Malaysia.maps[1],
    visiable_opt = {opacity: 1, ease:Linear.easeNone},
    hidden_opt = {opacity: 0, ease:Linear.easeNone}

  var controller = new ScrollMagic.Controller();

  var navOffset = ($('.nav').offsetHeight + $('#progress-div').offsetHeight) || 0

  var pin_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: '400%', offset: (-navOffset), reverse: true})
    .on('enter', function(){
      this.setPin(this.triggerElement(), {pushFollowers: false})
    })
    .addTo(controller)

  var duration_per = pin_scene.duration() / 4

  var first_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (-navOffset), reverse: true})
    .on('start', (e) =>{
      var isForward = e.scrollDirection == 'FORWARD' ? true : false
      if (isForward){
        new TimelineMax()
          .add(TweenMax.to($('#marker-bukit-2'), 0.5, visiable_opt))
          .add(TweenMax.to($('#bukit-text-2'), 0.5, visiable_opt))
          .addCallback(()=>{
            pulseMarker([
              $('#marker-bukit-2')
            ])
          }, 1)
      } else {
        var targets = [$('#marker-bukit-2'), $('#bukit-text-2')]
        TweenMax.killTweensOf(targets)
        TweenMax.to(targets, 0.5, hidden_opt)
      }
    })
    .addTo(controller);

  var second_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (duration_per-navOffset), reverse: true})
    .on('start', (e) =>{
      var isForward = e.scrollDirection == 'FORWARD' ? true : false
      if (isForward){
        new TimelineMax()
          .add(TweenMax.to($('#marker-alor'), 0.5, visiable_opt))
          .add(TweenMax.to($('#alor-text'), 0.5, visiable_opt))
          .addCallback(()=>{
            pulseMarker([
              $('#marker-alor')
            ])
          }, 1)
      } else {
        var targets = [$('#marker-alor'), $('#alor-text')]
        TweenMax.killTweensOf(targets)
        TweenMax.to(targets, 0.5, hidden_opt)
      }
    })
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (2*duration_per-navOffset), reverse: true})
    .on('start', (e) =>{
      var isForward = e.scrollDirection == 'FORWARD' ? true : false
      if (isForward){
        new TimelineMax()
          .add(TweenMax.to($('#marker-sadao'), 0.5, visiable_opt))
          .add(TweenMax.to($('#sadao-text'), 0.5, visiable_opt))
          .addCallback(()=>{
            pulseMarker([
              $('#marker-sadao')
            ])
          }, 1)
      } else {
        var targets = [$('#marker-sadao'), $('#sadao-text')]
        TweenMax.killTweensOf(targets)
        TweenMax.to(targets, 0.5, hidden_opt)
      }
    })
    .addTo(controller);

  var forth_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (3*duration_per-navOffset), reverse: true})
    .on('start', (e) =>{
      var isForward = e.scrollDirection == 'FORWARD' ? true : false
      if (isForward){
        new TimelineMax()
          .add(TweenMax.to($('#marker-police'), 0.5, visiable_opt))
          .add(TweenMax.to($('#kedahpolice-text'), 0.5, visiable_opt))
          .addCallback(()=>{
            pulseMarker([
              $('#marker-police')
            ])
          }, 1)
      } else {
        var targets = [$('#marker-police'), $('#kedahpolice-text')]
        TweenMax.killTweensOf(targets)
        TweenMax.to(targets, 0.5, hidden_opt)
      }
    })
    .addTo(controller);

  return controller
}

Malaysia.MapCtrlM1 = () => {
  var map = Malaysia.maps_m[0]

  var controller = new ScrollMagic.Controller();

  var navOffset = ($('.nav').offsetHeight + $('#progress-div').offsetHeight) || 0

  var pin_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: '300%', offset: (-navOffset), reverse: true})
    .on('enter', function(){
      this.setPin(this.triggerElement(), {pushFollowers: false})
    })
    .addTo(controller)

  var duration_per = pin_scene.duration() / 3
  //first scene trigger inmediately on map pin, use onLeave triggerHook
  var second_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (duration_per-navOffset), reverse: true})
    .on('start', (e) => { switchByDir(e, map, Malaysia.pics_m[1], Malaysia.pics_m[0]) })
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (2*duration_per-navOffset), reverse: true})
    .on('start', (e) => { switchByDir(e, map, Malaysia.pics_m[2], Malaysia.pics_m[1]) })
    .addTo(controller);

  return controller
}

Malaysia.MapCtrlM2 = () => {
  var map = Malaysia.maps_m[1]

  var controller = new ScrollMagic.Controller();

  var navOffset = ($('.nav').offsetHeight + $('#progress-div').offsetHeight) || 0

  var pin_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: '400%', offset: (-navOffset), reverse: true})
    .on('enter', function(){
      this.setPin(this.triggerElement(), {pushFollowers: false})
    })
    .addTo(controller)

  var duration_per = pin_scene.duration() / 4
  //first scene trigger inmediately on map pin, use onLeave triggerHook
  var second_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (duration_per-navOffset), reverse: true})
    .on('start', (e) => { switchByDir(e, map, Malaysia.pics_m[4], Malaysia.pics_m[3]) })
    .addTo(controller);

  var thrid_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (2*duration_per-navOffset), reverse: true})
    .on('start', (e) => { switchByDir(e, map, Malaysia.pics_m[5], Malaysia.pics_m[4]) })
    .addTo(controller);

  var forth_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: duration_per, offset: (3*duration_per-navOffset), reverse: true})
    .on('start', (e) => { switchByDir(e, map, Malaysia.pics_m[6], Malaysia.pics_m[5]) })
    .addTo(controller);

  return controller
}

Malaysia.MapCtrlM3 = () => {
  var map = Malaysia.maps_m[2]

  var controller = new ScrollMagic.Controller();

  var navOffset = ($('.nav').offsetHeight + $('#progress-div').offsetHeight) || 0

  var pin_scene = new ScrollMagic.Scene({ triggerElement: map, triggerHook:'onLeave', duration: '100%', offset: (-navOffset), reverse: true})
    .on('enter', function(){
      this.setPin(this.triggerElement(), {pushFollowers: false})
    })
    .addTo(controller)
    
  return controller
}

function pulseMarker(markers){
	var inners = markers.map(item=>item.querySelector('.marker-inner'))
	var outters = markers.map(item=>item.querySelector('.marker-outter'))

	// TweenMax.fromTo(inners, 3, {attr:{r: 12.06}}, {attr:{r: 20}}).repeat(-1)//.yoyo(true)
	TweenMax.fromTo(outters, 1, {attr:{r: 20}, opacity: 0.4}, {attr:{r: 55.68}, opacity: 0}).repeat(-1)
}

function changeBg($map, src){
  //used only on mobile
	$map.querySelector('.routes-map-bg-m').src = src
}

function switchByDir(e, $map, src_old, src){
  var isForward = e.scrollDirection == 'FORWARD' ? true : false
    if (isForward){
      changeBg($map, src)
    } else {
      changeBg($map, src_old)
    }
}

export default Malaysia
