import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoListPageRoutingModule } from './metodo-list-routing.module';

import { MetodoListPage } from './metodo-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoListPageRoutingModule
  ],
  declarations: [MetodoListPage]
})
export class MetodoListPageModule {}
