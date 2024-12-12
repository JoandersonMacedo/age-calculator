import { valueStatus } from "./Status"

function InputContainer(
    container,
    input,
    nameInput,
    minValue,
    maxValue,
    message,
) {

    return {
        container() { return container },
        input() { return input },
        nameInput() { return nameInput },
        minValue() { return minValue },
        maxValue() { return maxValue },
        message() { return message },
        value() {
            return parseInt(input.value);
        },
        valueStatus() {
            return valueStatus(parseInt(input.value), minValue, maxValue);
        }
    }
}

export default InputContainer;