import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAllPageRoutingModule } from './employee-all-routing.module';

import { EmployeeAllPage } from './employee-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAllPageRoutingModule
  ],
  declarations: [EmployeeAllPage]
})
export class EmployeeAllPageModule {}
