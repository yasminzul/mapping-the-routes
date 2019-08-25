const $ = q => document.querySelector(q)

const Tooltip = function(){}
let shown = false

const infos = {
	changlun: {
		title: 'changlun',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
	}
}

Tooltip.toggle = (evt, location) => {
	const $tooltip = $('#map-tooltip')
	const $title = $('#map-tooltip-title')
	const $description = $('#map-tooltip-description')

	if (shown) {
		$tooltip.style.display = 'none'
	} else {
		const x = parseInt(evt.clientX)
		const y = parseInt(evt.clientY)
		if (x && y){
			$tooltip.style.display = 'flex'
			$tooltip.style.top = `${y}px`
			$tooltip.style.left = `${x}px`
			$title.innerHTML = infos[location].title
			$description.innerHTML = infos[location].description
		}
	}
	shown = !shown
}

const $close = $('#map-tooltip-title-close')
$close.addEventListener('click', ()=>{
	$('#map-tooltip').style.display = 'none'
})

export default Tooltip