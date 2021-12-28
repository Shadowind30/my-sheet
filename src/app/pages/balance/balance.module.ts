import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BalancePage } from './balance.page';

import { BalancePageRoutingModule } from './balance-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BalancePageRoutingModule,
    ComponentsModule
  ],
  declarations: [BalancePage]
})
export class BalancePageModule {}
