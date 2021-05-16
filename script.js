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

let currentValue = ''; //stores the current value handled
let firstValue = '';
let secondValue = '';
let operation = '';
let operator;
let answer;


//obtains the selection value of the buttons upon click and decide what to do with the selection
function passSelection(buttonSelection) {  
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let operations = ['+', '-', '/', 'x'];
    let equals = '=';

    
    

    if (digits.includes(buttonSelection)) {     // user input is a number
        currentValue += buttonSelection;
        displayContent(currentValue);

        if (firstValue === answer && operator !== "" && secondValue !== "") {                //SCENARIO 1 2nd step, storing the secondValue (first value from result of first equation)
            secondValue = currentValue;
        } 
    } else if (operations.includes(buttonSelection)) {    // user input is an operation
        
        if (firstValue === "" && answer === undefined) {   // SCENARIO 2 gets the currentValue and store it as first value if no firstValue available
            firstValue = Number(currentValue);
            operator = buttonSelection;
            currentValue = '';
            console.log("I'm here 1");
        } else if (firstValue !== "" && operator !== "") {  // SCENARIO 1 if you have first Variable, operator and current value and you click an operator
            secondValue = Number(currentValue);
            operate(operator, firstValue, secondValue);
            firstValue = answer;
            operator = buttonSelection;
            currentValue = '';
            console.log("I'm here 2");
        } else if (firstValue === "" && operator === "" && secondValue === "" && answer === "") { // after clear or after refresh store variable
            firstValue = Number(currentValue);
            operator = buttonSelection;
            currentValue = '';
            console.log("I'm here 3");
        } else if (firstValue === "" && operator !== "" && secondValue === "" && answer !== "") { //SCENARIO 3 having another operation from recently computed expression
            firstValue = Number(answer);
            operator = buttonSelection;
            console.log("I'm here 4");
        }

    } else if (equals.includes(buttonSelection)) {   // user input is equal sign
        secondValue = currentValue;                 //SCENARIO 2
        operate(operator, firstValue, secondValue);
        currentValue = '';
        firstValue = '';
        secondValue = '';
    } else if (buttonSelection === 'clear') {
        firstValue = '';
        secondValue = '';
        operator = '';
        currentValue = '';
        answer = '';
        displayContent(currentValue);
    }


    console.log(`%cfirst value is ${firstValue}`, 'background: red');
    console.log(`operator is ${operator}`);
    console.log(`second value is ${secondValue}`);
    console.log(`answer is ${answer}`);
    console.log(`current value is ${currentValue}`);
   

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
            break;
        default:
            answer = "Syntax Error";
            
    } 

    displayCurrent.textContent = `${answer}`;
    firstValue = '';
    secondValue = '';
    operation = '';
    console.log(`%cThe answer ${answer}`, `background: tomato`);
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
    return a / b;
}


function displayContent(value) {
   displayCurrent.textContent = `${value}`;
}



// This function is working for consecutive operations with multiple and single operands
// Cannot store value of the answer from previous operation after clicking "="


//function passSelection(buttonSelection) {
    
  
//     let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//     let operations = ['+', '-', '/', 'x'];
//     let equals = '=';

//         if (digits.includes(buttonSelection)){
//             if(firstValue === answer) {
//                 secondValue = Number(displayValue);
//                 console.log (`%cfirst value ${firstValue}`, `background: pink`);
//                 console.log (`%coperator ${operation}`, `background: pink`);
//                 console.log (`%csecond ${secondValue}`, `background: pink`);
//             }
//         } else if (operations.includes(buttonSelection)) {
//             if (firstValue === '') {        //very first round, empty value from beginning
//                 console.log (`%cfirst value ${firstValue}`, `background: red`);
//                 console.log (`%coperator ${operation}`, `background: red`);
//                 console.log (`%csecond ${secondValue}`, `background: red`);
//                 firstValue = Number(displayValue);
//                 operation = buttonSelection;
//                 buttonSelection = '';
//                 displayValue = '';
//             } else {
//                 if (answer !== '') {
//                     secondValue = Number(displayValue);
//                     operate(operation, firstValue, secondValue);
//                     firstValue = answer;
//                     operation = buttonSelection;
//                     displayValue = '';
//                     buttonSelection = '';
//                     console.log (`%cfirst value ${firstValue}`, `background: blue`);
//                     console.log (`%coperator ${operation}`, `background: blue`);
//                     console.log (`%csecond ${secondValue}`, `background: blue`);
//                 } else {
//                     secondValue = Number(displayValue);
//                     displayValue = '';
//                     operation = buttonSelection;
//                     console.log (`%cfirst value ${firstValue}`, `background: yellow`);
//                     console.log (`%coperator ${operation}`, `background: yellow`);
//                     console.log (`%csecond ${secondValue}`, `background: yellow`);
//                 }

//             }
//         } else if (equals.includes(buttonSelection)) {
//             secondValue = Number(displayValue);
//             operate(operation, firstValue, secondValue);
//             buttonSelection = '';
//             displayValue = '';
//             displayContent(answer);
//         } 
     
//     //displays the value of the selection
//     displayValue = displayValue + buttonSelection;
//     displayContent(displayValue);
    
//     console.log(displayValue);
//     console.log(answer);
//     console.log (`%cfirst value ${firstValue}`, `background: black; color: white`);
//     console.log (`%coperator ${operation}`, `background: black; color: white`);
//     console.log (`%csecond ${secondValue}`, `background: black; color: white`);
//     console.log (`%canswer ${answer}`, `background: black; color: white`);
//     console.log (`%cpreviousAnswer ${previousAnswer}`, `background: black; color: white`);
// }





//______________________________________________

// this function is only working with scenario 3 (can store value of previous operations and use it to next equations)

// if (digits.includes(buttonSelection)) {     // user input is a number
        
//     currentValue += buttonSelection; 
//     displayContent(currentValue);
//    // console.log('im 0');  // DOOOOOONE
//     if (firstValue !== "") {
//             secondValue = Number(currentValue); 
//    //         console.log('im 1');
//     } else if (answer !== "") {
//             firstValue = currentValue;
//    //         console.log('im 1.1');   // DOOOOOONE
//     } 

// } else if (operations.includes(buttonSelection)) {    // user input is an operation
    
//     if (answer !== undefined) { 
//         firstValue = Number(answer);
//         operator = buttonSelection;
//         console.log('im 2');
//         console.log(`Answer contains ${answer}`)

//     } else if (firstValue !== '') { //current value is stored in operation variable
//         firstValue = Number(currentValue); 
//         secondValue = '';
//         operator = buttonSelection;
//         console.log('im 3');  // DOOOOOONE
//     } else if (firstValue && secondValue && operation && answer === undefined) {  //is not empty then, evaluates the expression
//             operate(operation, firstValue, secondValue);       
//             console.log('im 4');        
//     } 
//     currentValue = '';

//     console.log(`first value is ${firstValue}`);
//     console.log(`operator is ${operator}`);
//     console.log(`second value is ${secondValue}`);
//     console.log(`current value is ${currentValue}`);

// } else if (equals.includes(buttonSelection)) {   // user input is equal sign
//     console.log('im in operations button');
//    operate(operator, firstValue, secondValue); 
//    currentValue = '';
//    displayContent(answer);
//    firstValue = '';
//    secondValue = '';
//    operator = '';


//    console.log(`first value is ${firstValue}`);
//    console.log(`operator is ${operator}`);
//    console.log(`second value is ${secondValue}`);
//    console.log(`current value is ${currentValue}`);
// }