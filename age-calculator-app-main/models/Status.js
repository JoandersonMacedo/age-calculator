import { isFuture, isPast, isValid, today } from "./DateMethods.js";

const NO_VALUE = 'NO_VALUE';
const INVALID_VALUE = 'INVALID_VALUE';
const VALID_VALUE = 'VALID_VALUE';
const ALL_IS_VALID = 'ALL_IS_VALID';
const HAVE_INVALID = 'HAVE_INVALID';
const INVALID_DATE = 'INVALID_DATE';
const FUTURE_DATE = 'FUTURE_DATE';
const PAST_DATE = 'PAST_DATE';
const PRESENT_DATE = 'PRESENT_DATE';

const status = {
    VALID_VALUE,
    INVALID_VALUE,
    NO_VALUE,
    PAST_DATE,
    PRESENT_DATE,
    FUTURE_DATE,
    INVALID_DATE,
    ALL_IS_VALID,
    HAVE_INVALID,
}

export default status;

export function valueStatus () {
    return {
        minMax(value, minValue, maxValue) {
            if (minValue <= value && value <= maxValue) {
                return VALID_VALUE;
            } else if (value < minValue || maxValue < value) {
                return INVALID_VALUE;
            } else {
                return NO_VALUE;
            }
        },
        minLength (value, minlenght) {
            if (value.length === 0) {
                return NO_VALUE;
            } else if (value.length >= minlenght) {
                return VALID_VALUE;
            } else {
                return INVALID_VALUE;
            }
        }
    }
}

export function allValueIsValid(statusArray) {
    for (let i in statusArray) {
        if (statusArray[i] !== VALID_VALUE) {
            return HAVE_INVALID;
        }
    }
    return ALL_IS_VALID;
}

export function dateStatus(date) {
    if (isValid(date)) {
        if (isPast(date, today)) {
            return PAST_DATE;
        } else if (isFuture(date, today)) {
            return FUTURE_DATE;
        } else {
            return PRESENT_DATE;
        }
    } else {
        return INVALID_DATE;
    }
}



