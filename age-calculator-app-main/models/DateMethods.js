export const dateMain = moment;

export const now = dateMain();

export const today = moment().startOf('day');

export function defineDate (string) {
    return dateMain(string, 'DD/MM/YYYY')
}

export function isPast (date, refDate = now) {
    return date.isBefore(refDate);
}

export function isFuture (date, refDate = now) {
    return date.isAfter(refDate);
}

export function isValid (date) {
    return date.isValid();
}

export function diffYears (secDate, firDate) {
    return firDate.diff(secDate, 'years');
}

export function diffMonth (secDate, firDate) {
    return firDate.diff(secDate, 'month');
}

export function diffDay (secDate, firDate) {
    return firDate.diff(secDate, 'day');
}
