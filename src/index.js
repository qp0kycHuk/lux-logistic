import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import rangeSlider from './js/range-slider';
import theme from './js/theme';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import ymaps from 'ymaps';

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

	ripple.attach('.btn')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')

	setPlaceholders();

	ymaps
		.load()
		.then(maps => {
			const inputs = [...document.querySelectorAll('[data-suggest-view]')]
			inputs.forEach((input) => {
				new maps.SuggestView(input, { results: 5, container: document.body });
			})
		})
		.catch(error => console.log('Failed to load Yandex Maps', error));
}

