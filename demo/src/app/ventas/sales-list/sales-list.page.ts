import { Component, OnInit } from '@angular/core';
import { VentaServiceService } from '../sales-service.service'; // Asegúrate de que el servicio de ventas esté implementado
import { ClVenta } from '../modelo/ClVentas'; // Importa el modelo ClVenta

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.page.html',
  styleUrls: ['./sales-list.page.scss'],
})
export class SalesListPage implements OnInit {
  ventas: ClVenta[] = [];

  constructor(private ventaService: VentaServiceService) {}

  ngOnInit() {
    this.getVentas();
  }

  // Obtener la lista de ventas
  getVentas(): void {
    this.ventaService.getVentas().subscribe(
      (data) => {
        this.ventas = data;
      },
      (error) => {
        console.error('Error al obtener las ventas', error);
      }
    );
  }
}
