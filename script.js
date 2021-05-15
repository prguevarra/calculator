//add query selectors to the html ids and classes
let buttons = document.querySelectorAll('button');
let displayCurrent = document.querySelector('#display-2');

// add event listeners for each button
buttons.forEach((button) => {
    button.addEventListener('click', changeColor);
});

//changes color for each click and pass the clicked value to passSelection function
function changeColor(e) {
    e.target.style['backgroundColor'] = 'white';
    let buttonSelection = e.target.getAttribute('id');
    passSelection(buttonSelection); 
    //console.log(buttonSelection);
}

let displayValue = ''; //stores the current value handled
let firstValue = '';
let secondValue = '';
let operation = '';

//obtains the selection value of the buttons upon click and decide what to do with the selection
function passSelection(buttonSelection) {

  
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let operations = ['+', '-', '/', 'x'];
    let equals = '=';

        if (digits.includes(buttonSelection)){
            if(firstValue === answer) {
                secondValue = Number(displayValue);
                console.log (`%cfirst value ${firstValue}`, `background: pink`);
                console.log (`%coperator ${operation}`, `background: pink`);
                console.log (`%csecond ${secondValue}`, `background: pink`);
            }
        } else if (operations.includes(buttonSelection)) {
            if (firstValue === '') {        //very first round, empty value from beginning
                firstValue = Number(displayValue);
                operation = buttonSelection;
                buttonSelection = '';
                displayValue = '';
                console.log (`%cfirst value ${firstValue}`, `background: red`);
                console.log (`%coperator ${operation}`, `background: red`);
            } else {
                if (answer !== '') {
                    secondValue = Number(displayValue);
                    operate(operation, firstValue, secondValue);
                    firstValue = answer;
                    operation = buttonSelection;
                    displayValue = '';
                    buttonSelection = '';
                    console.log (`%cfirst value ${firstValue}`, `background: blue`);
                    console.log (`%coperator ${operation}`, `background: blue`);
                    console.log (`%csecond ${secondValue}`, `background: blue`);
                } else {
                    secondValue = Number(displayValue);
                    displayValue = '';
                    operation = buttonSelection;
                    console.log (`%cfirst value ${firstValue}`, `background: yellow`);
                    console.log (`%coperator ${operation}`, `background: yellow`);
                    console.log (`%csecond ${secondValue}`, `background: yellow`);
                }

            }
        } else if (equals.includes(buttonSelection)) {
            secondValue = Number(displayValue);
            operate(operation, firstValue, secondValue);
            buttonSelection = '';
            displayValue = '';
        } else {

        }
     
    //displays the value of the selection
    displayValue = displayValue + buttonSelection;
    displayContent(displayValue);
    console.log(displayValue);
   

    
}


let operator;
let answer;

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
            break;
        default:
            answer = "Syntax Error";
    } 

    firstValue = '';
    secondValue = '';
    operation = '';
    console.log(`%cThe answer ${answer}`, `background: tomato`);
    return displayCurrent.textContent = `${answer}`;
    
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
    return a / b;
}


function displayContent(value) {
   displayCurrent.textContent = `${value}`;
}