import moment from "moment";

const now = moment();

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-date');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

arayImputContainers.forEach((container) => {
    container.addEventListener('input',
        (event) => {
            const eventElement = event.target
            const value = parseInt(eventElement.value);
            const maxValue = parseInt(eventElement.getAttribute('max'));
            const minValue = parseInt(eventElement.getAttribute('min'));

            const nodeArray = Array.from(arayImputContainers);
            const formValues = {};
            nodeArray.forEach((inputContainer) => {
                const input = inputContainer.querySelector('input');
                const value = parseInt(input.value);
                const chave = input.getAttribute('name')
                formValues[[chave]] = value;
            })

            if (formValues.day && formValues.month && formValues.year && !(moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isValid())) {
                inputs.classList.add('invalid-date');
                messageInputs.textContent = 'Must be a valide date';
            } else if (formValues.day && formValues.month && formValues.year && !((moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isBefore(now)))) {
                inputs.classList.add('invalid-date');
                messageInputs.textContent = 'Must be in the past';
            } else {
                inputs.classList.remove('invalid-date');

            }

            if (value > maxValue || value < minValue) {
                inputs.classList.remove('invalid-date');
                container.classList.add('invalid-value');
            } else {
                container.classList.remove('invalid-value')
            }

        }
    );
});

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