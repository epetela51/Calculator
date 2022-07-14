// numberArray is used temporarily to hold individual number clicks which will then later be joined to create multi-digit numbers
let numberArray = []
let operatorArray = []

let lastOperator = '';
let secondToLastOperator = '';
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

function assignOperators() {

    lastOperator = operatorArray[operatorArray.length-1]
    
    // this is the PRIMARY operator variable that is used when doing math.  It used to grab the second to last operator clicked so when clicking on an operator math will be done ONLY using the second to last operator clicked (i.e. 1+2-3.  On the - click math will be done for 1+2 since + was the second to last operator clicked)
    secondToLastOperator = operatorArray[operatorArray.length-2]
    console.log(`Second to Last Click: ${secondToLastOperator}`)

    // IMPORTANT: this is needed when doing consecutive = clicks.  If you just use the operator variable then after the second = click you will just get = as the previous operator and no math will be done.  This will grab the last operator that was clicked that is NOT =
    // the reverse method reverses the order of the array so the end goes to the front, etc.. so now when you go to find something even though it's still starting at the front it is "technically" the end of the array just reversed
    // using the && in e !== "=" && e !== 'Enter' is because when using the array.prototype.find property you can NOT use ||, you need to use && so it knows to look for both
    lastOperatorThatIsNotEqual = operatorArray.reverse().find(
        e => e !== "=" && e !== 'Enter')

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

function displayUIOnOperatorClick() {
    if (secondToLastOperator == '/' && number2 == 0) {
        displayCantDivideByZero()
    } 
    // this else/if is used when doing calculations directly after = is clicked
    // example:
    // 1+2 = 3-2=1
    else if (secondToLastOperator == '=' || secondToLastOperator == 'Enter') {
        displayNumberOne.textContent = `${total}`
        displayOperator.textContent = `${lastOperatorThatIsNotEqual}`
        displayNumberTwo.textContent = ``
        displayTotal.textContent = ``
     }
    // this else/if statement needs to go BELOW the operate function otherwise the total will be 0 since it is displaying the number BEFORE the math can be done
    // on first click of the operator it will be 'undefined' because operator is ONLY assigned on the second operator click (look at assignOperator function for specifics)
    else if (secondToLastOperator !== undefined) {
        displayNumberOne.textContent = `${total}`
        // this displays the last operator clicked
        displayOperator.textContent = `${lastOperator}`
        displayNumberTwo.textContent = ``
    } else {
        displayOperator.textContent = `${lastOperator}`
    }
}

// keyboard clicks
document.addEventListener('keydown', (e) => {

    // use isFinite method instead of isNaN to check if it's an integer/number
    if (isFinite(e.key)) {
        console.log('number')
        numberBtnClicked(e.key)
    } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        operatorBtnClicked(e.key)
    } else if (e.key === 'Enter') {
        equalBtnClicked(e.key)
    } else if (e.key === 'Backspace') {
        deleteBtnClicked()
    } else if (e.key === 'Escape') {
        clearBtnClicked()
    } else {
        console.log('ERROR: INVALID KEY')
        return
    }

})

function numberBtnClicked(e) {
    numberArray.push(parseInt(e))

    assignNumbers()

    
    // used when the last thing clicked was = and instead of clearing to start new math equation you just click a new number to start a new equation
    if(lastOperator == "=" || lastOperator == "Enter") {
        clearBtnClicked()
        numberArray.push(parseInt(e))
        assignNumbers()
    } else {
        console.log('Something went wrong')
    }

    // reset the operators clicked back to 0 so math can be performed going forward
    multipleOperatorsClicked = 0
}

numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        numberBtnClicked(e.target.innerText)
    })
})

function operatorBtnClicked(e) {
    operatorArray.push(e)

    assignOperators()

    multipleOperatorsClicked++

    if (multipleOperatorsClicked == 1) {
        performMath(secondToLastOperator, number1, number2)
        displayUIOnOperatorClick()
    } else {
        let tempNumberOne = number1
        displayNumberOne.textContent = `${tempNumberOne}`
        displayOperator.textContent = `${lastOperator}`
    }

    // setting this variable to true will switch numbers from being assigned to number1 variable to number2 variable
    operatorClicked = true;

    numberArray = []
}

operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        operatorBtnClicked(e.target.innerText)
    })
})

function equalBtnClicked(e) {
    numberArray = []

    operatorArray.push(e)

    assignOperators()

    // use last operator that isn't equal so you can do consecutive '=' clicks and keep doing math using last operator that was clicked
    performMath(lastOperatorThatIsNotEqual, number1, number2)

    if (secondToLastOperator == '/' && number2 == 0) {
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
    else if (secondToLastOperator == '=' || secondToLastOperator == 'Enter') {
        displayNumberOne.textContent = `${previousTotal}`
        displayOperator.textContent = `${lastOperatorThatIsNotEqual}`
        displayTotal.textContent = `= ${total}`
    } else {
        displayTotal.textContent = ` = ${total}` 
    }

    multipleOperatorsClicked = 0
}

equalsBtn.addEventListener('click', (e) => {
    equalBtnClicked(e.target.innerText)
})

function clearBtnClicked() {
    numberArray = [];
    operatorArray = [];
    number1 = 0;
    number2 = 0;
    total = 0;
    previousTotal = 0;
    lastOperator = '';
    secondToLastOperator = '';
    lastOperatorThatIsNotEqual = '';
    operatorClicked = false;
    multipleOperatorsClicked = 0
    numberBtns.forEach((button) => {button.disabled = false})
    operatorBtns.forEach((button) => {button.disabled = false})
    equalsBtn.disabled = false;
    // used just to clear the console, easier for debugging
    console.clear()

    // clears the content of the UI
    displayNumberOne.textContent = ''
    displayNumberTwo.textContent = ''
    displayOperator.textContent = ''
    displayTotal.textContent = ''

    console.log('CLEARED')
}

clearBtn.addEventListener('click', (e) => {
    clearBtnClicked()

})

function deleteBtnClicked() {
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
    } else if (operatorClicked == true) {
        // first if is for checking to see if user clicks backspace after = is clicked which wipes out the display except for the total which can be used as the starting point of new equation
        if (lastOperator == "=" || lastOperator == "Enter") {
            displayNumberOne.textContent = `${total}`
            displayOperator.textContent = ''
            displayNumberTwo.textContent = ''
            displayTotal.textContent = ''
        } else if (numberArray.length == 1 || numberArray.length == 0) {
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
}

deleteBtn.addEventListener('click', (e) => {
    deleteBtnClicked()
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
function performMath(secondToLastOperator, num1, num2) {
    if(secondToLastOperator === "+") {
        add(num1, num2)
    } else if (secondToLastOperator === "-") {
        subtract(num1, num2)
    } else if (secondToLastOperator === "*") {
        multiply(num1, num2)
    } else if (secondToLastOperator === "/") {
        if(num2 === 0) {
            console.log("CAN'T DIVIDE BY 0 DUMMY")
            // disables all the btns besides clear because you can't divide by 0
            // since numberBtns is querySelectorAll we need to loop through each btn with a forEach and have it be disabled for each button
            numberBtns.forEach((button) => {button.disabled = true})
            operatorBtns.forEach((button) => {button.disabled = true})
            // don't need a forEach since we aren't looping multiples
            equalsBtn.disabled = true;
        } else {
            divide(num1, num2)
        }
    }
}