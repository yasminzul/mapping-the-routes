import TweenMax from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'

const $ = q => document.querySelector(q)
const Map = ()=> {}
const $map = $('#map')

const renderPath = (id)=>{
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const g = document.createElementNS(SVG_NS,"g")
  g.innerHTML = `
    <path 
      d="M628.1,220.9c-0.9-4.7-1.7-11.9,0.2-20c1.2-5,2.9-8.3,3.6-9.9c3.1-6.6,5.8-17.9,3.1-37.9" 
      id="${id}" 
      class="path">
    </path>`
  
  $map.appendChild(g)

  return $(`#${id}`)
}

const pathPrepare = $path => {
  var lineLength = $path.getTotalLength()
  $path.style.strokeDasharray = lineLength
  $path.style.strokeDashoffset = lineLength
  return lineLength
}

Map.initMap = () => {
  $map.style.width = $('#map-container').offsetWidth
  window.addEventListener('resize', ()=>{
    $map.style.width = $('#map-container').offsetWidth
  })  
}

Map.initScrollController = ()=>{
  const $path = renderPath('my-path')
  // prepare SVG
  pathPrepare($path)

  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween
  var tween = new TimelineMax()
    .add(TweenMax.to($map, 0.1, {transform: 'translate(-200px, -100px) scale(3, 3)', ease:Linear.easeNone}))
    .add(TweenMax.to($path, 1, {strokeDashoffset: 0, ease:Linear.easeNone}))
    .add(TweenMax.to($path, 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);     // change color during the whole thing

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: $('#trigger1').offsetHeight, tweenChanges: true})
          .setPin('#map-container', {pushFollowers: false})
          .setTween(tween)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
}

export default Map