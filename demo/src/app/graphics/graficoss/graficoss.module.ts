import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraficossPageRoutingModule } from './graficoss-routing.module';
import { GraficossPage } from './graficoss.page'; // Asegúrate de que este sea el nombre correcto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficossPageRoutingModule
  ],
  declarations: [GraficossPage] // Asegúrate de que el componente esté correctamente declarado
})
export class GraficossPageModule {}
