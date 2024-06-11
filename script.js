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
    return a / b
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
const equalBtn = document.querySelector(".equal")

for (btn of numberButtons) {
    btn.addEventListener("click", (e) => {
        // TODO: only if string length allows
        displayValue += e.target.textContent
        display.textContent = displayValue
    })
}

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

clearBtn.addEventListener("click", clearAll)
equalBtn.addEventListener("click", calculate)

function calculate() {
    b = display.textContent
    let result = operate(operator, parseFloat(a), parseFloat(b))
    clearAll()
    // first clear all, then show result on display
    display.textContent = result
}

function clearAll() {
    // clears the display and all running variables
    displayValue = ''
    a = ''
    operator = ''
    b = ''
    display.textContent = displayValue
}
// TODO: the display widens when you keep entering numbers, should be limited

// eventlisteners on operator buttons:
// when pressed, store current display value as a, store operator symbol as operator