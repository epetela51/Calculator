// Array is used temporarily to hold individual number clicks which will then later be joined and pushed into the numberArray
let tempArray = []
let operatorArray = []

let operator = '';
let previousOperator = '';
let number1 = 0;
let number2 = 0;
let total = 0;
let operatorClicked = false;

// all the number & operator buttons
let numberBtns = document.querySelectorAll(`[data-number]`)
let operatorBtns = document.querySelectorAll('[data-operators]')
// equal btn seperate so I can have special click event to do complete calculations
let equalsBtn = document.querySelector('#equalsBtn')

// loop through all the number btns and add a click event listener to grab the number clicked
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        tempArray.push(parseInt(e.target.innerText))

        assignNumbers()
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {

        operatorArray.push(e.target.innerText)

        // assigns the values for the current & previous operators
        if(operator == '') {
            operator = operatorArray.shift()
            console.log(`Current: ${operator}`)
            console.log(`Previous: ${previousOperator}`)
        } else {
            previousOperator = operator
            operator = operatorArray.shift()
            console.log(`Current: ${operator}`)
            console.log(`Previous: ${previousOperator}`)
        }

        operatorClicked = true;

        tempArray = []

        // looks to see which operator to the operate function depending if it's the same operator clicked 2 times in a row or if it's a different operator clicked than  last time
        // this resolves the issue when you do something like 1+2+3-4
        if (total !== 0) {
            if (previousOperator == '' || operator == previousOperator) {
                // used for when hitting = before and setting number to 0, if it's multiplacation and we multiply by 0 we get a total of 0 so we need to set number2 value to 1 to avoid a number2 value of 0
                if (previousOperator == '*' && number2 == 0) {
                    number1 = 0;
                    number2 = 1;
                    operate(operator, total, number2)
                } else {
                    operate(operator, total, number2)
                }
            } else if (previousOperator == '*' && number2 == 0) {
                operate(operator, total, number2)
            } else {
                operate(previousOperator, total, number2)
            }
        } else {
            operate(operator, number1, number2)
        }

    })
})

// function that assigns a number to either number 1 or 2
function assignNumbers() {

    if (operatorClicked === false) {
        number1 = parseInt(tempArray.join(''))
        console.log(`Number1: ${number1}`)
    } else {
        number2 = parseInt(tempArray.join(''))
        console.log(`Number2: ${number2}`)
    }
}

equalsBtn.addEventListener('click', () => {
    
    tempArray = []

    if (total !== 0) {
        operate(operator, total, number2)
    } else {
        operate(operator, number1, number2)
    }

    // operate(operator, number1, number2)

    // reset number1 & 2 back to zero so when clicking an operator immediately after equal it doesn't do incorrect math from previously held numbers
    number1 = 0;
    number2 = 0;
})

function add(num1, num2) {
    total = num1 + num2
    console.log(`${num1} + ${num2} = ${total}`)
    return total;
}

function subtract(num1, num2) {
    total = num1 - num2
    console.log(`${num1} - ${num2} = ${total}`)
    return total;
}

function multiply(num1, num2) {
    total = num1 * num2
    console.log(`${num1} * ${num2} = ${total}`)
    return total
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        add(num1, num2)
    } else if (operator === "-") {
        subtract(num1, num2)
    } else if (operator === "*") {
        multiply(num1, num2)
    } else {
        return alert("You forgot an OPERATOR")
    }

}