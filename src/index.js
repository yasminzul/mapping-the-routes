import './style/main.css'
import './style/tooltip.css'
import Map from './modules/map.js'

import './style/progress-bar.css'
import ProgressBar from './modules/progress-bar.js'

import Hash from './modules/url-hash.js'

import './style/bookmark.css'
import './style/overlay.css'
import Subscribe from './modules/subscribe.js'

Map.initMap()
Map.initScrollController()
Map.initTooltip()

ProgressBar.initScrollController()
ProgressBar.initClickNav()

Hash.initHashController()

Subscribe.initBookmark()