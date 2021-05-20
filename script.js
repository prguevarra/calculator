//add query selectors to the html ids and classes
let buttons = document.querySelectorAll('button');
let displayCurrent = document.querySelector('#display-2');
let displayEquation = document.querySelector('#display-1');


// add event listeners for each button
buttons.forEach((button) => {
    button.addEventListener('click', changeColor);
});

//changes color for each click and pass the clicked value to passSelection function
function changeColor(e) {
    // e.target.style['backgroundColor'] = 'white';
    let buttonSelection = e.target.getAttribute('id');
    passSelection(buttonSelection); 
    passEquation(buttonSelection);
    //console.log(buttonSelection);
}

//add event listener for keyboard support
window.addEventListener('keydown', keySupport);

//keyboard: -: unary; W: √; space: AC; enter: =
//keyboard: ]: /; x; -; +; .; backspace: clear
function keySupport(e){
    let pressed = e.keyCode;
    let keyCodes = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5",
        54: "6", 55: "7", 56: "8", 57: "9", 
        80: "unary", 87: "√", 32: "AC", 220: "/",
        88: "x", 173: "-", 61: "+",
        190: ".", 8: "clear", 13: "=",
    }
    passSelection(keyCodes[pressed]);
    passEquation(keyCodes[pressed]);
    
} 

let currentValue = ''; //stores the current value handled
let firstValue = '';
let secondValue = '';
let operation = '';
let operator;
let answer;
let myValue;
let passValue;
let equationDisplayed = "";
let equation = "";
let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let operations = ['+', '-', '/', 'x'];
let allOperations = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', 'x', "clear", "unary", ".", `√`, "AC", "="];
let equals = '=';

// function for display 1 (top of screen)
function passEquation(buttonSelection) {

    if (equation === "√") {
        equation = "";
    }

    if (equation.length > 30 || buttonSelection === "AC" || buttonSelection === "=") {
        equation = "";
    } else if (buttonSelection === "√") {
        equation = `√`
    } else if (buttonSelection === "clear") {
        equation = currentValue;
    } else if (buttonSelection === "unary" || buttonSelection === ".") {
        equation = `${currentValue}`
    } else if (operations.includes(buttonSelection) && answer !== "" && answer !== undefined) {
        if (equation === "") {
            equation += answer + buttonSelection + "";
        } else {
            equation += buttonSelection + "";
        } 
    } else if (buttonSelection !== allOperations.includes(allOperations)) {
        equation = "";
    } else {
        equation = equation + "" + buttonSelection;  
    }
    displayTheEquation(equation);
}

//obtains the selection value of the buttons upon click and decide what to do with the selection
function passSelection(buttonSelection) {  
    

    if (digits.includes(buttonSelection)) {     // user input is a number
        if (currentValue.length > 11) {
            currentValue = currentValue;
        } else {
            currentValue += buttonSelection;
        }
        displayContent(currentValue);
        if (firstValue === answer && operator !== "" && secondValue !== "") {                //SCENARIO 1 2nd step, storing the secondValue (first value from result of first equation)
            secondValue = Number(currentValue);
        }
    } else if (operations.includes(buttonSelection)) {    // user input is an operation
        if (firstValue === "" && answer === undefined) {   // SCENARIO 2 gets the currentValue and store it as first value if no firstValue available
            firstValue = Number(currentValue);
            operator = buttonSelection;
            currentValue = '';
        } else if (firstValue !== "" && operator !== "") {  // SCENARIO 1 if you have first Variable, operator and current value and you click an operator
            secondValue = Number(currentValue);
            operate(operator, firstValue, secondValue);
            firstValue = answer;
            operator = buttonSelection;
            currentValue = '';
        } else if (firstValue === "" && operator === "" && secondValue === "" && answer === "") { // after clear or after refresh store variable
            firstValue = Number(currentValue);
            operator = buttonSelection;
            currentValue = '';
        } else if (currentValue === "" && firstValue === "" && operator !== "" && secondValue === "" && answer !== "") { //SCENARIO 3 having another operation from recently computed expression
            firstValue = Number(answer);
            operator = buttonSelection;
        } else if (currentValue !== "" && firstValue !== answer && firstValue === "" & answer !== "" & operator !== "" && secondValue === "") { //for obtaining a new input value from user after evaluating an expresion, store this current number in firstVariable
            operator = buttonSelection;
            firstValue = Number(currentValue);
            currentValue = "";
        } else if (firstValue !== '' && operator === '' && secondValue === '' && answer === '' && currentValue === '') {
            operator = buttonSelection;
            currentValue = '';
        }
    } else if (equals.includes(buttonSelection)) {   // user input is equal sign
        secondValue = Number(currentValue);                 //SCENARIO 2
        if ((firstValue === undefined || firstValue === "") && (operator === "" || operator === undefined)) {
            displayContent(currentValue);
            firstValue = Number(currentValue);
            operator = '';
            secondValue = '';
            answer = '';
            currentValue = '';
        } else if (operator !== undefined || operator !== ""){
            operate(operator, firstValue, secondValue);
            currentValue = '';
            firstValue = '';
            secondValue = '';
        } 
    } else if (buttonSelection === 'AC') {
        firstValue = '';
        secondValue = '';
        operator = '';
        currentValue = '';
        answer = '';
        displayContent(currentValue);
    } else if (buttonSelection === '.') {
        if (currentValue.includes('.')) {
            currentValue = currentValue;
            buttonSelection = "";
        } else {
            currentValue += buttonSelection;
        }
        displayContent(currentValue);
    } else if (buttonSelection === 'clear') {
        myValue = currentValue.split("")
        myValue.pop();
        currentValue = myValue.join('');
        displayContent(currentValue);
    } else if (buttonSelection === '√') {
        if (currentValue !== "" && currentValue !== undefined && answer !== "") {
            operate('√', currentValue);
        } else if (currentValue !== "" && answer === "") {
            operate('√', currentValue);
        } else  {
            operate('√', answer);
        }
        currentValue = '';
    } else if (buttonSelection === 'unary') {
        convertToString();
        addRemoveUnary(passValue);
        currentValue = myValue.join('');
        displayContent(currentValue);
        clearPassValues();
    }
   console.log(`%cfirst value is ${firstValue}`, 'background: red');
    console.log(`operator is ${operator}`);
    console.log(`second value is ${secondValue}`);
    console.log(`answer is ${answer}`);
   console.log(`current value is ${currentValue}`);
}

function convertToString() {
    if (answer !== "" && currentValue === "") {
        passValue = answer.toString();
    } else {
        passValue = currentValue;
    } 
}

function addRemoveUnary() {
    myValue = passValue.split('');
    if (myValue.includes('-')) {
        myValue.shift('');
    } else {
        myValue.unshift('-');
    }
    return myValue
}

function clearPassValues() {
    myValue = "";
    passValue = "";
}

// obtains operator and numbers and decide what function operation to call
// stores new value to answer and display the content
function operate(operator, a, b){
    switch(operator) {
        case '+':
            answer = sum(a, b);
            break;
        case 'x':
            answer = product(a, b);
            break;
        case '-':
            answer = difference(a, b);
            break; 
        case '/':
            answer = quotient(a, b);
            console.log(`${a} ${b}`)
            break;
        case '√':
            answer = squareRoot(a);
            console.log(`${operator} ${a}`)
            break;
        default:
            answer = "Syntax Error";
            
    } 
    checkDecimalPlaces(answer);
    firstValue = '';
    secondValue = '';
    operation = '';
    myValue = '';
    displayContent(answer);
    console.log(`%cThe answer ${answer}`, `background: tomato`);
    return answer;
}

function checkDecimalPlaces() {
    answer = answer.toString();
    let myValue = answer.split('');
    if (myValue.length >= 13) {
            console.log(`My value length ${myValue.length}`);
            answer = Number(answer);
            answer = answer.toExponential(8);
    } else {
        answer = Number(answer);
    }
    return answer;
}

// do calculations for each operation
function sum(a, b) {
    return a + b;
}

function difference(a, b) {
    return a - b;
}

function product(a, b) {
    return a * b;
}

function quotient(a, b) {
    if (b === 0) {
        return "Math ERROR";
    } else {
        return a / b;
    }
}

function squareRoot(a) {
    return Math.sqrt(a);
}

function displayContent(value) {
   displayCurrent.textContent = `${value}`;
}

function displayTheEquation(value) {
    displayEquation.textContent = `${value}`;
 }
