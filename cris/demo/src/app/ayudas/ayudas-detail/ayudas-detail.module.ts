import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasDetailPageRoutingModule } from './ayudas-detail-routing.module';

import { AyudasDetailPage } from './ayudas-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasDetailPageRoutingModule
  ],
  declarations: [AyudasDetailPage]
})
export class AyudasDetailPageModule {}
