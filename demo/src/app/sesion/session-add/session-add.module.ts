import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionAddPageRoutingModule } from './session-add-routing.module';
import { SessionAddPage } from './session-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionAddPageRoutingModule,
    ReactiveFormsModule,      // <<========
  ],
  declarations: [SessionAddPage]
})
export class SessionAddPageModule {}
