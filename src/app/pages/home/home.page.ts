import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getDaysInAMonth, mapConcept } from 'src/app/utils/function.helpers';
import { IRow } from 'src/app/models/main.interfaces';
import { ModalController } from '@ionic/angular';
import { AddRowComponent } from 'src/app/shared/modals/add-row/add-row.component';
import { AlertsService } from 'src/app/utils/alerts.service';
import { registerLocaleData } from '@angular/common';
import localeDR from '@angular/common/locales/es-DO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public mapConcept = mapConcept;
  public today = null;
  public item$: Observable<any[]>;
  public header: any = {
    time: 'Hora',
    amount: 'Monto',
    concept: 'Concepto'
  };

  public rows: IRow[] = [
  ];

  constructor(private firestore: Firestore, private modal: ModalController, private _alert: AlertsService) {
  }

  ngOnInit() {
    registerLocaleData(localeDR, 'es-DO');
    const collectionRef = collection(this.firestore, 'users');
    this.item$ = collectionData(collectionRef);
    console.log(getDaysInAMonth());
    this.today = new Date();
  }

  public async addRow() {
    const modal = await this.modal.create({
      component: AddRowComponent,
      cssClass: 'mini-modal',
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      componentProps: {
        id: this.rows.length + 1
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data && data.data) {
      this.rows.push(data.data);
    }

  }

  public async options(row: IRow) {
    const alert = await this._alert.simpleAlert(
      `¿Desea eliminar los ${row.amount} de ${mapConcept(row.concept)}?`,
      [
        {
        text: 'Cancelar',
        role: 'CANCEL'
        },
        {
        text: 'Eliminar',
        role: 'DELETE',
        }
      ],
      'Confirmacion',
    );

    const res = await alert.onDidDismiss();
    if(res.role === 'DELETE') {
      this.rows = this.rows.filter(item => item.id !== row.id);
    }
  }

}
