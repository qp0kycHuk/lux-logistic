const offset = (el) => {

	const rect = el.getBoundingClientRect()
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

	return {

		top: rect.top + scrollTop,
		left: rect.left + scrollLeft

	}

}

const animOnScroll = () => {

	const scrollItems = document.querySelectorAll('.-el-hid-')

	for (let i = 0; i < scrollItems.length; i++) {

		const item = scrollItems[i]
		const itemHeight = item.offsetHeight
		const itemOffset = offset(item).top
		const itemStart = 4

		let itemPoint = window.innerHeight - itemHeight / itemStart

		if (itemPoint > window.innerHeight) itemPoint = window.innerHeight - window.innerHeight / itemStart

		if (window.pageYOffset > itemOffset - itemPoint && window.pageYOffset < itemOffset + itemHeight) {

			item.classList.add('-el-show-')

		}
		// else {

		// 	item.classList.remove('-el-show-')

		// }

	}

}

const init = () => {

	animOnScroll()
	document.addEventListener('scroll', animOnScroll)
	
}

export default { init }