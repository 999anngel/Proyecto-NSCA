import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AyudasListPageRoutingModule } from './ayudas-list-routing.module';
import { AyudasListPage } from './ayudas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasListPageRoutingModule
  ],
  declarations: [AyudasListPage]
})
export class AyudasListPageModule {}
