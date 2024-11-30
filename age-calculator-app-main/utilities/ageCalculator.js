import moment  from "moment";

 export function ageCalculatorBeta (date) {
    const now = moment();
    let days = date.diff(now, 'days');

    if (days > 30) {
        days -= months * 30.39;
        var months = date.subtract(date, 'days').diff(now.subtract(days, 'days'), 'months');
    } 
    if (months > 12) {
        months -= years * 365.24;
        var years = date.subtract(months, months).diff(now.subtract(days, 'days').subtract(months, 'months'), 'years')
    }

    return (
        {
            years: years.toFixed(0),
            months: months.toFixed(0),
            days: days.toFixed(0)
        }
    )
}

export function ageCalculatorAlpha(date) {
    const nowTime = new Date().getTime;

    const oneDay = 86400000;
    const oneMonth = 30.39 * oneDay;
    const oneYear = 365.25 * oneDay;

    const milisecondsPeriod = nowTime - date.getTime();
    const years = (milisecondsPeriod / oneYear).toFixed(0);
    const yearsMiliseconds = years * oneDay;
    const months = ((milisecondsPeriod - yearsMiliseconds) / oneMonth).toFixed(0);
    const monthsMiliseconds = months * oneDay;
    const days = ((milisecondsPeriod - yearsMiliseconds - monthsMiliseconds) / oneDay).toFixed(0);

    return (
        {
            years: years,
            months: months,
            days: days
        }
    )
}

