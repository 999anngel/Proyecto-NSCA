import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetornopagarPageRoutingModule } from './retornopagar-routing.module';

import { RetornopagarPage } from './retornopagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetornopagarPageRoutingModule
  ],
  declarations: [RetornopagarPage]
})
export class RetornopagarPageModule {}
