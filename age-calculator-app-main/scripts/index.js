import moment from "moment";
import Status from "../models/Status";
import InputContainer from "../models/InputContainer";

const now = moment();

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-date');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

const nodeArray = Array.from(arayImputContainers);

const status = Status();
const formDate = {};
const formElements = {};
const inputContainers = {}

nodeArray.forEach((container) => {
    const message = container.querySelector('.message-invalid-value');
    const input = container.querySelector('.input');
    const nameInput = input.getAttribute('name');
    const value = parseInt(input.value);
    const maxValue = parseInt(input.getAttribute('max'));
    const minValue = parseInt(input.getAttribute('min'));
    const valueStatus = status.valueStatus(value, minValue, maxValue);

    formElements[nameInput] = (
        {
            container: container,
            input: input,
            nameInput: nameInput,
            minValue: minValue,
            maxValue: maxValue,
            value: value,
            message: message,
            valueStatus: valueStatus,
        }
    )

    inputContainers[nameInput] = InputContainer(container, input, nameInput, minValue, maxValue, message);
});


form.addEventListener('input', () => {

    // for (const property in formElements) {
    //     formElements[property].value = parseInt(formElements[property].input.value);
    //     formElements[property].valueStatus =
    //         status.valueStatus(formElements[property].value, formElements[property].minValue, formElements[property].maxValue);

    //     if (formElements[property].valueStatus === status.INVALID_VALUE) {
    //         formElements[property].container.classList.add('invalid-value');
    //         formElements[property].message.textContent = `Must be a valid ${formElements[property].nameInput}`;
    //     } else {
    //         formElements[property].container.classList.remove('invalid-value');
    //     }
    // }

    for (const property in inputContainers) {
        if (inputContainers[property].valueStatus() === status.INVALID_VALUE) {
            inputContainers[property].container().classList.add('invalid-value');
            inputContainers[property].message().textContent = `Must be a valid ${inputContainers[property].nameInput()}`;
        } else {
            inputContainers[property].container().classList.remove('invalid-value');
        }
    }

    // formDate.date = moment(`${formElements.day.value}/${formElements.month.value}/${formElements.year.value}`, 'D/M/YYYY');
    // formDate.allStatus = status.allValueIsValid([formElements.day.valueStatus, formElements.month.valueStatus, formElements.year.valueStatus]);
    formDate.date = moment(`${inputContainers.day.value()}/${inputContainers.month.value()}/${inputContainers.year.value()}`, 'D/M/YYYY');
    formDate.allStatus = status.allValueIsValid([inputContainers.day.valueStatus(), inputContainers.month.valueStatus(), inputContainers.year.valueStatus()]);
    formDate.dateStatus = status.dateStatus(formDate.date);

    if (formDate.allStatus === status.ALL_IS_VALID) {
        if (formDate.dateStatus === status.INVALID_DATE) {
            inputs.classList.add('invalid-date');
            messageInputs.textContent = 'Must be a valide date';
        } else if (formDate.dateStatus === (status.FUTURE_DATE || status.PRESENT_DATE)) {
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
        // const toNowYears = now.diff(moment(`${formElements.day.value}-${formElements.month.value}-${formElements.year.value}`, 'D-M-YYYY'), 'years');
        // const toNowMonths = now.diff(moment(`${formElements.day.value}-${formElements.month.value}-${formElements.year.value + toNowYears}`, 'D-M-YYYY'), 'months');
        // const toNowDays = now.diff(moment(`${formElements.day.value}-${formElements.month.value + toNowMonths}-${formElements.year.value + toNowYears}`, 'D-M-YYYY'), 'days');

        const toNowYears = now.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value()}-${inputContainers.year.value()}`, 'D-M-YYYY'), 'years');
        const toNowMonths = now.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value()}-${inputContainers.year.value() + toNowYears}`, 'D-M-YYYY'), 'months');
        const toNowDays = now.diff(moment(`${inputContainers.day.value()}-${inputContainers.month.value() + toNowMonths}-${inputContainers.year.value() + toNowYears}`, 'D-M-YYYY'), 'days');
        
        outputDay.textContent = `${toNowDays}`
        outputMonth.textContent = `${toNowMonths}`
        outputYear.textContent = `${toNowYears}`
    } else {
        // for (const property in formElements) {
        //     if (formElements[property].valueStatus !== status.VALID_VALUE && formElements[property].valueStatus === status.NO_VALUE) {
        //         formElements[property].container.classList.add('invalid-value')
        //         formElements[property].message.textContent = 'This field is required';
        //     }
        // }

        for (const property in inputContainers) {
            if (inputContainers[property].valueStatus() !== status.VALID_VALUE && inputContainers[property].valueStatus() === status.NO_VALUE) {
                inputContainers[property].container().classList.add('invalid-value')
                inputContainers[property].message().textContent = 'This field is required';
            }
        }
    }
});

