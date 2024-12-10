import moment from "moment";

const now = moment();

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-date');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

const nodeArray = Array.from(arayImputContainers);

function Status() {
    const NO_VALUE = 'NO_VALUE';
    const INVALID_VALUE = 'INVALID_VALUE';
    const VALID_VALUE = 'VALID_VALUE';
    const ALL_IS_VALID = 'ALL_IS_VALID';
    const HAVE_INVALID = 'HAVE_INVALID';
    const INVALID_DATE = 'INVALID_DATE';
    const FUTURE_DATE = 'FUTURE_DATE'
    const PAST_DATE = 'PAST_DATE';
    const PRESENT_DATE = 'PRESENT_DATE';

    function valueStatus(value, minValue, maxValue) {
        if (minValue <= value && value <= maxValue) {
            return VALID_VALUE;
        } else if (value < minValue || maxValue < value) {
            return INVALID_VALUE
        } else {
            return NO_VALUE;
        }
    }

    function allValueIsValid(statusArray) {
        for(let i = 0; i <= statusArray.length; i++) {
            if (statusArray[i] !== VALID_VALUE) {
                return HAVE_INVALID;
            }
        }
        return ALL_IS_VALID;
    }

    function dateStatus(date) {
        if (date.isValid()) {
            if (date.isBefore()) {
                return PAST_DATE;
            } else if (date.isAfter()) {
                return FUTURE_DATE;
            } else {
                return PRESENT_DATE;
            }
        } else {
            return INVALID_DATE;
        }
    }

    return {
        NO_VALUE,
        INVALID_VALUE,
        VALID_VALUE,
        ALL_IS_VALID,
        HAVE_INVALID,
        INVALID_DATE,
        PAST_DATE,
        FUTURE_DATE,
        PRESENT_DATE,
        valueStatus,
        allValueIsValid,
        dateStatus,
    }
}


let formDate;
const formElements = {};
form.addEventListener('input', () => {
    nodeArray.forEach(inputContainer => {
        const message = inputContainer.querySelector('.message-invalid-value');
        const input = inputContainer.querySelector('input');
        const value = parseInt(input.value);
        const maxValue = parseInt(input.getAttribute('max'));
        const minValue = parseInt(input.getAttribute('min'));
        const valueStatus = Status().valueStatus(value, minValue, maxValue);
        const nameInput = input.getAttribute('name');

        if (valueStatus === Status().INVALID_VALUE) {
            inputContainer.classList.add('invalid-value');
            message.textContent = `Must be a valid ${nameInput}`;
        } else {
            inputContainer.classList.remove('invalid-value');
        }

        formElements[[nameInput]] = (
            {
                container: inputContainer,
                value: value,
                valueStatus: valueStatus,
                message: message
            }
        )
    });

    formDate = moment(`${formElements.day.value}/${formElements.month.value}/${formElements.year.value}`, 'D/M/YYYY');
    const allStatus = Status().allValueIsValid([formElements.day.valueStatus, formElements.month.valueStatus, formElements.year.valueStatus]);
    const dateStatus = Status().dateStatus(formDate);

    if (allStatus === Status().ALL_IS_VALID) {
        if (dateStatus === Status().INVALID_DATE) {
            inputs.classList.add('invalid-date');
            messageInputs.textContent = 'Must be a valide date';
        } else if (dateStatus === (Status().FUTURE_DATE || Status().PRESENT_DATE)) {
            inputs.classList.add('invalid-date');
            messageInputs.textContent = 'Must be in the past';
        } else {
            inputs.classList.remove('invalid-date');
        }
    } else {
        inputs.classList.remove('invalid-date')
    }
});

// arayImputContainers.forEach((container) => {
//     container.addEventListener('input',
//         (event) => {
//             const eventElement = event.target
//             const value = parseInt(eventElement.value);
//             const maxValue = parseInt(eventElement.getAttribute('max'));
//             const minValue = parseInt(eventElement.getAttribute('min'));

//             const nodeArray = Array.from(arayImputContainers);
//             const formValues = {};
//             nodeArray.forEach((inputContainer) => {
//                 const input = inputContainer.querySelector('input');
//                 const value = parseInt(input.value);
//                 const chave = input.getAttribute('name')
//                 formValues[[chave]] = value;
//             })

//             if (formValues.day && formValues.month && formValues.year && !(moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isValid())) {
//                 inputs.classList.add('invalid-date');
//                 messageInputs.textContent = 'Must be a valide date';
//             } else if (formValues.day && formValues.month && formValues.year && !((moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isBefore(now)))) {
//                 inputs.classList.add('invalid-date');
//                 messageInputs.textContent = 'Must be in the past';
//             } else {
//                 inputs.classList.remove('invalid-date');
//             }

//             if (value > maxValue || value < minValue) {
//                 inputs.classList.remove('invalid-date');
//                 container.classList.add('invalid-value');
//             } else {
//                 container.classList.remove('invalid-value')
//             }
//         }
//     );
// });

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formValues = {};
    arayImputContainers.forEach((container) => {
        const input = container.querySelector('input');
        const messageInput = container.querySelector('.message-invalid-value');
        const value = parseInt(input.value);
        const maxValue = parseInt(input.getAttribute('max'));
        const minValue = parseInt(input.getAttribute('min'));

        if (input.value === '') {
            container.classList.add('invalid-value');
            messageInput.textContent = 'This field is required';
        } else if (value <= maxValue && value >= minValue) {
            container.classList.remove('invalid-value');
            const chave = input.getAttribute('name');
            formValues[[chave]] = value;
        }
    })

    if (formValues.day && formValues.month && formValues.year &&
        (moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isValid()) &&
        formValues.year && (moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isBefore(now))) {
        const toNowYears = now.diff(moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY'), 'years');
        const toNowMonths = now.diff(moment(`${formValues.day}-${formValues.month}-${formValues.year + toNowYears}`, 'D-M-YYYY'), 'months');
        const toNowDays = now.diff(moment(`${formValues.day}-${formValues.month + toNowMonths}-${formValues.year + toNowYears}`, 'D-M-YYYY'), 'days');

        outputDay.textContent = `${toNowDays}`
        outputMonth.textContent = `${toNowMonths}`
        outputYear.textContent = `${toNowYears}`
    }
});