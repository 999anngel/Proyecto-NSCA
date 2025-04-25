import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartAllPageRoutingModule } from './cart-all-routing.module';

import { CartAllPage } from './cart-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartAllPageRoutingModule
  ],
  declarations: [CartAllPage]
})
export class CartAllPageModule {}
