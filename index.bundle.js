/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/style/main.css":
/*!******************************************************!*\
  !*** ./node_modules/css-loader!./src/style/main.css ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".container{\\n\\tmargin: 0 30px;\\n}\\n\\n#map-container{\\n\\twidth: 100%;\\n\\theight: auto;\\n\\tbackground: #fff;\\n\\tpadding: 15px 0px;\\n}\\n\\n#map{\\n\\twidth: 400px;\\n\\theight: auto;\\n\\tz-index: 999;\\n}\\n\\npath{\\n\\tstroke-linecap: round;\\n\\tstroke-linejoin: round;\\n}\\n\\n.path{\\n\\tfill:none;\\n\\tstroke:#000;\\n\\tstroke-width: 1px;\\n}\\n\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/style/main.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/style/progress-bar.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader!./src/style/progress-bar.css ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"/* Progress Bar */\\n#progress-div{\\n    position:fixed;\\n    width:100%;\\n    height:15px;\\n    background-color: rgb(236, 234, 234);\\n    top:0px;\\n    left:0px;\\n    z-index: 999;\\n}\\n#progress-bar{\\n    position: absolute;\\n    float:left;\\n    height:100%;\\n    background-color: #a8f5a8;\\n    -webkit-transition: width 0.3s; /* Safari */\\n    transition: width 0.3s;\\n}\\n/* Progress Bar */\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/style/progress-bar.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.css */ \"./src/style/main.css\");\n/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_main_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"./src/map.js\");\n/* harmony import */ var _style_progress_bar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/progress-bar.css */ \"./src/style/progress-bar.css\");\n/* harmony import */ var _style_progress_bar_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_progress_bar_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _progress_bar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progress-bar.js */ \"./src/progress-bar.js\");\n\n\n\n\n_map_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].initMap();\n_map_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].initScrollController();\n_progress_bar_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"].initScrollController();\n_progress_bar_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"].initClickNav();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var TweenMax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! TweenMax */ \"./node_modules/gsap/src/minified/TweenMax.min.js\");\n/* harmony import */ var TweenMax__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(TweenMax__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ScrollMagic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ScrollMagic */ \"./node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js\");\n/* harmony import */ var ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ScrollMagic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var animation_gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! animation.gsap */ \"./node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js\");\n/* harmony import */ var animation_gsap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(animation_gsap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var debug_addIndicators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug.addIndicators */ \"./node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js\");\n/* harmony import */ var debug_addIndicators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug_addIndicators__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar $ = function $(q) {\n  return document.querySelector(q);\n};\n\nvar Map = function Map() {};\n\nvar MapDom = $('#map');\n\nvar renderPath = function renderPath(id) {\n  var SVG_NS = 'http://www.w3.org/2000/svg';\n  var g = document.createElementNS(SVG_NS, \"g\");\n  g.innerHTML = \"\\n    <path \\n      d=\\\"M628.1,220.9c-0.9-4.7-1.7-11.9,0.2-20c1.2-5,2.9-8.3,3.6-9.9c3.1-6.6,5.8-17.9,3.1-37.9\\\" \\n      id=\\\"\".concat(id, \"\\\" \\n      class=\\\"path\\\">\\n    </path>\");\n  MapDom.appendChild(g);\n  return $(\"#\".concat(id));\n};\n\nvar pathPrepare = function pathPrepare($path) {\n  var lineLength = $path.getTotalLength();\n  $path.style.strokeDasharray = lineLength;\n  $path.style.strokeDashoffset = lineLength;\n  return lineLength;\n};\n\nMap.initMap = function () {\n  MapDom.style.width = $('#map-container').offsetWidth;\n  window.addEventListener('resize', function () {\n    MapDom.style.width = $('#map-container').offsetWidth;\n  });\n};\n\nMap.initScrollController = function () {\n  var $path = renderPath('my-path'); // prepare SVG\n\n  pathPrepare($path); // init controller\n\n  var controller = new ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default.a.Controller(); // build tween\n\n  var tween = new TimelineMax().add(TweenMax__WEBPACK_IMPORTED_MODULE_0___default.a.to($path, 1, {\n    strokeDashoffset: 0,\n    ease: Linear.easeNone\n  })).add(TweenMax__WEBPACK_IMPORTED_MODULE_0___default.a.to($path, 1, {\n    stroke: \"#33629c\",\n    ease: Linear.easeNone\n  }), 0); // change color during the whole thing\n  // build scene\n\n  var scene = new ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default.a.Scene({\n    triggerElement: \"#trigger1\",\n    duration: $('#trigger1').offsetHeight,\n    tweenChanges: true\n  }).setPin('#map-container', {\n    pushFollowers: false\n  }).setTween(tween).addIndicators() // add indicators (requires plugin)\n  .addTo(controller);\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (Map);\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/progress-bar.js":
/*!*****************************!*\
  !*** ./src/progress-bar.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var TweenMax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! TweenMax */ \"./node_modules/gsap/src/minified/TweenMax.min.js\");\n/* harmony import */ var TweenMax__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(TweenMax__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ScrollMagic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ScrollMagic */ \"./node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js\");\n/* harmony import */ var ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ScrollMagic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var animation_gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! animation.gsap */ \"./node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js\");\n/* harmony import */ var animation_gsap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(animation_gsap__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar $ = function $(q) {\n  return document.querySelector(q);\n};\n\nvar ProgressBar = function ProgressBar() {};\n\nProgressBar.initScrollController = function () {\n  var $bar = $('#progress-bar');\n  var $body = document.body;\n  var bodyHeight = $body.offsetHeight; // init controller\n\n  var controller = new ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default.a.Controller(); // build tween\n\n  var tween = new TimelineMax().add(TweenMax__WEBPACK_IMPORTED_MODULE_0___default.a.to($bar, 1, {\n    width: '100%',\n    ease: Linear.easeNone\n  })); // build scene\n\n  var scene = new ScrollMagic__WEBPACK_IMPORTED_MODULE_1___default.a.Scene({\n    triggerElement: $body,\n    triggerHook: 'onLeave',\n    duration: bodyHeight,\n    tweenChanges: true\n  }).setTween(tween).addTo(controller);\n};\n\nProgressBar.initClickNav = function () {\n  var $barContainer = $('#progress-div');\n  var $bar = $('#progress-bar');\n\n  var handler = function handler(event) {\n    var bodyWidth = document.body.offsetWidth;\n    var bodyHeight = document.body.offsetHeight;\n    var pageX = parseInt(event.pageX);\n\n    if (pageX > 0) {\n      var ratio = pageX / bodyWidth;\n      var scrollTop = bodyHeight * ratio;\n      window.scrollTo({\n        top: scrollTop,\n        behavior: 'smooth'\n      });\n    }\n  }; //add listener for click\n\n\n  $barContainer.addEventListener('click', handler); //add listener for touch\n\n  $barContainer.addEventListener('touchend', handler);\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (ProgressBar);\n\n//# sourceURL=webpack:///./src/progress-bar.js?");

/***/ }),

/***/ "./src/style/main.css":
/*!****************************!*\
  !*** ./src/style/main.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./main.css */ \"./node_modules/css-loader/index.js!./src/style/main.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/style/main.css?");

/***/ }),

/***/ "./src/style/progress-bar.css":
/*!************************************!*\
  !*** ./src/style/progress-bar.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./progress-bar.css */ \"./node_modules/css-loader/index.js!./src/style/progress-bar.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/style/progress-bar.css?");

/***/ })

/******/ });