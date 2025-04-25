import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { ComprarPageRoutingModule } from './comprar-routing.module';

import { ComprarPage } from './comprar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agrega esta línea para importar ReactiveFormsModule
    IonicModule,
    ComprarPageRoutingModule
  ],
  declarations: [ComprarPage]
})
export class ComprarPageModule {}
