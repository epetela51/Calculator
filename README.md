This project is a fully functional calculator that was put together using HTML5, CSS3 and vanilla JavaScript.  It can do addition, subtraction, multiplication and division along with the ability to delete numbers and clear the calculator to start over without having to refresh the browser.

This calculator was created as a way to sharpen my web development skills specifically vanilla JavaScript.  In the future I am looking to add the ability to calculate floating point numbers for more complex calculations.

## Features

 - CSS used to make buttons change color using the `hover:enabled` property to match the background of the calculator body while JavaScript uses the `KeyDown` even listener to change the CSS of the appropriate button pressed and the `KeyUp` event listener to reset the CSS on those buttons.  This way the mouse hover effect remains in place regardless of user is switching between using mouse and keyboard
 - CSS `Display: Grid` used to efficiently put the buttons in columns and rows and to also put the 0 and equal button into specific columns
 - When trying to divide a number by 0 a message will come up advising that you can't divide by 0.  This also disables all operator buttons, so you need to delete or clear the display to start over.  Once clicking either delete, clear or a number the operator buttons become re-enabled (through the use of JavaScript)
 - Use JavaScript arrays to store each individual number value on from a click and then using a trigger variable that is set to use the `.join()`property to merge any multiple digit numbers into a single number value in either the `number1` variable or the `number2` variable.  Also use array to store the operators that are clicked.  This is used as math will only be calculated on the second to last operator that is clicked
	 - Example: 1 + 2 - 4 / 2
		 - On the click of the minus (-) button, the equation of 1+2 is evaluated into a total of 3.  Then on the click of the divide (/) button the total of 3 from the prior equation is subtracted (-) from the last number clicked which is 4.  So it works like: 1 + 2 - (1+2=3) 4 / (3-4=-1) 
 - Use HTML data attributes for the number and operator buttons as a universal way to grab either a number or an operator click in JavaScript
 - Use Google Fonts for the calculator output along with the 'iCalc' footer at the bottom

## How to Use
There are two ways you can test this calculator out:

 1. Clone/copy this repo and open up the index.html file in your browser of choice
 2.  You can click [here](https://epetela51.github.io/Calculator/) to open the calculator in the current browser

Once you have the calculator open use it like you would any other calculator by doing a variety of calculations including but not limited to individual calculations or long continuous strings for calculations (i.e. 1+2-3*4 = ).