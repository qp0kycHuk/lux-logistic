import gsap from 'gsap'

function init() {
    magneticInit()
}

function magneticInit() {
    const force = 50
    const items = document.querySelectorAll('.magnetic-wrap')

    items.forEach((item) => {
        const target = item.querySelector('.magnetic-target')

        item.addEventListener('mousemove', (event) => {
            const boundingRect = item.getBoundingClientRect()
            const relX = event.x - boundingRect.left
            const relY = event.y - boundingRect.top


            gsap.to(target, {
                x: ((relX - boundingRect.width / 2) / boundingRect.width) * force,
                y: ((relY - boundingRect.height / 2) / boundingRect.height) * force,
                duration: 0.5,
            })
        })

        item.addEventListener('mouseout', () => {
            gsap.to(target, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic',
            })
        })
    })
}

export default { init }