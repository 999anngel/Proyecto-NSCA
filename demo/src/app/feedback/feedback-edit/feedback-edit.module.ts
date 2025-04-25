import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackEditPageRoutingModule } from './feedback-edit-routing.module';

import { FeedbackEditPage } from './feedback-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackEditPageRoutingModule
  ],
  declarations: [FeedbackEditPage]
})
export class FeedbackEditPageModule {}
