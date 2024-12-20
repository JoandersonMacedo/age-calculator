import { defineDate } from "../models/DateMethods.js";
import status, { allValueIsValid, dateStatus } from "../models/Status.js";
import InputContainer from "../models/InputContainer.js";
import Age from "../models/Age.js";

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-date');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

const nodeArray = Array.from(arayImputContainers);

const inputContainers = {};
const formDate = {};

nodeArray.forEach((container) => {
    const input = container.querySelector('.input');
    const nameInput = input.getAttribute('name');
    const validationType = input.getAttribute('validationtype');
    const message = container.querySelector('.message-invalid-value');
    
    inputContainers[nameInput] = InputContainer(container, input, nameInput, message, validationType);

    input.addEventListener('change', () => {
        if(inputContainers[nameInput].valueStatus() === status.INVALID_VALUE) {
            inputContainers[nameInput].container().classList.add('invalid-value');
            inputContainers[nameInput].message().textContent = `Must be a valid ${inputContainers[nameInput].nameInput()}`;
        }
    });

    input.addEventListener('input', () => {
        if(inputContainers[nameInput].valueStatus() !== status.INVALID_VALUE) {
            inputContainers[nameInput].container().classList.remove('invalid-value');
        }
    })
});

form.addEventListener('input', () => {
    formDate.date = defineDate(`${inputContainers.day.value()}/${inputContainers.month.value()}/${inputContainers.year.value()}`);
    formDate.allStatus = allValueIsValid([inputContainers.day.valueStatus(), inputContainers.month.valueStatus(), inputContainers.year.valueStatus()]);
    formDate.dateStatus = dateStatus(formDate.date);

    if (formDate.allStatus !== status.ALL_IS_VALID) {
        inputs.classList.remove('invalid-date')
    }
});

form.addEventListener('change', () => {
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
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formDate.allStatus === status.ALL_IS_VALID && formDate.dateStatus === status.PAST_DATE) {
        const age = Age(inputContainers.day.value(), inputContainers.month.value(), inputContainers.year.value());

        outputDay.textContent = `${age.toNowDays}`
        outputMonth.textContent = `${age.toNowMonths}`
        outputYear.textContent = `${age.toNowYears}`
    } else {
        for (const property in inputContainers) {
            if (inputContainers[property].valueStatus() !== status.VALID_VALUE && inputContainers[property].valueStatus() === status.NO_VALUE) {
                inputContainers[property].container().classList.add('invalid-value');
                inputContainers[property].message().textContent = 'This field is required';
            }
        }
    }
});

