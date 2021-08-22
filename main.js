const tipButtons = document.querySelectorAll('#discount');
const tipInput = document.getElementById('discount-custom');
let bill = document.getElementById('bill-input');
let noPeople = document.getElementById('people-amount-input');
const tipAmount = document.getElementById('tip');
const totalAmount = document.getElementById('total-amount');
const btnReset = document.getElementById('reset');
let currIndex = -1;
let tipPercent = 0;
let tipPercentTxt = "";

function checkValues() {
    if (bill.value < 0) bill.value *= -1;
    if (noPeople.value < 0) noPeople.value *= -1;
    if (tipInput.value < 0) tipInput.value *= -1;
    tipAmount.textContent = (bill.value * tipPercent / noPeople.value).toFixed(2);
    totalAmount.textContent = ((bill.value / noPeople.value) + parseFloat(tipAmount.textContent)).toFixed(2);
}


tipButtons.forEach ( (button, index) => {
    button.addEventListener('click', function() {

        if (!tipButtons[index].classList.contains("active") && currIndex !== -1) {
            tipButtons[currIndex].classList.toggle('active');
            tipButtons[index].classList.toggle('active');
            currIndex = index;
            tipPercentTxt = button.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
            tipInput.value = 0
        }

        if (currIndex === -1) {
            tipButtons[index].classList.toggle('active');
            currIndex = index;
            tipPercentTxt = button.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
            tipInput.value = 0;
        }

        switch (tipPercentTxt) {
            case "5%":
                tipPercent = 0.05;
                break;
            case "10%":
                tipPercent = 0.10;
                break;
            case "15%":
                tipPercent = 0.15;
                break;
            case "25%":
                tipPercent = 0.25;
                break;
            case "50%":
                tipPercent = 0.5;
                break;
            default:
                tipPercent = 0.0;
                break;
        }

        if (bill.value != 0 && noPeople.value != 0) {
            checkValues();
        }
        
    })
})

tipInput.addEventListener('focus' , function() {
    tipButtons.forEach ((button) => {
        button.classList.remove('active');
    })
    currIndex = -1;
    tipPercent = 0;
})

tipInput.addEventListener('change', function() {
    tipPercent = tipInput.value * 0.01;
    if (bill.value != 0 && noPeople.value != 0) {
        checkValues();
    }
})

noPeople.addEventListener('change', function() {
    if (bill.value != 0) {
        checkValues();
    }
})

bill.addEventListener('change', function() {
    if (noPeople.value != 0) {
        checkValues();
    }
})

btnReset.addEventListener('mousedown', function() {
    btnReset.style.backgroundColor = 'hsla(172, 70%, 55%, 1)';
    bill.value = 0.00;
    noPeople.value = 0.00;
    tipButtons.forEach((button) => {
        button.classList.remove('active');
    })
    tipPercent = 0;
    tipInput.value = 0;
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
})

btnReset.addEventListener('mouseup', function() {
    btnReset.style.backgroundColor = 'hsl(172, 67%, 45%)';
})

