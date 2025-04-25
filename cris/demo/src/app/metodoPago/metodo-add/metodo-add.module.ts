import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoAddPageRoutingModule } from './metodo-add-routing.module';

import { MetodoAddPage } from './metodo-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MetodoAddPage]
})
export class MetodoAddPageModule {}
