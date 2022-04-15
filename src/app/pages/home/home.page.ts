import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getDaysInAMonth } from 'src/app/utils/function.helpers';
import { IDay, IMonth } from 'src/app/models/main.interfaces';
import { ModalController } from '@ionic/angular';
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

  public days: IDay[] = [];
  public month: IMonth = {
    id: 4,
    name: 'Abril 2022',
    days: this.days,
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
    private db: DummyService
  ) {}

  ngOnInit() {
    this.padStart = String.prototype.padStart;
    registerLocaleData(localeDR, 'es-DO');
    const collectionRef = collection(this.firestore, 'users');
    this.item$ = collectionData(collectionRef);
    const daysThisMonth = getDaysInAMonth();
    console.log(daysThisMonth);

    for (let i = 1; i <= daysThisMonth; i++) {
      this.days.push({
        day: i,
        sales: null,
        expenses: null,
        outlays: null,
        cash: 0
      });
    }
    this.today = new Date();
  }

  public onValueChange(event, field: 'sales'| 'expenses' | 'outlays', index: number) {
    this.days[index][field] = +event.target.value;
    this.days[index].cash = this.days[index].sales - this.days[index].expenses - this.days[index].outlays;

    this.month.totalSales = this.days.reduce((acc, curr) => acc + curr.sales, 0);
    this.month.totalExpenses = this.days.reduce((acc, curr) => acc + curr.expenses, 0);
    this.month.totalOutlays = this.days.reduce((acc, curr) => acc + curr.outlays, 0);

    this.month.balance = this.days.reduce((acc, cur) => acc + cur.cash, 0);
    this.month.averageSales = this.month.balance / this.days.length;
    this.month.highestSales = this.days.reduce((acc, cur) => acc > cur.sales ? acc : cur.sales, 0);
    this.month.lowestSales = this.days.reduce((acc, cur) => acc < cur.sales ? acc : cur.sales, this.days[0].sales);
  }

  public gotoPrevMonth() {
    this.month = this.db.months.find(m => m.id === this.month.id - 1);
    this.days = this.month.days;
  }
  public gotoNextMonth() {
    this.month = this.db.months.find(m => m.id === this.month.id + 1);
    this.days = this.month.days;
  }
}
