import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { IColumn } from '../models/main.interfaces';
import { getDaysInAMonth } from '../utils/function.helpers';

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
      size: 2
    },
    {
      name: 'Venta',
      editable: true,
      size: 2
    },
    {
      name: 'Desembolso',
      editable: true,
      size: 4
    },
    {
      name: 'Gastos',
      editable: true,
      size: 2
    },
    {
      name: 'Caja',
      editable: true,
      size: 2
    }
  ];

  constructor(private firestore: Firestore) {
  }

  ngOnInit() {
    //const collectionRef = collection(this.firestore, 'users');
    //this.item$ = collectionData(collectionRef);
  }

}
