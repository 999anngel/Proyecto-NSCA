import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteAddPage } from './favorite-add.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteAddPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteAddPageRoutingModule {}
