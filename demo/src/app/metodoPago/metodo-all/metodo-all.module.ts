import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoAllPageRoutingModule } from './metodo-all-routing.module';

import { MetodoAllPage } from './metodo-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoAllPageRoutingModule
  ],
  declarations: [MetodoAllPage]
})
export class MetodoAllPageModule {}
