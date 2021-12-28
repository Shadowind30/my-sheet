export type TConcept = 'sale' | 'outlay' | 'expense';
export interface IRow {
    time: string;
    amount: number;
    concept: TConcept;
}

export interface IDay {
    day: string;
    rows: IRow[];
    sales: number;
    outlays: number;
    expenses: number;
    cash: number;
}

export interface IMonth {
    month: string;
    days: IDay[];
    balance: number;
    totalSales: number;
    totalOutlays: number;
    totalExpenses: number;
    average: number;
    highest: number;
    lowest: number;
}

export interface IYear {
    year: string;
    months: IMonth[];
    total: number;
    totalSales: number;
    totalOutlays: number;
    totalExpenses: number;
    average: number;
    highest: number;
    lowest: number;
}
