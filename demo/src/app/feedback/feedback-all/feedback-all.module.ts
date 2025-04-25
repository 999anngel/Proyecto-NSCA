import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackAllPageRoutingModule } from './feedback-all-routing.module';

import { FeedbackAllPage } from './feedback-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackAllPageRoutingModule
  ],
  declarations: [FeedbackAllPage]
})
export class FeedbackAllPageModule {}
