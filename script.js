// Array is used temporarily to hold individual number clicks which will then later be joined and pushed into the numberArray
let tempArray = []

let operator = '';
let number1 = 0;
let number2 = 0;
let joinedNumber = 0;
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
        operator = e.target.innerText

        operatorClicked = true;

        tempArray = []

        // determines if you are passing the existing total or number1 in the operate function
        if(total !== 0) {
            operate(operator, total, number2)
        } else (
            operate(operator, number1, number2)
        )

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

    operate(operator, number1, number2)

    // reset number1 & 2 back to zero so when clicking an operator immediately after equal it doesn't do incorrect math from previously held numbers
    number1 = 0;
    number2 = 0;
})

function add(num1, num2) {

    if(total === 0) {
        total = num1 + num2
        console.log('if')
        console.log(`${total} = ${num1} + ${num2}`)
    } else {
        total += num2
        console.log('else')
        console.log(`${total} += ${num2}`)
    }
    
    return total;
}

function subtract(num1, num2) {

    if(total === 0) {
        total = num1 - num2
        console.log('if')
        console.log(`${total} = ${num1} - ${num2}`)
    } else {
        total -= num2
        number1 = 0;
        console.log('else')
        console.log(`${total} -= ${num2}`)
    }
    
    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        add(num1, num2)
    } else if (operator === "-") {
        subtract(num1, num2)
    } else {
        return alert("You forgot an OPERATOR")
    }

}