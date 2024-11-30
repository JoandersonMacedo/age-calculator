const form = document.getElementById('age-calculator');
const inputs = form.querySelector('#inputs');
const arayImputContainers = inputs.querySelectorAll('.input-container');

arayImputContainers.forEach((container) => {
    const input = container.querySelector('input');
    const mensage = container.querySelector('.mensage-invalid-value')

    input.addEventListener('input',
        (event) => {
            const value = parseInt(input.value);
            const maxValue = parseInt(input.getAttribute('max'));
            const minValue = parseInt(input.getAttribute('min'));

            if (value > maxValue || value < minValue) {
                container.classList.add('invalid-value');
                mensage.textContent = `Must be a valid ${input.getAttribute('name')}`;
                container.appendChild(mensage)
            } else {
                container.classList.remove('invalid')
            }
        }
    )
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

});