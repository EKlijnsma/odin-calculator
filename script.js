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
        case '*':
            return multiply(a,b)
        case '/':
            return divide(a,b)
        default:
            return null
    }                       
}

let a;
let operator;
let b;

const display = document.querySelector(".display");
let displayValue = '';

const clearBtn = document.querySelector("#clr")
const numbers = document.querySelectorAll(".num");


for (num of numbers) {
    num.addEventListener("click", (e) => {
        displayValue += e.target.textContent
        display.textContent = displayValue
    })
}

clearBtn.addEventListener("click", () => display.textContent = "")

// TODO: the display widens when you keep entering numbers, should be limited
