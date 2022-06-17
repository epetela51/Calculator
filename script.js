// tempArray is used temporarily to hold individual number clicks which will then later be joined to create multi-digit numbers
let tempArray = []
let operatorArray = []

let operator = '';
let lastOperatorThatIsNotEqual = '';
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

function testOperators() {

    // this is used to grab the second to last operator clicked so when clicking on an operator math will be done ONLY using the second to last operator clicked (i.e. 1+2-3.  On the - click math will be done for 1+2 since + was the second to last operator clicked)
    operator = operatorArray[operatorArray.length-2]
    console.log(`Second to Last Click: ${operator}`)
    // if you look at the operator array here you will see it in the order you clicked operators because it becomes BEFORE the reverse method
    console.log(operatorArray)

    // IMPORTANT: this is needed when doing consecutive = clicks.  If you just use the operator variable then after the second = click you will just get = as the previous operator and no math will be done.  This will grab the last operator that was clicked that is NOT =
    // the reverse method reverses the order of the array so the end goes to the front, etc.. so now when you go to find something even though it's still starting at the front it is "technically" the end of the array just reversed
    lastOperatorThatIsNotEqual = operatorArray.reverse().find(e => e !== "=")
    // if you look at the operator array here you will see it reversed because it comes after the reverse method
    console.log(operatorArray)
    console.log(`Previous Operator NOT = : ${lastOperatorThatIsNotEqual}`)

    // the below reverse method reverses the array back to the original order.  This prevents the array from starting in reverse order which prevents further issues
    // example: 
    // Array order to start: + = -
    // first reverse order: - = +
    // second reverse (puts it back to the original starting array order): + = -
    operatorArray.reverse()
}

/*
function assignOperators() {
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
}
*/

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {

        operatorArray.push(e.target.innerText)

        testOperators()
        // assignOperators()

        operatorClicked = true;

        tempArray = []

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

equalsBtn.addEventListener('click', (e) => {
    
    tempArray = []

    operatorArray.push(e.target.innerText)

    // console.log(operatorArray)

    testOperators()

    // assignOperators()

    // operate(previousOperator, number1, number2)

    // if (total !== 0) {
    //     operate(operator, total, number2)
    // } else {
    //     operate(operator, number1, number2)
    // }

    // reset number1 & 2 back to zero so when clicking an operator immediately after equal it doesn't do incorrect math from previously held numbers
    // number1 = 0;
    // number2 = 0;
})

function add(num1, num2) {
    total = num1 + num2
    number1 = total
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
    } else if (operator === "=") {
        console.log(`= clicked again`)
    } else {
        console.log("OOPS dum dum")
    }

}