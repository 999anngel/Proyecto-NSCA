import { Component, OnInit } from '@angular/core';
import { ClPago } from '../modelo/ClPago';
import { MetodoServiceService } from '../metodo-service.service'; // Servicio para métodos de pago

@Component({
  selector: 'app-metodo-list',
  templateUrl: './metodo-list.page.html',
  styleUrls: ['./metodo-list.page.scss'],
})
export class MetodoListPage implements OnInit {
  metodosPago: ClPago[] = [];
  metodosPagoFiltrados: ClPago[] = []; // Métodos filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(private restApi: MetodoServiceService) {}

  ngOnInit() {
    // Obtiene la lista de métodos de pago
    this.restApi.getMetodos().subscribe((metodos: ClPago[]) => {
      this.metodosPago = metodos.map((pago) => {
        return {
          ...pago,
          numeroTarjeta: this.enmascararTarjeta(pago.numeroTarjeta), // Enmascarar número de tarjeta
        };
      });
      this.metodosPagoFiltrados = this.metodosPago; // Inicializar con todos los métodos
    });
  }

  // Función para enmascarar el número de tarjeta
  enmascararTarjeta(numeroTarjeta: string): string {
    const ultimos4 = numeroTarjeta.slice(-4); // Obtener los últimos 4 dígitos
    return '**** **** **** ' + ultimos4; // Enmascarar los primeros 12 dígitos
  }

  // Función para filtrar métodos de pago según el término de búsqueda
  filtrarMetodos() {
    const term = this.searchTerm.toLowerCase();
    this.metodosPagoFiltrados = this.metodosPago.filter(metodo =>
      metodo.nombreTitular.toLowerCase().includes(term)
    );
  }
}