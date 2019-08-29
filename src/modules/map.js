import TimelineLite from 'TimelineLite'

import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'

import MapSVG from './Map/map-svg.js'
import Tooltip from './tooltip.js'

const $ = q => document.querySelector(q)
const $$ = q => document.querySelectorAll(q)

const Map = ()=> {}

Map.initMap = () => {
  $('#map-container').innerHTML = MapSVG
}

const renderPath = (id)=>{
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const g = document.createElementNS(SVG_NS,"g")
  g.innerHTML = `
    <path 
      d="M628.1,220.9c-0.9-4.7-1.7-11.9,0.2-20c1.2-5,2.9-8.3,3.6-9.9c3.1-6.6,5.8-17.9,3.1-37.9" 
      id="${id}" 
      class="path">
    </path>
    <circle class="path-stop" cx="628.1" cy="220.9" r="1" data-location="changlun"></circle>
    `
  
  $('#map-groups').appendChild(g)

  return $(`#${id}`)
}

const pathPrepare = $path => {
  var lineLength = $path.getTotalLength()
  $path.style.strokeDasharray = lineLength
  $path.style.strokeDashoffset = lineLength
  return lineLength
}

Map.initScrollController = ()=>{
  const $groups = $('#map-groups')
  const $path = renderPath('my-path')
  const $container = $('#map-container')
  // prepare SVG
  pathPrepare($path)

  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween
  var tween = new TimelineLite()
    //map pan and zoom
    .add(new TimelineLite().to($groups, 0.2, {transform: 'scale(8, 8) translate(-580px, -180px)', ease:Linear.easeNone}), 0)
    .add(new TimelineLite().to($groups, 0.8, {transform: 'scale(8, 8) translate(-580px, -130px)', ease:Linear.easeNone}), 0.2)
    //draw svg path
    .add(new TimelineLite().to($path, 0.8, {strokeDashoffset: 0, ease:Linear.easeNone}), 0.2)
    // change color during the whole thing
    .add(new TimelineLite().to($path, 1, {stroke: "#33629c", ease:Linear.easeNone}), 0)

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: $container, triggerHook: 'onLeave', duration: $('#trigger1').offsetHeight, tweenChanges: true})
          .setPin($container, {pushFollowers: false})
          .setTween(tween)
          // .addIndicators()
          .addTo(controller);
}

Map.initTooltip = ()=>{
  const stops = $$('.path-stop')
  stops.forEach(stop => {
    stop.addEventListener('click', evt=>{
      Tooltip.toggle(evt, stop.dataset.location)
    })
  })
}

export default Map