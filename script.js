window.onload = init

function init () {
    clickingNumbers()

    clickingOperators()
}

// #region - used to hide lines of code in VS Code
// buttons for numbers
let numZeroBtn = document.querySelector('#zeroBtn')
let numOneBtn = document.querySelector('#oneBtn')
let numTwoBtn = document.querySelector('#twoBtn')
let numThreeBtn = document.querySelector('#threeBtn')
let numFourBtn = document.querySelector('#fourBtn')
let numFiveBtn = document.querySelector('#fiveBtn')
let numSixBtn = document.querySelector('#sixBtn')
let numSevenBtn = document.querySelector('#sevenBtn')
let numEightBtn = document.querySelector('#eightBtn')
let numNineBtn = document.querySelector('#nineBtn')

// buttons for operators, equals & clear
let addBtn = document.querySelector('#addBtn')
let subtractBtn = document.querySelector('#subtractBtn')
let divideBtn = document.querySelector('#divideBtn')
let multipleyBtn = document.querySelector('#multiplyBtn')
let equalsBtn = document.querySelector('#equalsBtn')
let clearBtn = document.querySelector('#clearBtn')
// #endregion

// empty array to hold numbers as they are pressed?
let numberArray = []
// empty array that will hold the sum of 2 numbers together
let sumArray = []
// emptry array that will hold operators as they are clicked
let operatorArray = []

function add(...numbers) {

}

// takes an operator (+, -, /, *) along with 2 numbers (the number pressed BEFORE the operator click and the number pressed AFTER the operator click)
function operate(operator, num1, num2) {
    // console.log('operate clicked')

    // grabs the first two numbers entered from the array and put's it in it's own array
    let startingNumbers = numberArray.slice(0,2)

    let sum

    // works for addition but NOT for subtraction, multiplacation & division
    let additionSum = startingNumbers.reduce((total, num) => {
        sum = total + num;
        sumArray.push(sum)
        return sum;
    })

    // #region
    console.log(`Addition sum: ${additionSum}`)

    let subtractSum = startingNumbers.reduce((total, num) => {
        sum = total - num;
        sumArray.push(sum)
        return sum;
    })

    console.log(`Subtract sum: ${subtractSum}`)


    let multiplySum = startingNumbers.reduce((total, num) => {
        sum = total * num;
        sumArray.push(sum)
        return sum;
    })

    console.log(`Multiply sum: ${multiplySum}`)

    let divideSum = startingNumbers.reduce((total, num) => {

        if(num === 0) {
            console.log("can NOT divide by 0")
        } else {
            sum = total / num;
            sumArray.push(sum)
            return sum;
        }

    })

    console.log(`Divide sum: ${divideSum}`)
    // #endregion

}


function clickingNumbers() {
    numZeroBtn.addEventListener('click', (e) => {
        // pushes number from button into array (parseInt converts it from string to number)
        numberArray.push(parseInt(e.target.innerText))
        
        console.log(numberArray)
    })
    numOneBtn.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))
        
        console.log(numberArray)
    })
    numTwoBtn.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))
        
        console.log(numberArray)
    })
    numThreeBtn.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))
        
        console.log(numberArray)
    })
    numFourBtn.addEventListener('click', (e) => {
        numberArray.push(parseInt(e.target.innerText))
        
        console.log(numberArray)
    })
}

function clickingOperators() {
    addBtn.addEventListener('click', (e) => {
        operatorArray.push(e.target.innerText)
    })
    equalsBtn.addEventListener('click', () => {


        operate()
    })
}