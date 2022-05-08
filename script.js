// arrays to hold numbers & operators clicked
let numberArray = [];
// Array is used temporarily to hold individual number clicks which will then later be joined and pushed into the numberArray
let tempArray = []

let operator = '';
let number1 = '';
let number2 = '';
let joinedNumber = '';
let total = '';

// all the number & operator buttons
let numberBtns = document.querySelectorAll(`[data-number]`)
let operatorBtns = document.querySelectorAll('[data-operators]')
// equal btn seperate so I can have special click event to do complete calculations
let equalsBtn = document.querySelector('#equalsBtn')

// loop through all the number btns and add a click event listener to grab the number clicked
numberBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        tempArray.push(parseInt(e.target.innerText))
        console.log(`Numbers in Temp Array: ${tempArray}`)
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        operator = e.target.innerText

        storeNumbers()
    })
})

// function that stores the numbers clicked which is used especially when there are 2+ digits per  number
function storeNumbers() {
    // variable to hold the new joined number (needs to be stored in a variable as join() is a non-destructive method meaning it does NOT alter the original array)
    joinedNumber = tempArray.join('')
    // push the new joined number into the array that holds the complete/final version of that number
    numberArray.push(parseInt(joinedNumber))
    // clear the temporary array so after an operator is clicked there is no carry over from the prior number
    tempArray = []

    console.log(`Joined Numbers: ${joinedNumber}`)
    console.log(`Numbers in Number Array: ${numberArray}`)
}

equalsBtn.addEventListener('click', () => {

    // grab first number from array and remove it since won't be needed again
    number1 = numberArray.shift()
    console.log(`Number 1: ${number1}`)

    // grab first number from array and remove it since won't be needed again
    number2 = parseInt(tempArray.join(''))
    tempArray = []
    console.log(`Number 2: ${number2}`)

    // call operate function to do math based on the operator
    operate(operator, number1, number2)
})

function add(num1, num2) {
    total = num1 + num2
    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        console.log(`Total: ${add(num1, num2)}`)
    } else {
        return alert("You forgot an OPERATOR")
    }

}