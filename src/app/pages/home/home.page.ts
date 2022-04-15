import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getDaysInAMonth } from 'src/app/utils/function.helpers';
import { IDay, IMonth, IMonthInfo } from 'src/app/models/main.interfaces';
import { IonicSafeString, ModalController } from '@ionic/angular';
import { AlertsService } from 'src/app/utils/alerts.service';
import { registerLocaleData } from '@angular/common';
import localeDR from '@angular/common/locales/es-DO';
import { DummyService } from 'src/app/providers/inner/dummy.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public today = null;
  public item$: Observable<any[]>;

  public month: IMonth = {
    id: 4,
    name: 'Abril 2022',
    days: [],
  };

  public monthInfo: IMonthInfo = {
    totalSales: 0,
    totalExpenses: 0,
    totalOutlays: 0,
    balance: 0,
    averageSales: 0,
    highestSales: 0,
    lowestSales: 0,
  };

  public padStart = null;

  constructor(
    private firestore: Firestore,
    private modal: ModalController,
    private _alert: AlertsService,
    public db: DummyService
  ) {}

  ngOnInit() {
    this.padStart = String.prototype.padStart;
    registerLocaleData(localeDR, 'es-DO');
    const collectionRef = collection(this.firestore, 'users');
    this.item$ = collectionData(collectionRef);

    this.today = new Date();
    const currentMonth = this.db.months.find(
      (m) => m.id === this.today.getMonth() + 1
    );
    if (currentMonth) {
      this.month = currentMonth;
    } else {
      this.month = this.createBlankMonth();
      this.db.months.push(this.month);
    }
    this.calcMonthInfo(this.month);
  }

  public onValueChange(
    event,
    field: 'sales' | 'expenses' | 'outlays',
    index: number
  ) {
    this.month.days[index][field] = +event.target.value;
    this.month.days[index].cash =
      this.month.days[index].sales -
      this.month.days[index].expenses -
      this.month.days[index].outlays;

    this.calcMonthInfo(this.month);

    /// Save to DB
    this.db.months[this.month.id - 1] = this.month;
    console.log(this.db.months);
  }

  public gotoPrevMonth() {
    this.gotoMonth(this.month.id - 2);
  }
  public gotoNextMonth() {
    this.gotoMonth(this.month.id);
  }

  public gotoMonth(id: number) {
    this.month = this.db.months[id];
    this.month.days = this.month.days;
    this.calcMonthInfo(this.month);
  }

  public async showMonthInfo() {
    this._alert.simpleAlert(
      new IonicSafeString(`
        <p>Balance: ${this.monthInfo.balance}</p>
        <p>Total de ventas: ${this.monthInfo.totalSales}</p>
        <p>Total de gastos: ${this.monthInfo.totalExpenses}</p>
        <p>Total de desembolsos: ${this.monthInfo.totalOutlays}</p>
        <p>Promedio de ventas: ${this.monthInfo.averageSales}</p>
        <p>Mayor venta: ${this.monthInfo.highestSales}</p>
        <p>Menor venta: ${this.monthInfo.lowestSales}</p>
      `),
      ['Entendido'],
      this.month.name
    );
  }

  private createBlankMonth(): IMonth {
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysThisMonth = getDaysInAMonth();
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const id = this.db.months.length + 1;
    const month: IMonth = {
      id,
      name: `${monthNames[monthNumber - 1]} ${year}`,
      days: [],
    };

    for (let i = 1; i <= daysThisMonth; i++) {
      month.days.push({
        day: i,
        sales: null,
        expenses: null,
        outlays: null,
        cash: 0,
      });
    }
    return month;
  }

  private calcMonthInfo(month: IMonth) {
    // Calculate month info
    this.monthInfo.totalSales = month.days.reduce(
      (acc, curr) => acc + curr.sales,
      0
    );
    this.monthInfo.totalExpenses = month.days.reduce(
      (acc, curr) => acc + curr.expenses,
      0
    );
    this.monthInfo.totalOutlays = month.days.reduce(
      (acc, curr) => acc + curr.outlays,
      0
    );

    this.monthInfo.balance = month.days.reduce((acc, cur) => acc + cur.cash, 0);

    /// Calculate Averages
    this.monthInfo.averageSales = this.monthInfo.balance / month.days.length;
    this.monthInfo.highestSales = month.days.reduce(
      (acc, cur) => (acc > cur.sales ? acc : cur.sales),
      0
    );
    this.monthInfo.lowestSales = month.days.reduce(
      (acc, cur) => (acc < cur.sales ? acc : cur.sales),
      month.days[0].sales
    );
  }
}
