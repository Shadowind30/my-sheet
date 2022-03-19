export interface IDay {
    id: number;
    day: number;
    sales: number;
    expenses: number;
    outlays: number;
    cash: number;
}

export interface IMonth {
    month: string;
    days: IDay[];
    totalSales: number;
    totalExpenses: number;
    totalOutlays: number;
    balance: number;
    averageSales: number;
    highestSales: number;
    lowestSales: number;
}

// export interface IYear {
//     year: string;
//     months: IMonth[];
//     total: number;
//     totalSales: number;
//     totalOutlays: number;
//     totalExpenses: number;
//     average: number;
//     highest: number;
//     lowest: number;
// }
