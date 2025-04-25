import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RopaMujerPageRoutingModule } from './ropa-mujer-routing.module';

import { RopaMujerPage } from './ropa-mujer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RopaMujerPageRoutingModule
  ],
  declarations: [RopaMujerPage]
})
export class RopaMujerPageModule {}
