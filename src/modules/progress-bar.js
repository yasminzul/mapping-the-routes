import TweenMax from 'TweenMax'

import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'

const $ = q => document.querySelector(q)
const ProgressBar = function(){}

ProgressBar.ctrlHeaderAudio = ()=>{
  var video = $('#header-video')
  var controller = new ScrollMagic.Controller();
  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: $('#header-caption'), triggerHook: 'onLeave', duration: 0})
    .on('start', function(e){
      var dir = e.scrollDirection,
          scene = e.target
      if (dir == 'FORWARD') {
        console.log('muted')
        video.muted = true
      } else {
        console.log('unmuted')
        video.muted = false
      }
    })
    .addTo(controller)
}

ProgressBar.initScrollController = ()=>{
  const $bar = $('#progress-bar')
  var $body = document.body
  var bodyHeight = $body.offsetHeight
  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween
  var tween = new TimelineMax().to($bar, 1, {width: '100%', ease:Linear.easeNone})

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: $body, triggerHook: 'onLeave', duration: bodyHeight, tweenChanges: true})
          .setTween(tween)
          .addTo(controller)
}

ProgressBar.initClickNav = ()=>{
  const $barContainer = $('#progress-div')
  const $bar = $('#progress-bar')

  const handler = event => {
    const bodyWidth = document.body.offsetWidth
    const bodyHeight = document.body.offsetHeight
    const pageX  = parseInt(event.pageX)
    if (pageX > 0){
      const ratio = pageX / bodyWidth
      const scrollTop = bodyHeight * ratio

      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })
    }
  }

  //add listener for click
  $barContainer.addEventListener('click', handler)
  //add listener for touch
  $barContainer.addEventListener('touchend', handler)
}

export default ProgressBar