import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ZapatillasMujerPageRoutingModule } from './zapatillas-mujer-routing.module';
import { ZapatillasMujerPage } from './zapatillas-mujer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatillasMujerPageRoutingModule
  ],
  declarations: [ZapatillasMujerPage]
})
export class ZapatillasHombrePageModule {}  // Asegúrate de que esté correctamente nombrado
