import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AccesoriosUnisexPageRoutingModule } from './accesorios-unisex-routing.module';
import { AccesoriosUnisexPage } from './accesorios-unisex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosUnisexPageRoutingModule
  ],
  declarations: [AccesoriosUnisexPage]
})
export class AccesoriosUnisexPageModule {}  // Asegúrate de que esté correctamente nombrado
