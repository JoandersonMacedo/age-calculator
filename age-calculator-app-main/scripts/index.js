import moment, { months, now } from "moment";

const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const arayImputContainers = inputs.querySelectorAll('.input-container');
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

arayImputContainers.forEach((container) => {
    const messageInput = container.querySelector('.message-invalid-value')

    container.addEventListener('input',
        (event) => {
            const eventElement = event.target
            const value = parseInt(eventElement.value);
            const maxValue = parseInt(eventElement.getAttribute('max'));
            const minValue = parseInt(eventElement.getAttribute('min'));

            if (value > maxValue || value < minValue) {
                inputs.classList.remove('invalid-date');
                container.classList.add('invalid-value');
                messageInput.textContent = `Must be a valid ${eventElement.getAttribute('name')}`;
            } else {
                container.classList.remove('invalid-value')
            }

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
            } else {
                inputs.classList.remove('invalid-date');
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

        if (input.value === '') {
            container.classList.add('invalid-value');
            messageInput.textContent = 'This field is required'
        } else {
            container.classList.remove('invalid-value');
        }

        const value = parseInt(input.value);
        const chave = input.getAttribute('name')
        formValues[[chave]] = value;
    })

    if (formValues.day && formValues.month && formValues.year && (moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY').isValid())) {
        const now = moment()
        console.log(now);
        //date2.diff(date1, 'days');
        // let toNowYears = moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-MM-YYYY').fromNow();
        // let toNowMonths = moment(`${formValues.day}-${formValues.month}-${formValues.year + toNowYears}`, 'D-MM-YYYY').fromNow();
        // let toNowDays = moment(`${formValues.day}-${formValues.month + toNowMonths}-${formValues.year + toNowYears}`, 'D-MM-YYYY').fromNow();

        let toNowYears = now.diff(moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-M-YYYY'), 'years');
        let toNowMonths = now.diff(moment(`${formValues.day}-${formValues.month}-${formValues.year + toNowYears}`, 'D-M-YYYY'), 'months');
        let toNowDays = now.diff(moment(`${formValues.day}-${formValues.month + toNowMonths}-${formValues.year + toNowYears}`, 'D-M-YYYY'), 'days');

        const age = {
            years: toNowYears,
            months: toNowMonths,
            days: toNowDays,
        }

        console.log(age)
        

        // let moreYears = 1;
        // let moreMonths = 1;
        // let moreDays = 1;

        // while(moment(`${formValues.day}-${formValues.month}-${formValues.year}`, 'D-MM-YYYY').isBefore(now)) {
        //     if(moment(`${formValues.day}-${formValues.month}-${formValues.year + moreYears}`, 'D-MM-YYYY').isBefore(now)) {
        //         age.years ++;
        //         moreYears ++;
        //     }
        // }

    }
});