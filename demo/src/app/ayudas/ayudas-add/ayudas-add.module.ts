import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { AyudasAddPageRoutingModule } from './ayudas-add-routing.module';
import { AyudasAddPage } from './ayudas-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Agrega ReactiveFormsModule aquí
    IonicModule,
    AyudasAddPageRoutingModule
  ],
  declarations: [AyudasAddPage]
})
export class AyudasAddPageModule {}
