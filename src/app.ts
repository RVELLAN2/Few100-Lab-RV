import { multiple, add } from "./utils";

let amountInput: Node;
let tipBottons: NodeList;
let message: HTMLElement;
let amount: HTMLElement;
let tipPercentage: HTMLElement;
let tipAmount: HTMLElement;
let total: HTMLElement;
let amountCalc: number;
let tipPercentageCalc: number;

export function runApp() {
    amountInput = document.querySelector('.amount-input')
    tipBottons = document.querySelectorAll('.tip-btn');
    message = document.getElementById('message');

    amount = document.getElementById('amount');
    tipPercentage = document.getElementById('tipPercentage');
    tipAmount = document.getElementById('tipAmount');
    total = document.getElementById('total');

    amountInput.addEventListener('keyup', updateAmount);

    tipBottons.forEach(tipBotton => {
        const that = tipBotton as HTMLElement;
        that.classList.remove('selected');

        tipBotton.addEventListener('click', tipSelected)
    });
}


function tipSelected(evt) {
    const that = this as HTMLElement;
    message.innerText = `You are tipping ${that.innerText}`;

    tipPercentage.innerText = `Tip Percentage: ${that.innerText}`;
    tipPercentageCalc = Number(that.dataset.tip);

    tipBottons.forEach((tipBotton: HTMLElement) => {
        if (tipBotton.classList.contains('selected')) {
            tipBotton.removeEventListener('click', tipSelected)
        }
        else {
            tipBotton.classList.remove('selected');
            tipBotton.addEventListener('click', tipSelected)
        }
    })

    calcualteTotal();
}

function updateAmount(evt) {
    const that = this as HTMLInputElement;
    amountCalc = that.valueAsNumber;
    amount.innerText = `Bill Amount: $${that.value}`;

    calcualteTotal();
}

function calcualteTotal() {

    let tipAmountCalc = multiple(amountCalc, tipPercentageCalc);
    tipAmount.innerText = 'Amount of tip: $' + tipAmountCalc.toString();
    total.innerText = 'Total to be Paid: $' + (add(amountCalc, tipAmountCalc)).toString();
}