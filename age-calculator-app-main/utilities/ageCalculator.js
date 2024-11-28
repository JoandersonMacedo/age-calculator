function ageCalculator(date) {
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

