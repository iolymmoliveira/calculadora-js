const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('.calculator-buttons button');

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperationInsert = '';
  }

  // Add digit to calculator screen
  addDigit(digit){
    // Check if currentOperationInsert already has a dot
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return;
    }
    this.currentOperationInsert = digit;
    this.updateScreen();
  }

  // Process all calculator operation
  processOperation(operation) {
    // Check if current is empty
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      // Change operation
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation);
      };
      return;
    }

    // Get current and previous values
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(' ')[0];
    const current = +this.currentOperationText.innerText;

    switch(operation) {
      case '*':
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '/':
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '+':
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '-':
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case 'DEL':
        this.processDelOperator();
        break;
      case 'C':
        this.processClearAllOperations();
        break;
      case '=':
        this.processEqualOperator();
        break;
      // case 'CE':
      //   this.processClearCurrentOperation();
      //   break;
      case '%':
        operationValue = (previous/100) * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '+/-':
        this.processInvertSinalOperation();
        break;
      default:
        return;
    }
  }

  // Change/Update values of the calculator screen
  updateScreen(operationValue = null, operation = null, current = null, previous = null) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperationInsert;
    } else {
      // Check if value is zero. If it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = '';
    }
  }

  // Change math operator
  changeOperation(operation) {
    const mathOperations = ['*', '/', '+', '-', '%'];
    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  // Process and Operation
  processClearAllOperations() {
    this.currentOperationText.innerText = '';
    this.previousOperationText.innerText = '';
  }

  processEqualOperator() {
    const operation = previousOperationText.innerText.split(' ')[1];
    this.processOperation(operation);
  }

  // // CE - Remove current operation 
  // processClearCurrentOperation(){
  //   this.currentOperationText.innerText = '';
  // }

  // Invert Sinal of Operation
  processInvertSinalOperation() {
    if (this.currentOperationText.innerText > 0) {
      this.currentOperationText.innerText = '-' + this.currentOperationText.innerText;
    } else {
      this.currentOperationText.innerText = -1 * this.currentOperationText.innerText;
    }
  }
 }

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const valueButton = e.target.innerText;
    
    if(+valueButton >= 0 || valueButton === '.') {
      calc.addDigit(valueButton);
    } else {
      calc.processOperation(valueButton);
    }
  });
});
