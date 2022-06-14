// tempArray is used temporarily to hold individual number clicks which will then later be joined to create multi-digit numbers
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

        // looks to see which operator to use on the operate function depending if it's the same operator clicked 2 times in a row or if it's a different operator clicked than last time
        // this resolves the issue when you do something like 1+2+3-4
        if (total !== 0) {
            if (previousOperator == '' || operator == previousOperator) {
                // used for when multiplying or dividing AFTER hitting =.  Need to pass the second number with a value of 1 so that you are not multiplying or dividing by 0.  This way you are multiplying or dividing by 1 (i.e 4+4 = 8 then doing * 2 so it would be 8*1 = 8 and then 8*2 = 16)
                if ((previousOperator == '*' || previousOperator == '/') && number2 == 0) {
                    number1 = 0;
                    operate(operator, total, 1)
                } else {
                    operate(operator, total, number2)
                }
            // for scenarios when the prior equation is * and then doing division and avoiding the second number being 0 and getting an 'infinity' result which can't be used.  This way we pass 1 as the second number to keep the equation good moving forward (i.e. 4*4 = 16 and then if you do / you are doing 16/1 opposed to 16/0 which yeilds infinity)
            } else if (previousOperator == '*' && operator == "/" && number2 == 0) {
                operate(operator, total, 1)
            } else if (previousOperator == '*' && number2 == 0) {
                operate(operator, total, number2)
            } else {
                operate(previousOperator, total, number2)
            }
        // this is to avoid dividing by 0 if you are doing division or multiplcation first by passing 1 instead of 0.  If you divide and pass 0 then you get 'infinity'.  i.e. 4*1 = 4 opposed to 4*0 = 0
        } else if ((operator === "/" || operator === "*") && number2 == 0) {
            operate(operator, number1, 1)
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

function divide(num1, num2) {
    total = num1 / num2
    console.log(`${num1} / ${num2} = ${total}`)
    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        add(num1, num2)
    } else if (operator === "-") {
        subtract(num1, num2)
    } else if (operator === "*") {
        multiply(num1, num2)
    } else if (operator === "/") {
        divide(num1, num2)
    } else {
        return alert("You forgot an OPERATOR")
    }

}