import { TConcept } from '../models/main.interfaces';

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

export const mapConcept = (concept: TConcept): string => {
    switch (concept) {
        case 'sale':
            return 'Venta';
        case 'outlay':
            return 'Gasto';
        case 'expense':
            return 'Gasto';
        default:
            return 'Otro';
    }
};
