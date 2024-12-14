import moment from "moment";

function Age(day, month, year) {
    const today = moment().startOf('day');

    const toNowYears = today.diff(moment(`${day}-${month}-${year}`, 'D-M-YYYY'), 'years');
    const toNowMonths = today.diff(moment(`${day}-${month}-${year + toNowYears}`, 'D-M-YYYY'), 'months');
    const toNowDays = today.diff(moment(`${day}-${month + toNowMonths}-${year + toNowYears}`, 'D-M-YYYY'), 'days');

    return {
        toNowDays,
        toNowMonths,
        toNowYears
    }
}

export default Age;