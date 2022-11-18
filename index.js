const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""
    }

    // Add digit to calculator screen
    addDigit(digit) {
        console.log(digit);
        //check if current operation has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }



    // Process all calculator operations
    processOperation(operation) {
        //Check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // get current and previous value
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;


            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;

        }


    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            // Append number to curent value
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is, just add current valor
            if (previous === 0) {
                operationValue = current
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";

        }
    }

    //change math operations
    changeOperation(operation) {
        const mathOperation = ["*", "-", "+", "/"];

        if (!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete a digit
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        let operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation)
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
});