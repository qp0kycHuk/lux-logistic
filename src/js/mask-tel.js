let getInputNumbersValue = (input) => {

    return input.value.replace(/\D/g, '')

}

const onPhoneInput = (event) => {

    let input = event.target
    let inputNumbersValue = getInputNumbersValue(input)
    let selectionStart = input.selectionStart
    let formattedInputValue = ''

    if (!inputNumbersValue) return input.value = ''

    if (input.value.length != selectionStart) {

        if (event.data && /\D/g.test(event.data)) input.value = inputNumbersValue

        return

    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {

        if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue

        let firstSymbols = (inputNumbersValue[0] == '8') ? '8' : '+7'
        formattedInputValue = input.value = firstSymbols + ' '

        if (inputNumbersValue.length > 1) formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
        
        if (inputNumbersValue.length >= 5) formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
        
        if (inputNumbersValue.length >= 8) formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
        
        if (inputNumbersValue.length >= 10) formattedInputValue += '-' + inputNumbersValue.substring(9, 11)

    } else {

        formattedInputValue = '+' + inputNumbersValue.substring(0, 16)

    }

    input.value = formattedInputValue

}

const onPhoneKeyDown = (event) => {

    let inputValue = event.target.value.replace(/\D/g, '')

    if (event.keyCode == 8 && inputValue.length == 1) event.target.value = ''

}

const onPhonePaste = (event) => {

    let input = event.target
    let inputNumbersValue = getInputNumbersValue(input)
    let pasted = event.clipboardData || window.clipboardData

    if (pasted) {

        let pastedText = pasted.getData('Text')

        if (/\D/g.test(pastedText)) {

            input.value = inputNumbersValue
            
            return

        }

    }
    
}

const init = () => {

    document.addEventListener('input', (event) => {

        if (event.target.classList.contains('-input-tel-')) onPhoneInput(event)
    
    })
    
    document.addEventListener('keydown', (event) => {
    
        if (event.target.classList.contains('-input-tel-')) onPhoneKeyDown(event)
    
    })
    
    document.addEventListener('paste', (event) => {
    
        if (event.target.classList.contains('-input-tel-')) onPhonePaste(event)
    
    })

}

export default { init }