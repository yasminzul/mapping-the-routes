import './style/main.css'
import Map from './map.js'

import './style/progress-bar.css'
import ProgressBar from './progress-bar.js'

import Hash from './url-hash.js'

Map.initScrollController()

ProgressBar.initScrollController()
ProgressBar.initClickNav()

Hash.initHashController()