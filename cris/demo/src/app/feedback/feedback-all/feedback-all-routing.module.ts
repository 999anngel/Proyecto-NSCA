import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackAllPage } from './feedback-all.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackAllPageRoutingModule {}
