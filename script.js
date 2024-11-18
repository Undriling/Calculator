const resultEle = document.getElementById('result')
const allClrBtn = document.getElementById('allClr')
const delBtn = document.getElementById('del')
const percentBtn = document.getElementById('percent')
const divideBtn = document.getElementById('divide')
const multiplyBtn = document.getElementById('multi')
const minusBtn = document.getElementById('minus')
const plusBtn = document.getElementById('plus')
const pointBtn = document.getElementById('point')
const equalBtn = document.getElementById('equal')
const numbersBtn = document.querySelectorAll('#number')
const backBtn = document.getElementById('back')

// Store variables
let result = "";
let operation = "";
let previousOperand = 0;

// Append numbers
const appendNumber = (number) => {
    if (number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay();
}


// Show numbers on result
numbersBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        appendNumber(button.innerText)
        // updateDisplay()
    })
});

// To update result display
const updateDisplay = () => {
    if (operation){
        resultEle.innerText = `${previousOperand} ${operation} ${result}`
    }
    else{
        resultEle.innerText = result;
    }
}

// Select Operator
const slelctOperator = (operationValue) => {
    if (result === '' && result.includes) return;
    if (operation !== '' && previousOperand !==''){
        calculateResult();
    }

    operation = operationValue;
    previousOperand = result;
    result ='';
    updateDisplay();
} 

// Calculate
const calculateResult = () => {
    let evaluated;
    let prev =parseFloat (previousOperand);
    let current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            evaluated= prev + current;
            break;
        case '-':
            evaluated= prev - current;
            break;
        case '*':
            evaluated= prev * current;
            break;
        case '/':
            evaluated= prev / current;
            break;
        case '%':
            evaluated= prev % current;
            break;
    
        default:
            return;
    }

    result = evaluated.toString();
    operation = '';
    previousOperand = '';
    localStorage.setItem("Evaluated Value:", result)
}


// Events in operators & numbers buttons
pointBtn.addEventListener('click', () => appendNumber('.'));
plusBtn.addEventListener('click', () => slelctOperator('+'));
minusBtn.addEventListener('click', () => slelctOperator('-'));
multiplyBtn.addEventListener('click', () => slelctOperator('*'));
divideBtn.addEventListener('click', () => slelctOperator('/'));
percentBtn.addEventListener('click', () => slelctOperator('%'));

equalBtn.addEventListener('click', () => {
    calculateResult();
    updateDisplay();
});

allClrBtn.addEventListener('click', () => {
    result = "";
    updateDisplay();
})

delBtn.addEventListener('click', () => {
    if (isNaN(result[length-1])){
        result = result.slice(0,-1);
        updateDisplay();
    }
})

backBtn.addEventListener('click', () => {
    result = localStorage.getItem("Evaluated Value:")
    operation = '';
    previousOperand = '';
    updateDisplay();
})

