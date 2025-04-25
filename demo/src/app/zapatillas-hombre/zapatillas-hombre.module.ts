import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ZapatillasHombrePageRoutingModule } from './zapatillas-hombre-routing.module';
import { ZapatillasHombrePage } from './zapatillas-hombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatillasHombrePageRoutingModule
  ],
  declarations: [ZapatillasHombrePage]
})
export class ZapatillasHombrePageModule {}  // Asegúrate de que esté correctamente nombrado
