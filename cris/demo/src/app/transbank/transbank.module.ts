import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransbankPageRoutingModule } from './transbank-routing.module';

import { TransbankPage } from './transbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransbankPageRoutingModule
  ],
  declarations: [TransbankPage]
})
export class TransbankPageModule {}
