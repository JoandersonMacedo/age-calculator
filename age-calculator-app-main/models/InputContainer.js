import { valueStatus } from "./Status.js";
import validationTypes from "./ValidationTypes.js";

const vStatus = valueStatus();

function InputContainer(
    container,
    input,
    nameInput,
    message,
    validationType
) {

    return {
        container() { return container },
        input() { return input },
        nameInput() { return nameInput },
        message() { return message },
        value() {
            return parseInt(input.value);
        },
        valueStatus() {
            switch (validationType) {
                case validationTypes.MIN_MAX:
                    return vStatus.minMax(parseInt(input.value), parseInt(input.getAttribute('min')), parseInt(input.getAttribute('max')));
                case validationTypes.MIN_LENGTH:
                    return vStatus.minLength(input.value, input.getAttribute('minlength'));
            }
        },
    }
}


export default InputContainer;