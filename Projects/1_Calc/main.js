
const MAX_INPUT_DIGITS = 6;
const MAX_RESULT_FONT_SIZE = '96px';
const MID_RESULT_FONT_SIZE = '65px';
const MIN_RESULT_FONT_SIZE = '42px';

const ACTION_PLUS = 'sum';
const ACTION_MINUS = 'sub';
const ACTION_MULTI = 'multi';
const ACTION_DIVIDE = 'div';
const ACTIONS_ARR = [ACTION_PLUS, ACTION_MINUS, ACTION_MULTI, ACTION_DIVIDE];

let lastOperation = '';
let firstOperand = '';
let secondOperand = '';

let resultDiv = undefined;
let resultString = '';


function Calc(operator, val_1, val_2) {
    
    let isOkParameters = true;
    if (operator === undefined) {
        isOkParameters = false;
    }
    if (typeof(val_1) !== 'number') {
        isOkParameters = false;
    }
    if (typeof(val_2) !== 'number') {
        isOkParameters = false;
    }
    if (!isOkParameters) return false;

    let result = 0;
    switch (operator) {
        case ACTION_PLUS:
            result = val_1 + val_2;
            break;
        case ACTION_MINUS:
            result = val_1 - val_2;
            break;
        case ACTION_MULTI:
            result = val_1 * val_2;
            break;
        case ACTION_DIVIDE:
            if (val_2 === 0) {
                alert('Invalid operation: Divide by zero!');
                return false;
            } else {
                result = val_1 / val_2;
            }
            break;
        default :
            alert('Invalidate operation!');
            result = false;
    }
    return result;
}

function outputResultDiv(){
    if (resultString[0] == '0') resultString = resultString.slice(1);

    let fontSize = MAX_RESULT_FONT_SIZE;
    let len = resultString.length;

    if (len > MAX_INPUT_DIGITS) {
        if (len < MAX_INPUT_DIGITS+4) {
            fontSize = MID_RESULT_FONT_SIZE;
        } else {
            fontSize = MIN_RESULT_FONT_SIZE;
        }
    }
    if (len > MAX_INPUT_DIGITS*2) {
        alert('Sorry, output of memory');
        clearResultAction();
        fontSize = MAX_RESULT_FONT_SIZE;
    }

    resultDiv.style.fontSize = fontSize;

    if (resultString == '') resultString = '0';
    resultDiv.textContent = resultString;
}

function clearResultAction(){
    lastOperation = '';
    firstOperand = '';
    secondOperand = '';
    resultString = '0';
    outputResultDiv();
}

function deleteDigitAction(){
    resultString = resultString.slice(0, resultString.length - 1);
    outputResultDiv();
}

function preAction(action) {
    if (!ACTIONS_ARR.includes(action)) return false;

    if (!lastOperation) {
        lastOperation = action;
        firstOperand = resultString;
        resultString = '0';
    } else { 
        secondOperand = resultString;
    }
}

function minusAction(){
    preAction(ACTION_MINUS);
    equallyAction(false);
    lastOperation = ACTION_MINUS;
}

function plusAction(){
    preAction(ACTION_PLUS);
    equallyAction(false);
    lastOperation = ACTION_PLUS;
} 

function divideAction(){
    preAction(ACTION_DIVIDE);
    equallyAction(false);
    lastOperation = ACTION_DIVIDE;
}

function multiAction(){
    preAction(ACTION_MULTI);
    equallyAction(false);
    lastOperation = ACTION_MULTI;
}

function equallyAction(selfButtonCall = true){
    if (selfButtonCall) {
        secondOperand = resultString;
    }
    let isValidOperation = (lastOperation && (firstOperand !== '') && (secondOperand !== ''));
    if (!isValidOperation) return;

    let res = Calc(lastOperation, +firstOperand, +secondOperand);
    if (res !== false) {
        resultString = res.toString();
        firstOperand = resultString;
    }
    outputResultDiv();

    resultString = '0';
}

function keyPressDigits(event){
    let elem = event.target;
    if (elem.tagName !== 'BUTTON') return;

    let isDigitButton = elem.classList.contains("digits");
    if (!isDigitButton) return;

    if (resultString.length < MAX_INPUT_DIGITS) {
        resultString += elem.value;
    }
    outputResultDiv();
}

function initUIListeners(){
    resultDiv = document.getElementById('result');
    clearResultAction();

    let item = undefined;

    item = document.getElementById('actionClear');
    item.addEventListener('click', clearResultAction);

    item = document.getElementById('actionDelete');
    item.addEventListener('click', deleteDigitAction);

    item = document.getElementById('actionMinus');
    item.addEventListener('click', minusAction);

    item = document.getElementById('actionPlus');
    item.addEventListener('click', plusAction);

    item = document.getElementById('actionDivide');
    item.addEventListener('click', divideAction);

    item = document.getElementById('actionMulti');
    item.addEventListener('click', multiAction);

    item = document.getElementById('actionEqually');
    item.addEventListener('click', equallyAction);

    document.addEventListener('click', keyPressDigits);
}


initUIListeners();

