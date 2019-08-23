import TweenMax from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'
// import Snap from 'snapsvg'

const $ = q => document.querySelector(q)

const controlPath = ()=>{
  function pathPrepare ($el) {
    var lineLength = $el.getTotalLength()
    $el.style.strokeDasharray = lineLength
    $el.style.strokeDashoffset = lineLength
  }

  var $word = $("path#word");
  var $dot = $("path#dot");

  // prepare SVG
  pathPrepare($word);
  pathPrepare($dot);

  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween
  var tween = new TimelineMax()
    .add(TweenMax.to($word, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    .add(TweenMax.to($dot, 0.1, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
    .add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);     // change color during the whole thing

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 200, tweenChanges: true})
          .setTween(tween)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
}

controlPath()