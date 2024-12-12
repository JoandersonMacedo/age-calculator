import moment from "moment";
import status, { allValueIsValid, dateStatus } from "../models/Status";
import InputContainer from "../models/InputContainer";

const today = moment().startOf('day');
console.log(today)

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-date');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

const nodeArray = Array.from(arayImputContainers);

const inputContainers = {}
const formDate = {};

nodeArray.forEach((container) => {
    const input = container.querySelector('.input');
    const nameInput = input.getAttribute('name');
    const maxValue = parseInt(input.getAttribute('max'));
    const minValue = parseInt(input.getAttribute('min'));
    const message = container.querySelector('.message-invalid-value');

    inputContainers[nameInput] = InputContainer(container, input, nameInput, minValue, maxValue, message);
});


form.addEventListener('input', () => {
    for (const property in inputContainers) {
        if (inputContainers[property].valueStatus() === status.INVALID_VALUE) {
            inputContainers[property].container().classList.add('invalid-value');
            inputContainers[property].message().textContent = `Must be a valid ${inputContainers[property].nameInput()}`;
        } else {
            inputContainers[property].container().classList.remove('invalid-value');
        }
    }

    formDate.date = moment(`${inputContainers.day.value()}/${inputContainers.month.value()}/${inputContainers.year.value()}`, 'D/M/YYYY');
    formDate.allStatus = allValueIsValid([inputContainers.day.valueStatus(), inputContainers.month.valueStatus(), inputContainers.year.valueStatus()]);
    formDate.dateStatus = dateStatus(formDate.date);

    if (formDate.allStatus === status.ALL_IS_VALID) {
        if (formDate.dateStatus === status.INVALID_DATE) {
            inputs.classList.add('invalid-date');
            messageInputs.textContent = 'Must be a valide date';
        } else if (formDate.dateStatus !== status.PAST_DATE) {
            inputs.classList.add('invalid-date');
            messageInputs.textContent = 'Must be in the past';
        } else {
            inputs.classList.remove('invalid-date');
        }
    } else {
        inputs.classList.remove('invalid-date')
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formDate.allStatus === status.ALL_IS_VALID && formDate.dateStatus === status.PAST_DATE) {
        const toNowYears = today.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value()}-${inputContainers.year.value()}`, 'D-M-YYYY'), 'years');
        const toNowMonths = today.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value()}-${inputContainers.year.value() + toNowYears}`, 'D-M-YYYY'), 'months');
        const toNowDays = today.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value() + toNowMonths}-${inputContainers.year.value() + toNowYears}`, 'D-M-YYYY'), 'days');
        
        outputDay.textContent = `${toNowDays}`
        outputMonth.textContent = `${toNowMonths}`
        outputYear.textContent = `${toNowYears}`
    } else {
        for (const property in inputContainers) {
            if (inputContainers[property].valueStatus() !== status.VALID_VALUE && inputContainers[property].valueStatus() === status.NO_VALUE) {
                inputContainers[property].container().classList.add('invalid-value');
                inputContainers[property].message().textContent = 'This field is required';
            }
        }
    }
});

