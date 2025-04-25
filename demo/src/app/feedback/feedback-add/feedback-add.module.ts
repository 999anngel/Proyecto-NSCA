import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedbackAddPageRoutingModule } from './feedback-add-routing.module';
import { FeedbackAddPage } from './feedback-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FeedbackAddPage]
})
export class FeedbackAddPageModule {}
