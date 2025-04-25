import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ZapatillasUnisexPageRoutingModule } from './zapatillas-unisex-routing.module';
import { ZapatillasUnisexPage } from './zapatillas-unisex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatillasUnisexPageRoutingModule
  ],
  declarations: [ZapatillasUnisexPage]
})
export class ZapatillasUnisexPageModule {}  // Asegúrate de que esté correctamente nombrado
