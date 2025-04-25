import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisisAllPageRoutingModule } from './analisis-all-routing.module';

import { AnalisisAllPage } from './analisis-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisAllPageRoutingModule
  ],
  declarations: [AnalisisAllPage]
})
export class AnalisisAllPageModule {}
