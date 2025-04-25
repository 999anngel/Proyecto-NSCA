import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasAllPageRoutingModule } from './ayudas-all-routing.module';

import { AyudasAllPage } from './ayudas-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasAllPageRoutingModule
  ],
  declarations: [AyudasAllPage]
})
export class AyudasAllPageModule {}
