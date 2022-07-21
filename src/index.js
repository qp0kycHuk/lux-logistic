import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import rangeSlider from './js/range-slider';
import theme from './js/theme';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import ymaps from 'ymaps';
import scrolled from './js/scrolled'

import 'npm-kit-ripple/index.css';
import 'swiper/css';
import './ui/ui-reset.scss'
import './ui/ui-core.scss'
import './ui/ui-example.scss'
import './scss/frontend--fonts.scss'
import './scss/frontend--style.scss'
import { MEDIA } from "./js/constants";
import { setPlaceholders } from "./js/setPlaceholders";

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())

window.MEDIA = MEDIA

function loadHandler() {
	fancybox.init();
	showPass.init();
	rangeSlider.init()
	tab.init();
	toggle.init();
	ripple.init();
	theme.init();
	scrolled.init()

	ripple.attach('.btn')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')

	setPlaceholders();
	document.addEventListener('click', clickHandler);
	window.addEventListener('scroll', scrollHandler);

	ymaps
		.load()
		.then(maps => {
			const inputs = [...document.querySelectorAll('[data-suggest-view]')]
			inputs.forEach((input) => {
				new maps.SuggestView(input, { results: 5, container: document.body });
			})

			const map = new maps.Map('map', {

				center: [45.03191007458623,38.921171499999936],
				zoom: 16
	
			})
	
			const placemark = new maps.Placemark([45.03191007458623,38.921171499999936], {}, {
		
				iconLayout: 'default#image',
				iconImageHref: '../img/geo.png',
				iconImageSize: [72, 72],
				iconImageOffset: [-20, -50]
				
			})
	
			map.controls.remove('geolocationControl')
			map.controls.remove('searchControl')
			map.controls.remove('trafficControl')
			map.controls.remove('typeSelector')
			map.controls.remove('fullscreenControl')
			map.controls.remove('zoomControl')
			map.controls.remove('rulerControl')
			map.behaviors.disable(['scrollZoom'])
			map.geoObjects.add(placemark)
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));
}


function clickHandler(event) {
	function scrollTo() {
		const target = event.target.closest('[data-scroll]');
		const href = target.getAttribute('data-scroll');

		if (!href) return;
		if (href[0] != '#' || href == '#') return;

		event.preventDefault();

		var element = document.querySelector(href);
		const offset = 45;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = element.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
	if (event.target.closest('[data-scroll]')) scrollTo();



}

function scrollHandler() {
	const nav = document.querySelector('.nav');
	if (window.pageYOffset > 10) {
		nav.classList.add('scrolled')
		
	}else{
		nav.classList.remove('scrolled')
		
	}
}
