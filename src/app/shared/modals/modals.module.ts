import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRowComponent } from './add-row/add-row.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODALS = [
  AddRowComponent
];

@NgModule({
  declarations: [
    ...MODALS
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...MODALS
  ]
})
export class ModalsModule { }
