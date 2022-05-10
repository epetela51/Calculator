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
    })
})

// loop through all the operator btns and add a click event listener to grab the operator clicked
operatorBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        operator = e.target.innerText

        // grab the assigned numbers
        assignedNumbers()

        // get sum on operator click (in case user wants to do math on 2+ opperands before summing with =)
        operate(operator, total, number2)

    })
})

// function that stores the numbers clicked which is important when there are 2+ digits per number
function assignedNumbers() {
    // variable to hold the new joined number (needs to be stored in a variable as join() is a non-destructive method meaning it does NOT alter the original array)
    joinedNumber = tempArray.join('')

    // clear the temporary array so after an operator is clicked there is no carry over from the prior number
    tempArray = []

    if(number1 === "" || number1 === NaN){
        number1 = parseInt(joinedNumber)
    } else {
        number2 = parseInt(joinedNumber)
    }
}

equalsBtn.addEventListener('click', () => {

    // grab all the values of the assigned numbers
    assignedNumbers()

    // call operate function to do math based on the operator
    operate(operator, total, number2)
})

function add(num1, num2) {
    console.log(`Starting Total: ${total}`)

    if(total === 0 || total === '' || total === NaN) {
        total = num1 + num2
        console.log('if - add function')
        console.log(`${total} = ${num1} + ${num2}`)
    } else {
        total += num2
        console.log('else - add function')
        console.log(`${total} += ${num2}`)
    }
    
    console.log(`Ending Total: ${total}`)

    return total;
}

// takes an operator (+, -, /, *) along with 2 numbers
function operate(operator, num1, num2) {
    if(operator === "+") {
        // console.log(`Total: ${add(num1, num2)}`)
        return add(num1, num2)
    } else {
        return alert("You forgot an OPERATOR")
    }

}