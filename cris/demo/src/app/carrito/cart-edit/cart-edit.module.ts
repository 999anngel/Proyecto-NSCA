import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartEditPageRoutingModule } from './cart-edit-routing.module';

import { CartEditPage } from './cart-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartEditPageRoutingModule
  ],
  declarations: [CartEditPage]
})
export class CartEditPageModule {}
