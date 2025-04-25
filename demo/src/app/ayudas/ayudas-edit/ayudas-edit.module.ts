import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasEditRoutingModule  } from './ayudas-edit-routing.module'; // Asegúrate de que este archivo exista y esté en la misma carpeta


import { AyudasEditPage } from './ayudas-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasEditRoutingModule 
  ],
  declarations: [AyudasEditPage]
})
export class AyudasEditPageModule {}
