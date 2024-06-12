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
  function operate(operator, a, b = 0) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b)
      case 'x':
        return multiply(a, b)
      case '/':
        return divide(a, b)
      case '%':
        return percent(a)
      case '+/-':
        return invert(a)
      default:
        return null
    }
  }
  
  
  function calculate() {
    // first stores the display content and calculates the result
    // Then calls clearAll to empty all variables, and only after that displays the result. 
    b = display.textContent
    let result = operate(operator, parseFloat(a), parseFloat(b))
    clearAll()
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
    // Takes a value and limits it to 15 characters max
    // if the value is higher than 15 9's it is too much to display
    // if it is not higher, but there are more than 15 characters present, there must be a digit.
    // in which case the value will be rounded to the appropriate amount of digits.
    // No need to worry about a leading '-' for negative numbers, because that all happens before the decimal and doesn't impact rounding
    if (value > 999999999999999) {
      return 'out of my league!'
    }
    const str = value.toString()
    const strlen = str.length
    if (strlen > 15) {
      const decimals = 14 - str.indexOf('.')
      return value.toFixed(decimals)
    }
    return value
  }
  
  // Create variables for operations
  let a = '';
  let operator = '';
  let b = '';
  let displayValue = '';
  
  // Create variables for DOM elements
  const display = document.querySelector(".display");
  const clearBtn = document.querySelector("#clr")
  const numberButtons = document.querySelectorAll(".num");
  const operatorButtons = document.querySelectorAll(".operator")
  const modButtons = document.querySelectorAll(".modify")
  const equalBtn = document.querySelector(".equal")
  const decimalBtn = document.querySelector(".decimal")
  
  // Add Event listeners to buttons
  for (btn of numberButtons) {
    // Adds number to the display, unless display will be overflowing
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
    // Adds decimal to the display, unless display will be overflowing or a decimal is already present
    if (displayValue.length >= 15) {
      display.textContent = 'out of my league!'
    } else if (!displayValue.includes('.')) {
      displayValue += e.target.textContent
      display.textContent = displayValue
    }
  })
  
  
  for (btn of operatorButtons) {
    // Stores the display value and the operator symbol and empties the display variable for a new entry
    // If an operator was already stored it will first calculate the result and show the result on display.
    btn.addEventListener("click", (e) => {
      if (a !== '') {
        calculate()
      }
      a = display.textContent
      operator = e.target.textContent
      displayValue = ''
    })
  }
  
  for (btn of modButtons) {
    // The % and +/- signs are only operating on 1 variable and will only change the display value
    // but not yet store the value in a variable
    btn.addEventListener("click", (e) => {
      // make calculation
      displayValue = operate(e.target.textContent, parseFloat(display.textContent))
      // display outcome
      display.textContent = limitToDisplayLength(displayValue)
    })
  }
  
  clearBtn.addEventListener("click", clearAll) // Will clear display and memory variables
  equalBtn.addEventListener("click", calculate) // Will calculate and show the result
  