import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoDetailPageRoutingModule } from './metodo-detail-routing.module';

import { MetodoDetailPage } from './metodo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoDetailPageRoutingModule
  ],
  declarations: [MetodoDetailPage]
})
export class MetodoDetailPageModule {}
