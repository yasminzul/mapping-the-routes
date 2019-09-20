import './style/main.css'
import './style/desktop.css'
import './style/routes-map.css'
import './style/progress-bar.css'
import './style/overlay.css'

import ProgressBar from './modules/progress-bar.js'
import Hash from './modules/url-hash.js'
import Subscribe from './modules/subscribe.js'
import SeizureMap from './modules/seizure-map.js'
import RoutesCtrl from './modules/Routes/routes-ctrl.js'

window.addEventListener('DOMContentLoaded', () => {
	ProgressBar.ctrlHeaderAudio()
	ProgressBar.initScrollController()
	ProgressBar.initClickNav()

	Hash.initHashController()

	Subscribe.initBookmark()

	SeizureMap.renderMap()

	RoutesCtrl.init()
});
