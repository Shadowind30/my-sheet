import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getDaysInAMonth, mapConcept } from 'src/app/utils/function.helpers';
import { IRow } from 'src/app/models/main.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public mapConcept = mapConcept;
  public item$: Observable<any[]>;
  public header: any = {
    time: 'Hora',
    amount: 'Monto',
    concept: 'Concepto'
  };

  public columns: IRow[] = [
    {
      time: '10:00',
      amount: 100,
      concept: 'sale'
    },
    {
      time: '10:05',
      amount: 200,
      concept: 'sale'
    },
    {
      time: '10:10',
      amount: 300,
      concept: 'expense'
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
