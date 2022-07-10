// numberArray is used temporarily to hold individual number clicks which will then later be joined to create multi-digit numbers
let numberArray = []
let operatorArray = []

let operator = '';
let lastOperatorThatIsNotEqual = '';
let number1 = 0;
let number2 = 0;
let total = 0;
let previousTotal = 0;
let operatorClicked = false;
// used to keep track of consecutive operator clicks in case user changes their mind on which operator to click
let multipleOperatorsClicked = 0

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

        // reset the operators clicked back to 0 so math can be performed going forward
        multipleOperatorsClicked = 0
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

// used for if trying to divide by 0
function displayCantDivideByZero() {
    displayNumberOne.textContent = ``
    displayNumberTwo.textContent = ``
    displayOperator.textContent = ``
    displayTotal.textContent = 'CAN"T DIVIDE BY 0: START AGAIN'
}

function testFunction() {
    if (operator == '/' && number2 == 0) {
        displayCantDivideByZero()
    } 
    // this else/if is used when doing calculations directly after = is clicked
    // example:
    // 1+2 = 3-2=1
    else if (operator == '=') {
        displayNumberOne.textContent = `${total}`
        displayOperator.textContent = `${lastOperatorThatIsNotEqual}`
        displayNumberTwo.textContent = ``
        displayTotal.textContent = ``
     }
    // this else/if statement needs to go BELOW the operate function otherwise the total will be 0 since it is displaying the number BEFORE the math can be done
    // on first click of the operator it will be 'undefined' because operator is ONLY assigned on the second operator click (look at assignOperator function for specifics)
    else if (operator !== undefined) {
        displayNumberOne.textContent = `${total}`
        // this displays the last operator clicked
        displayOperator.textContent = `${operatorArray[operatorArray.length-1]}`
        displayNumberTwo.textContent = ``
    } else {
        displayOperator.textContent = `${operatorArray[operatorArray.length-1]}`
    }
}

// loop through all the operator btns and record operators that are clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {

        operatorArray.push(e.target.innerText)

        assignOperators()

        multipleOperatorsClicked++

        if (multipleOperatorsClicked == 1) {
            performMath(operator, number1, number2)
            displayUIOnOperatorClick()
        } else {
            let test = number1
            displayNumberOne.textContent = `${test}`
            displayOperator.textContent = `${operatorArray[operatorArray.length-1]}`
        }

        // setting this variable to true will switch numbers from being assigned to number1 variable to number2 variable
        operatorClicked = true;

        numberArray = []

        // re-enable the delete btn to be used as it is disabled after clicking '='
        deleteBtn.disabled = false;

    })
})

equalsBtn.addEventListener('click', (e) => {
    
    numberArray = []

    operatorArray.push(e.target.innerText)

    assignOperators()

    // use last operator that isn't equal so you can do consecutive '=' clicks and keep doing math using last operator that was clicked
    performMath(lastOperatorThatIsNotEqual, number1, number2)

    if (operator == '/' && number2 == 0) {
        displayCantDivideByZero()
    }
    // used for consecutive = clicks
    // displays the previous total as number 1, keeps the last operator clicked and the new total
    // example:
    // 1+2 = 3
    // click =
    // 3+2 = 5
    // click =
    // 5+2 = 7
    else if (operator == '=') {
        displayNumberOne.textContent = `${previousTotal}`
        displayOperator.textContent = `${lastOperatorThatIsNotEqual}`
        displayTotal.textContent = `= ${total}`
    } else {
        displayTotal.textContent = ` = ${total}` 
    }

    multipleOperatorsClicked = 0

    // disable delete btn so you can't delete once something is summed up
    deleteBtn.disabled = true;

})

// resets everything back to 0/'' and if btns are disabled then re-enables them
clearBtn.addEventListener('click', (e) => {
    numberArray = [];
    operatorArray = [];
    number1 = 0;
    number2 = 0;
    total = 0;
    previousTotal = 0;
    operator = '';
    lastOperatorThatIsNotEqual = '';
    operatorClicked = false;
    multipleOperatorsClicked = 0
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
        // used for deleting a single digit to show 0
        // need the second numberArray.length == 0 otherwise if constantly clicking delete button you eventually get NaN
        if (numberArray.length == 1 || numberArray.length == 0) {
            // if you don't remove the number on next click it will carry over from array
            numberArray.splice(-1)
            displayNumberOne.textContent = `0`
        } else {
            // remove the last number entered in the array
            numberArray.splice(-1)
            // join the array and assign it to the number variable
            number1 = parseInt(numberArray.join(''))
            displayNumberOne.textContent = `${number1}`
            console.log(`Number1: ${number1}`)
            }
    } else {
        if (numberArray.length == 1 || numberArray.length == 0) {
            numberArray.splice(-1)
            displayNumberTwo.textContent = `0`
        } else {
            numberArray.splice(-1)
            number2 = parseInt(numberArray.join(''))
            displayNumberTwo.textContent = `${number2}`
            console.log(`Number2: ${number2}`)
        }

    }

    console.log('Delete last number')
})

function add(num1, num2) {
    total = num1 + num2
    // previousTotal is used for consecutive = clicks.  This is used primarily for the UI to display the previous total (i.e. 1+2=3=(3+2=5, etc...))
    previousTotal = number1
    // assign number1 the value of total so it can be used for mathimatical equations being done consecutively 
    number1 = total
    console.log(`${num1} + ${num2} = ${total}`)
    return total;
}

function subtract(num1, num2) {
    total = num1 - num2
    previousTotal = number1
    number1 = total
    console.log(`${num1} - ${num2} = ${total}`)
    return total;
}

function multiply(num1, num2) {
    total = num1 * num2
    previousTotal = number1
    number1 = total
    console.log(`${num1} * ${num2} = ${total}`)
    return total
}

function divide(num1, num2) {
    total = num1 / num2
    previousTotal = number1
    number1 = total
    console.log(`${num1} / ${num2} = ${total}`)
    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function performMath(operator, num1, num2) {
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