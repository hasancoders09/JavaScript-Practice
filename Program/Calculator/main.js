const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn =document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // replace current display value if first value is entered
    if (awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //If current display value is 0, replace it, if not add number to display value
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
function addDecimal() {
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Calculate the first and scound value depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator (operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent myltiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //Assign firstValue if no vlaue
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //Ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
}

//Add even listing for number, operator, decimal
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//Rest all vallues, display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//Even Listener
clearBtn.addEventListener('click', resetAll);
