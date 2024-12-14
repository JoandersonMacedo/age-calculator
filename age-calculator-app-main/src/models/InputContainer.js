import status, { valueStatus } from "./Status";
import validationTypes from "./ValidationTypes";

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

// valueStatus() {
//     return status.minLength(input.value, input.getAttribute('minlength'));
// }
//valueStatus() {
//    return status.minMax(parseInt(input.value), parseInt(input.getAttribute('max'), parseInt(input.getAttribute('min')));
//}


// function InputContainer() {
//     const status = valueStatus();

//     return {
//         minMax(
//             container,
//             input,
//             nameInput,
//             message,
//             minValue,
//             maxValue,
//         ) {
//             return {
//                 container() { return container },
//                 input() { return input },
//                 nameInput() { return nameInput },
//                 message() { return message },
//                 value() {
//                     return parseInt(input.value);
//                 },
//                 valueStatus() {
//                     return status.minMax(parseInt(input.value), minValue, maxValue);
//                 }
//             }
//         },
//         minLength(
//             container,
//             input,
//             nameInput,
//             message,
//             minlenght
//         ) {
//             return {
//                 container() { return container },
//                 input() { return input },
//                 nameInput() { return nameInput },
//                 message() { return message },
//                 value() {
//                     return parseInt(input.value);
//                 },
//                 valueStatus() {
//                     return status.minLength(input.value, minlenght);
//                 }
//             }
//         }
//     }
// }

export default InputContainer;