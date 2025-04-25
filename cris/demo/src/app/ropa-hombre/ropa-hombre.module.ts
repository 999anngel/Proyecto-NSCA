import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RopaHombrePageRoutingModule } from './ropa-hombre-routing.module';

import { RopaHombrePage } from './ropa-hombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RopaHombrePageRoutingModule
  ],
  declarations: [RopaHombrePage]
})
export class RopaHombrePageModule {}
