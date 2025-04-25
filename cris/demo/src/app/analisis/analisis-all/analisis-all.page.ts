import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analisis-all',
  templateUrl: './analisis-all.page.html',
  styleUrls: ['./analisis-all.page.scss'],
})
export class AnalisisAllPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initVentasGrafico();
    this.initTemporadaVentasGrafico();
    this.initTallasVendidasGrafico();
    this.initColoresVendidosGrafico();
  }

  // Gráfico de Línea para Lista de Ventas
  initVentasGrafico() {
    const ctx = document.getElementById('ventasGrafico') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
            label: 'Ventas',
            data: [200, 400, 300, 500, 700, 600],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    }
  }

  // Gráfico de Barras para Temporada de Ventas
  initTemporadaVentasGrafico() {
    const ctx = document.getElementById('temporadaVentasGrafico') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
          datasets: [{
            label: 'Ventas',
            data: [500, 800, 300, 400],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  // Gráfico de Pie para Tallas Más Vendidas
  initTallasVendidasGrafico() {
    const ctx = document.getElementById('tallasVendidasGrafico') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['S', 'M', 'L', 'XL'],
          datasets: [{
            label: 'Tallas Vendidas',
            data: [300, 500, 400, 100],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }

  // Gráfico de Radar para Colores Más Vendidos
  initColoresVendidosGrafico() {
    const ctx = document.getElementById('coloresVendidosGrafico') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'],
          datasets: [{
            label: 'Colores Vendidos',
            data: [150, 250, 100, 300, 200],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 350
            }
          }
        }
      });
    }
  }
}
