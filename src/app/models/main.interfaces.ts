export interface IColumn {
    name: string;
    size: number;
    editable: boolean;
    content: any[];
}

export interface IDay {
    day: string;
    sales: number[];
    outlays: number[];
    expenses: number[];
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
