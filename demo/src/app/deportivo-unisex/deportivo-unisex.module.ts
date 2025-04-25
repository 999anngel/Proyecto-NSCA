import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeportivoUnisexPageRoutingModule } from './deportivo-unisex-routing.module';
import { DeportivoUnisexPage } from './deportivo-unisex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportivoUnisexPageRoutingModule
  ],
  declarations: [DeportivoUnisexPage]
})
export class DeportivoUnisexPageModule {}  // Asegúrate de que esté correctamente nombrado
