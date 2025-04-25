import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionEditPageRoutingModule } from './session-edit-routing.module';

import { SessionEditPage } from './session-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionEditPageRoutingModule
  ],
  declarations: [SessionEditPage]
})
export class SessionEditPageModule {}
