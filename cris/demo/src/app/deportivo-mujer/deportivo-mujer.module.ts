import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeportivoMujerPageRoutingModule } from './deportivo-mujer-routing.module';
import { DeportivoMujerPage } from './deportivo-mujer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportivoMujerPageRoutingModule
  ],
  declarations: [DeportivoMujerPage]
})
export class DeportivoMujerPageModule {}  // Asegúrate de que esté correctamente nombrado
