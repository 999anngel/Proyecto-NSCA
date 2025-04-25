import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RopaUnisexPageRoutingModule } from './ropa-unisex-routing.module';
import { RopaUnisexPage } from './ropa-unisex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RopaUnisexPageRoutingModule
  ],
  declarations: [RopaUnisexPage]
})
export class RopaUnisexPageModule {}  // Asegúrate de que esté correctamente nombrado
