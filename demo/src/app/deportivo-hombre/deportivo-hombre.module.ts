import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeportivoHombrePageRoutingModule } from './deportivo-hombre-routing.module';
import { DeportivoHombrePage } from './deportivo-hombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportivoHombrePageRoutingModule
  ],
  declarations: [DeportivoHombrePage]
})
export class DeportivoHombrePageModule {}  // Asegúrate de que esté correctamente nombrado
