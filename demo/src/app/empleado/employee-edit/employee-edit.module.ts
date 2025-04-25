import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { EmployeeEditPageRoutingModule } from './employee-edit-routing.module';
import { EmployeeEditPage } from './employee-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de incluir esto
    IonicModule,
    EmployeeEditPageRoutingModule
  ],
  declarations: [EmployeeEditPage]
})
export class EmployeeEditPageModule {}