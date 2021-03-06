import { OPERATION } from './consts/index.js';

let numbers = [];
let operations = [];
let currentNumber = '0';
let operationMode = false;
const output = document.getElementById('output')

function decimalPress() {
  console.log('DECIMAL PRESS');
  if (currentNumber.includes('.')) {
    return;
  }
  currentNumber = currentNumber + '.';
  updateDisplay(currentNumber);
}

function numberPress(key) {
  console.log('NUMBER PRESS: ', key);
  currentNumber === '0' ? currentNumber = key : currentNumber += key;
  updateDisplay(currentNumber);
  operationMode = true;
}

function operatorPress(key) {
  if (!operationMode) {
    return;
  }

  operations.push(key)
  console.log('OPERATOR PRESS: ', key)
  numbers.push(currentNumber);

  if (key === OPERATION.EQUAL) {
    currentNumber = calculate();
    updateDisplay(currentNumber);
    clearDisplay(currentNumber);
  } else {
    currentNumber = '0';
    updateDisplay();
    operationMode = false;
  }
}

function calculate() {
  console.log('CALCULATE');
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      total = Number.parseFloat(numbers[i]);
    } else {
      total = operate(total, Number.parseFloat(numbers[i]), operations[i - 1]);
    }
  }

  return total;
}

function operate(value1, value2, operator) {
  console.log('OPERATE: ', value1, value2, operator);
  switch (operator) {
    case OPERATION.ADD:
      return value1 + value2;
    case OPERATION.SUBTRACT:
      return value1 - value2;
    case OPERATION.MULTIPLY:
      return value1 * value2;
    case OPERATION.DIVIDE:
      return value1 / value2;
    default:
      return '0';
  }
}

function clearDisplay (num = '0') {
  console.log('CLEAR: ', num)
  numbers = [];
  operations = [];
  currentNumber = num;
  operationMode = false;
  updateDisplay(currentNumber);
}

function updateDisplay(num = '0') {
  const digitCount = num.length;
  console.log('DISPLAY UPDATED: ', num)

  if (digitCount >= 11 && digitCount < 15) {
    output.style.fontSize = '20px';
  } else if (digitCount >= 15 && digitCount < 19) {
    output.style.fontSize = '15px';
  } else if (digitCount >= 19) {
    output.style.fontSize = '20px';
    return output.innerText = "Maximum";
  } else {
    output.style.fontSize = '28px';
  }

  output.innerText = num;
}

function handleButtonPress(key) {
  console.log('HANDE BUTTON: ', key)

  if (key === OPERATION.DOT) {
    decimalPress();
  } else if (key === OPERATION.CLEAR) {
    clearDisplay();
  } else if (!isNaN(Number.parseInt(key))) {
    numberPress(key);
  } else {
    operatorPress(key)
  }
}

function init() {
  Array.from(document.getElementsByClassName('key'))
    .forEach(button => {
      button.addEventListener('click', () => handleButtonPress(button.id))
    })
}

window.addEventListener('DOMContentLoaded', init);