// Array is used temporarily to hold individual number clicks which will then later be joined and pushed into the numberArray
let tempArray = []

let operator = '';
let number1 = 0;
let number2 = 0;
let joinedNumber = 0;
let total = 0;

// all the number & operator buttons
let numberBtns = document.querySelectorAll(`[data-number]`)
let operatorBtns = document.querySelectorAll('[data-operators]')
// equal btn seperate so I can have special click event to do complete calculations
let equalsBtn = document.querySelector('#equalsBtn')

// loop through all the number btns and add a click event listener to grab the number clicked
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        tempArray.push(parseInt(e.target.innerText))
        joinedNumber = tempArray.join('')
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        operator = e.target.innerText
        console.log(operator)

        // assign to either variable number 1 or 2
        assignNumbers()

        // get sum on operator click (in case user wants to do math on 2+ opperands before summing with =)
        operate(operator, number1, number2)

    })
})

// function that assigns a number to either number 1 or 2
function assignNumbers() {

    if(number1 === 0 || number1 === '' || number1 === NaN){
        number1 = parseInt(joinedNumber)
        // reset the temp array and the joined number.  This is important for when user clicks = btn and then wants to click operator button immediately after to do calculation on the total (i.e. 1+2=3+1)
        tempArray = []
        joinedNumber = 0;
        console.log(`Number1: ${number1}`)
    } else {
        number2 = parseInt(joinedNumber)
        tempArray = []
        joinedNumber = 0;
        console.log(`Number2: ${number2}`)
    }
}

equalsBtn.addEventListener('click', () => {
    
    assignNumbers(joinedNumber)

    operate(operator, number1, number2)
})

function add(num1, num2) {
    console.log(`Starting Total: ${total}`)

    if(total === 0 || total === '' || total === NaN) {
        total = num1 + num2
        console.log('if')
        console.log(`${total} = ${num1} + ${num2}`)
    } else {
        total += num2
        console.log('else')
        console.log(`${total} += ${num2}`)
    }
    
    console.log(`Ending Total: ${total}`)

    return total;
}

function subtract(num1, num2) {
    console.log(`Starting Total: ${total}`)

    if(total === 0 || total === '' || total === NaN) {
        total = num1 - num2
        console.log('if')
        console.log(`${total} = ${num1} - ${num2}`)
    } else {
        total -= num2
        console.log('else')
        console.log(`${total} -= ${num2}`)
    }
    
    console.log(`Ending Total: ${total}`)

    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        // console.log(`Total: ${add(num1, num2)}`)
        return add(num1, num2)
    } else if (operator === "-") {
        return subtract(num1, num2)
    } else {
        return alert("You forgot an OPERATOR")
    }

}