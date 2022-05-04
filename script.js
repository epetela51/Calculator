window.onload = init

function init () {
    clickingNumbers()

    clickingOperators()
}

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


// perform addition
function addition(num1, num2) {

}

// takes an operator (+, -, /, *) along with 2 numbers (the number pressed BEFORE the operator click and the number pressed AFTER the operator click)
function operate(operator, num1, num2) {

}

// empty array to hold numbers as they are pressed
let numberArray = []

function clickingNumbers() {
    numZeroBtn.addEventListener('click', (e) => {
        // var takes value from btn text and converts from string into number
        let zero = parseInt(e.target.innerText)
        // pushes the number from the button into an empty array
        numberArray.push(zero)
        
        console.log(numberArray)
    })
    numOneBtn.addEventListener('click', (e) => {
        let one = parseInt(e.target.innerText)
        numberArray.push(one)
        
        console.log(numberArray)
    })
    numTwoBtn.addEventListener('click', (e) => {
        let two = parseInt(e.target.innerText)
        numberArray.push(two)
        
        console.log(numberArray)
    })
    numThreeBtn.addEventListener('click', (e) => {
        let three = parseInt(e.target.innerText)
        numberArray.push(three)
        
        console.log(numberArray)
    })
}

function clickingOperators() {
    addBtn.addEventListener('click', () => {
        console.log('+')
    })
    subtractBtn.addEventListener('click', () => {
        console.log('-')
    })
    divideBtn.addEventListener('click', () => {
        console.log('/')
    })
    multipleyBtn.addEventListener('click', () => {
        console.log('*')
    })

    equalsBtn.addEventListener('click', () => {
        console.log('=')
    })
    clearBtn.addEventListener('click', () => {
        console.log('clear')
    })
}