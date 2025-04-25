import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackAddPage } from './feedback-add.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackAddPageRoutingModule {}
