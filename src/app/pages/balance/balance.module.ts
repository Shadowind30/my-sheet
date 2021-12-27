import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BalancePage } from './balance.page';

import { BalancePageRoutingModule } from './balance-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BalancePageRoutingModule
  ],
  declarations: [BalancePage]
})
export class BalancePageModule {}
