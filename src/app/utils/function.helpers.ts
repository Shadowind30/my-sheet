/**
 * @description Get total days in a given month of a given year. Will take current month and year if not provided
 * @param month
 * @param year
 * @returns number
 * */
export const getDaysInAMonth = (month?, year?): number => {
    const m = month || new Date().getMonth() + 1;
    const y = year || new Date().getFullYear();
    return new Date(y, m, 0).getDate();
};
