import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTarjetaPageRoutingModule } from './ver-tarjeta-routing.module';

import { VerTarjetaPage } from './ver-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTarjetaPageRoutingModule
  ],
  declarations: [VerTarjetaPage]
})
export class VerTarjetaPageModule {}
