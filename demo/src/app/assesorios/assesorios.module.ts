import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssesoriosPageRoutingModule } from './assesorios-routing.module';

import { AssesoriosPage } from './assesorios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssesoriosPageRoutingModule
  ],
  declarations: [AssesoriosPage]
})
export class AssesoriosPageModule {}
