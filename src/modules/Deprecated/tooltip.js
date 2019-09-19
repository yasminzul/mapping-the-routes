const $ = q => document.querySelector(q)

const Tooltip = function(){}
let shown = false

const infos = {
	changlun: {
		title: 'changlun',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
	}
}

const $tooltip = $('#map-tooltip')
const $title = $('#map-tooltip-title')
const $description = $('#map-tooltip-description')
const $underlay = $('#map-tooltip-underlay')
const $close = $('#map-tooltip-title-close')

const close = () => {
	$tooltip.style.display = 'none'
	$underlay.style.display = 'none'
}

Tooltip.toggle = (evt, location) => {
	if (shown) {
		close()
	} else {
		const x = parseInt(evt.clientX)
		const y = parseInt(evt.clientY)
		if (x && y){
			$tooltip.style.display = 'flex'
			$underlay.style.display = 'block'
			$tooltip.style.top = `${y}px`
			$tooltip.style.left = `${x}px`
			$title.innerHTML = infos[location].title
			$description.innerHTML = infos[location].description
		}
	}
	shown = !shown
}

//init close function
$close.addEventListener('click', ()=>{
	close()
	shown = false
})

$underlay.addEventListener('click', ()=>{
	close()
	shown = false
})


export default Tooltip