import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AccesoriosHombrePageRoutingModule } from './accesorios-hombre-routing.module';
import { AccesoriosHombrePage } from './accesorios-hombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosHombrePageRoutingModule
  ],
  declarations: [AccesoriosHombrePage]
})
export class AccesoriosHombrePageModule {}  // Asegúrate de que esté correctamente nombrado
