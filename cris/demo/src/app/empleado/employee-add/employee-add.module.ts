import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Agrega ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { EmployeeAddPage } from './employee-add.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de incluirlo aquí
    IonicModule,
    RouterModule.forChild([{ path: '', component: EmployeeAddPage }])
  ],
  declarations: [EmployeeAddPage]
})
export class EmployeeAddPageModule {}
