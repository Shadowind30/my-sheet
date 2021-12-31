import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IRow, TConcept } from 'src/app/models/main.interfaces';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss'],
})
export class AddRowComponent implements OnInit {

  @Input() private id: number = null;
  public amount = null;
  public concept: TConcept = 'sale';
  constructor(private modal: ModalController) { }

  ngOnInit() {}

  public async addRow() {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`.padStart(5, '0');
    const data: IRow = {
      concept: this.concept,
      amount: this.amount,
      time,
      id: this.id
    };
    console.log(data);
    await this.modal.dismiss({
      data
    });
  }

}
