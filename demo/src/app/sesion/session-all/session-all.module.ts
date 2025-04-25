import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionAllPageRoutingModule } from './session-all-routing.module';

import { SessionAllPage } from './session-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionAllPageRoutingModule
  ],
  declarations: [SessionAllPage]
})
export class SessionAllPageModule {}
