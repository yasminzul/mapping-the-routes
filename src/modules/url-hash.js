import ScrollMagic from 'ScrollMagic'

const $ = q => document.querySelector(q)
const $$ = q => document.querySelectorAll(q)
const Hash = function(){}

Hash.initHashController = () => {
	const anchors = $$('.chapter-anchor')
	const controller = new ScrollMagic.Controller()

	anchors.forEach(anchor=> {
		const scene = new ScrollMagic.Scene({triggerElement: anchor, duration: anchor.offsetHeight})
											.addTo(controller)
											.on('enter leave', function(e){
												const hash = anchor.id
												window.history.pushState(null, null, `#${hash}`)
											})
	})
}

export default Hash