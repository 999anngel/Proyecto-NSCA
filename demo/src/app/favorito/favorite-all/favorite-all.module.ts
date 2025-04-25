import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteAllPageRoutingModule } from './favorite-all-routing.module';

import { FavoriteAllPage } from './favorite-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteAllPageRoutingModule
  ],
  declarations: [FavoriteAllPage]
})
export class FavoriteAllPageModule {}
