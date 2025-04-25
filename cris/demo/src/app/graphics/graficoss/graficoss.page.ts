import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin

@Component({
  selector: 'app-home',
  templateUrl: 'graficoss.page.html',
  styleUrls: ['graficoss.page.scss'],
})
export class GraficossPage implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    this.crearGrafico();
  }

  crearGrafico() {
    const canvas = document.getElementById('miGrafico') as HTMLCanvasElement;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const dataValues = [120, 150, 180, 130, 170, 160, 210, 230, 180, 200, 220, 250];
        const miGrafico = new Chart(ctx, {
          type: 'doughnut',  // Gráfico de pastel
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
              label: 'Compras Anuales',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(201, 203, 207, 0.6)',
                'rgba(100, 255, 100, 0.6)',
                'rgba(0, 255, 255, 0.6)',
                'rgba(255, 140, 0, 0.6)',
                'rgba(128, 0, 128, 0.6)',
                'rgba(0, 128, 128, 0.6)'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Cambiado a false para permitir el ajuste del gráfico
            plugins: {
              legend: {
                display: false, // Ocultar la leyenda
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bodyColor: '#fff',
                cornerRadius: 4,
              },
              datalabels: {
                color: '#fff',
                anchor: 'center', // Centrar el texto
                align: 'center', // Alinear el texto al centro
                formatter: (value, context) => {
                  const total = dataValues.reduce((acc, val) => acc + val, 0); // Calcular el total
                  const percentage = ((value / total) * 100).toFixed(2) + '%';
                  return percentage; // Mostrar porcentaje
                }
              }
            }
          },
          plugins: [ChartDataLabels] // Añadir el plugin aquí
        });
      } else {
        console.error('No se pudo obtener el contexto 2D del canvas.');
      }
    } else {
      console.error('No se pudo encontrar el canvas con id "miGrafico".');
    }
  }
}
