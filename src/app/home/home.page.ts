import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public item$: Observable<any[]>;
  constructor(private firestore: Firestore) {
  }

  ngOnInit() {
    const collectionRef = collection(this.firestore, 'users');
    this.item$ = collectionData(collectionRef);
  }

}
