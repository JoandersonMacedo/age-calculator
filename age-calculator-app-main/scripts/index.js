import { lastDayOfMonth } from 'date-fns';
import { parse } from 'date-fns/fp';


const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const messageInputs = inputs.querySelector('.message-invalid-value')
const arayImputContainers = inputs.querySelectorAll('.input-container');

arayImputContainers.forEach((container) => {
    const messageInput = container.querySelector('.message-invalid-value')
    
    container.addEventListener('input',
        (event) => {
            const eventElement = event.target
            const value = parseInt(eventElement.value);
            const maxValue = parseInt(eventElement.getAttribute('max'));
            const minValue = parseInt(eventElement.getAttribute('min'));
            
            if (value > maxValue || value < minValue) {
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
                formValues[[chave]]  = value;
            })
            // const formValues = nodeArray.map((inputContainer, acumulator = {}) => {
            //     const input = inputContainer.querySelector('input');
            //     const value = parseInt(input.value);
            //     const chave = input.getAttribute('name')
            //     return (
            //         {
            //             ...acumulator,
            //             [chave]: value,
            //         }
            //     );
            // })
            
            console.log(formValues)
            console.log(`${formValues.year}.${formValues.month}.${formValues.day}`)
            console.log(parse(`${formValues.year}.${formValues.month}.${formValues.day}`, 'yyyy.MM.dd', new Date()));

        }
    )
});

// inputs.addEventListener('input', (event) => {
//     const container = event.target.parentElement
//     const value = parseInt(event.target.value);
//     const maxValue = parseInt(event.target.getAttribute('max'));
//     const minValue = parseInt(event.target.getAttribute('min'));

//     if (value > maxValue || value < minValue) {
//         container.classList.add('invalid-value');
//         mensage.textContent = `Must be a valid ${input.getAttribute('name')}`;
//         container.appendChild(mensage)
//     } else {
//         container.classList.remove('invalid-value')
//     }
// });

form.addEventListener('submit', (event) => {
    event.preventDefault();

});