import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { IColumn } from '../../models/main.interfaces';
import { getDaysInAMonth } from 'src/app/utils/function.helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public item$: Observable<any[]>;
  public columns: IColumn[] = [
    {
      name: 'Dia',
      editable: false,
      size: 1,
      content: new Array(getDaysInAMonth()).fill(0).map((_, i) => (i + 1).toString().padStart(2, '0'))
    },
    {
      name: 'Venta',
      editable: true,
      size: 2,
      content: []
    },
    {
      name: 'Desembolso',
      editable: true,
      size: 4,
      content: []
    },
    {
      name: 'Gastos',
      editable: true,
      size: 2,
      content: []
    },
    {
      name: 'Caja',
      editable: true,
      size: 2,
      content: []
    }
  ];

  constructor(private firestore: Firestore) {
  }

  ngOnInit() {
    const collectionRef = collection(this.firestore, 'users');
    this.item$ = collectionData(collectionRef);
    console.log(getDaysInAMonth(2, 2020));
  }

}
