// Basic math functions 
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b === 0) {
        return "Don't even try!"
     } else {
        return a / b 
    }
}

function percent(a) {
    return a / 100
}

function invert(a) {
    return a * -1
}

// Generic operate function that calls one of the basic functions on 2 numbers
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a,b)
        case 'x':
            return multiply(a,b)
        case '/':
            return divide(a,b)
        case '%':
            return percent(a)
        case '+/-':
            return invert(a)
        default:
            return null
    }                       
}

let a = '';
let operator = '';
let b = '';
let displayValue = '';

const display = document.querySelector(".display");
const clearBtn = document.querySelector("#clr")
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator")
const modButtons = document.querySelectorAll(".modify")
const equalBtn = document.querySelector(".equal")
const decimalBtn = document.querySelector(".decimal")

for (btn of numberButtons) {
    btn.addEventListener("click", (e) => {
        if (displayValue.length < 15) {
            displayValue += e.target.textContent
            display.textContent = displayValue
        } else {
            display.textContent = 'out of my league!'
        }
    })
}


decimalBtn.addEventListener("click", (e) => {
    // if length exceeded -> out of leage
    if (displayValue.length >= 15 ) {
        display.textContent = 'out of my league!'
    } else if (!displayValue.includes('.')) {
        displayValue += e.target.textContent
        display.textContent = displayValue
    }
})


for (btn of operatorButtons) {
    btn.addEventListener("click", (e) => {
        if (a !== '') {
            // if a value of a is present, any operator button first serves as the equal button
            calculate()
        }
        // at this point the display shows the numbers entered by the user, or the outcome of an earlier operation
        a = display.textContent
        operator = e.target.textContent
        displayValue = ''
    })
}

for (btn of modButtons) {
    btn.addEventListener("click", (e) => {
        // make calculation
        displayValue = operate(e.target.textContent, parseFloat(display.textContent), 0)
        // display outcome
        display.textContent = limitToDisplayLength(displayValue)
    })
}

clearBtn.addEventListener("click", clearAll)
equalBtn.addEventListener("click", calculate)

function calculate() {
    b = display.textContent
    let result = operate(operator, parseFloat(a), parseFloat(b))
    clearAll()
    // first clear all, then show result on display
    display.textContent = result === null ? '' : limitToDisplayLength(result)
}

function clearAll() {
    // clears the display and all running variables
    displayValue = ''
    a = ''
    operator = ''
    b = ''
    display.textContent = displayValue
}

function limitToDisplayLength(value) {
    // 15 characters is the max that fits in the screen
    if (value > 999999999999999) {
        return 'out of my league!'
    }
    const str = value.toString()
    const strlen = str.length
    if (strlen > 15) {
        // at this point there must be a decimal in the value
        // last character to display is at index 14 (15th char), so the number of decimals (preciesion) 
        // is 14 minus the position of the decimal
        const decimals = 14 - str.indexOf('.')
        return value.toFixed(decimals)
    }
    return value
}

