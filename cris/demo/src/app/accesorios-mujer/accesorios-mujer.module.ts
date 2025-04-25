import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AccesoriosMujerPageRoutingModule } from './accesorios-mujer-routing.module';
import { AccesoriosMujerPage } from './accesorios-mujer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosMujerPageRoutingModule
  ],
  declarations: [AccesoriosMujerPage]
})
export class AccesoriosMujerPageModule {}  // Asegúrate de que esté correctamente nombrado
