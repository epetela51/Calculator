// numberArray is used temporarily to hold individual number clicks which will then later be joined to create multi-digit numbers
let numberArray = []
let operatorArray = []

let operator = '';
let lastOperatorThatIsNotEqual = '';
let number1 = 0;
let number2 = 0;
let total = 0;
let operatorClicked = false;

// input buttons user selects
// all the number & operator buttons
let numberBtns = document.querySelectorAll(`[data-number]`)
let operatorBtns = document.querySelectorAll('[data-operators]')
// don't need to use querySelectorAll since there are not multiple items being selected
let equalsBtn = document.querySelector('#equalsBtn')
let clearBtn = document.querySelector('#clearBtn')
let deleteBtn = document.querySelector('#deleteBtn')

// display on UI
let displayNumberOne = document.querySelector('#numberOne')
let displayNumberTwo = document.querySelector('#numberTwo')
let displayOperator = document.querySelector('#operatorChosen')
let displayTotal = document.querySelector('#total')


// loop through all the number btns and add a click event listener to grab the number clicked, push it into the array and assign a value to a number1 or number2 variable
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))

        assignNumbers()
    })
})

function assignOperators() {

    // this is used to grab the second to last operator clicked so when clicking on an operator math will be done ONLY using the second to last operator clicked (i.e. 1+2-3.  On the - click math will be done for 1+2 since + was the second to last operator clicked)
    operator = operatorArray[operatorArray.length-2]
    console.log(`Second to Last Click: ${operator}`)

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

// function that assigns a number to either number1 or number2 variables
function assignNumbers() {

    if (operatorClicked === false) {
        number1 = parseInt(numberArray.join(''))
        displayNumberOne.textContent = `${number1}`
        console.log(`Number1: ${number1}`)
    } else {
        number2 = parseInt(numberArray.join(''))
        displayNumberTwo.textContent = `${number2}`
        console.log(`Number2: ${number2}`)
    }
}

// loop through all the operator btns and record operators that are clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {

        operatorArray.push(e.target.innerText)

        assignOperators()

        operate(operator, number1, number2)

        // used for if trying to divide by 0
        if (operator == '/' && number2 == 0) {
            displayNumberOne.textContent = ``
            displayNumberTwo.textContent = ``
            displayOperator.textContent = ``
            displayTotal.textContent = 'CAN"T DIVIDE BY 0: START AGAIN'
        }
        // this if/else statement needs to go BELOW the operate function otherwise the total will be 0 since it is displaying the number BEFORE the math can be done
        // on first click of the operator it will be 'undefined' because operator is ONLY assigned on the second operator click (look at assignOperator function for specifics)
        else if (operator !== undefined) {
            displayNumberOne.textContent = `${total}`
            // this displays the last operator clicked
            displayOperator.textContent = `${operatorArray[operatorArray.length-1]}`
            displayNumberTwo.textContent = ``
        } else {
            displayOperator.textContent = `${operatorArray[operatorArray.length-1]}`
        }

        // setting this variable to true will switch numbers from being assigned to number1 variable to number2 variable
        operatorClicked = true;

        numberArray = []

    })
})

equalsBtn.addEventListener('click', (e) => {
    
    numberArray = []

    operatorArray.push(e.target.innerText)

    assignOperators()

    // use last operator that isn't equal so you can do consecutive '=' clicks and keep doing math using last operator that was clicked
    operate(lastOperatorThatIsNotEqual, number1, number2)

    if (operator == '/' && number2 == 0) {
        displayNumberOne.textContent = ``
        displayNumberTwo.textContent = ``
        displayOperator.textContent = ``
        displayTotal.textContent = 'CAN"T DIVIDE BY 0: START AGAIN'
    } else {
        displayTotal.textContent = ` = ${total}` 
    }

})

// resets everything back to 0/'' and if btns are disabled then re-enables them
clearBtn.addEventListener('click', (e) => {
    numberArray = [];
    operatorArray = [];
    number1 = 0;
    number2 = 0;
    total = 0;
    operator = '';
    lastOperatorThatIsNotEqual = '';
    operatorClicked = false;
    numberBtns.forEach((button) => {button.disabled = false})
    operatorBtns.forEach((button) => {button.disabled = false})
    equalsBtn.disabled = false;
    deleteBtn.disabled = false;
    // used just to clear the console, easier for debugging
    console.clear()

    // clears the content of the UI
    displayNumberOne.textContent = ''
    displayNumberTwo.textContent = ''
    displayOperator.textContent = ''
    displayTotal.textContent = ''

    console.log('CLEARED')
})

deleteBtn.addEventListener('click', (e) => {
    if(operatorClicked == false) {
        // remove the last number entered in the array
        numberArray.splice(-1)
        // join the array and assign it to the number variable
        number1 = parseInt(numberArray.join(''))
        console.log(`Number1: ${number1}`)
    } else {
        numberArray.splice(-1)
        number2 = parseInt(numberArray.join(''))
        console.log(`Number2: ${number2}`)
    }

    console.log('Delete last number')
})

function add(num1, num2) {
    total = num1 + num2
    // assign number1 the value of total so it can be used for mathimatical equations being done consecutively 
    number1 = total
    console.log(`${num1} + ${num2} = ${total}`)
    return total;
}

function subtract(num1, num2) {
    total = num1 - num2
    number1 = total
    console.log(`${num1} - ${num2} = ${total}`)
    return total;
}

function multiply(num1, num2) {
    total = num1 * num2
    number1 = total
    console.log(`${num1} * ${num2} = ${total}`)
    return total
}

function divide(num1, num2) {
    total = num1 / num2
    number1 = total
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
        if(num2 === 0) {
            console.log("CAN'T DIVIDE BY 0 DUMMY")
            // disables all the btns besides clear because you can't divide by 0
            // since numberBtns is querySelectorAll we need to loop through each btn with a forEach and have it be disabled for each button
            numberBtns.forEach((button) => {button.disabled = true})
            operatorBtns.forEach((button) => {button.disabled = true})
            // don't need a forEach since we aren't looping multiples
            equalsBtn.disabled = true;
            deleteBtn.disabled = true;
        } else {
            divide(num1, num2)
        }
    }
}