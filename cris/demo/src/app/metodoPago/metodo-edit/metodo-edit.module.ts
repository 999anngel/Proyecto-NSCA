import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoEditPageRoutingModule } from './metodo-edit-routing.module';

import { MetodoEditPage } from './metodo-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoEditPageRoutingModule
  ],
  declarations: [MetodoEditPage]
})
export class MetodoEditPageModule {}
