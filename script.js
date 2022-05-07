// arrays to hold button clicks
let operatorArray = [];
let numberArray = [];

let operator = '';
let number1 = '';
let number2 = '';
let total = ''

// all the number & operator buttons
let numberBtns = document.querySelectorAll(`[data-number]`)
let operatorBtns = document.querySelectorAll('[data-operators]')
let equalsBtn = document.querySelector('#equalsBtn')

// loop through all the number btns and add a click event listener to grab the number clicked
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))
        console.log(`Numbers in Array: ${numberArray}`)
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        operatorArray.push(e.target.innerText)
        console.log(`Operators in Array: ${operatorArray}`)
    })
})

equalsBtn.addEventListener('click', () => {
    // grab the operator from array and remove it from the array (this will help when using multiple different operators to do math)
    operator = operatorArray.shift()
    console.log(`Operator: ${operator}`)

    // grab first number from array and remove it
    number1 = numberArray.shift()
    console.log(`Number 1: ${number1}`)

    // grab second number from array and remove it
    number2 = numberArray.shift()
    console.log(`Number 2: ${number2}`)

    // call operate function to do math based on the operator
    operate(operator, number1, number2)
})

function add(num1, num2) {
    return num1 + num2
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        console.log(`Total: ${add(num1, num2)}`)
        return add(num1, num2)
    } else {
        return alert("OOPS")
    }

}