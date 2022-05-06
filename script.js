// variables to hold the current & prior number/operator (used to hold from the click events)
let currentOperator = '';
let priorOperator = '';
let currentNumber = '';
let priorNumber = '';

// all the number buttons with a data attribute of 'number'
let numberBtns = document.querySelectorAll(`[data-number]`)
// all the operator buttons with a data attribute of 'operators'
let operatorBtns = document.querySelectorAll('[data-operators]')

// loop through all the number btns and add a click event listener to grab the number clicked
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        currentNumber = e.target.innerText
        console.log(`Current Number: ${currentNumber}`)
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        currentOperator = e.target.innerText
        console.log(`Current Operator: ${currentOperator}`)
    })
})

function add(num1, num2) {
    return num1 + num2
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        return add(num1, num2)
    } else {
        return alert("OOPS")
    }

}