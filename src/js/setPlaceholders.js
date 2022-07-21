import { MEDIA } from "./constants"

export function setPlaceholders() {
    const inputs = [...document.querySelectorAll('[data-mobile-placeholder]')]

    const isMobile = document.body.clientWidth < MEDIA.md

    inputs.forEach((input) => {
        const mobilePlaceholder = input.getAttribute('data-mobile-placeholder')
        const desctopPlaceholder = input.getAttribute('data-desctop-placeholder') || input.getAttribute('placeholder')

        if (isMobile) {
            input.setAttribute('placeholder', mobilePlaceholder)
            input.setAttribute('data-desctop-placeholder', desctopPlaceholder)

        } else {
            input.setAttribute('placeholder', desctopPlaceholder)

        }
    })


}