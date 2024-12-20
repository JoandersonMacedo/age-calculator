import { dateMain, defineDate, diffDay, diffMonth, diffYears, today } from "./DateMethods.js";

function Age(day, month, year) {
    const toNowYears = diffYears(defineDate(`${day}-${month}-${year}`), today);
    const toNowMonths = diffMonth(defineDate(`${day}-${month}-${year + toNowYears}`), today);
    const toNowDays = diffDay(defineDate(`${day}-${month + toNowMonths}-${year + toNowYears}`), today);

    return {
        toNowDays,
        toNowMonths,
        toNowYears
    }
}

export default Age;