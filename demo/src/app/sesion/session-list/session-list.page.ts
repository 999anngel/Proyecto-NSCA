import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../session-service.service'; // Asegúrate de ajustar la ruta
import { ClSesion } from '../modelo/ClSesion'; // Importa el modelo de sesión
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.page.html',
  styleUrls: ['./session-list.page.scss'],
})
export class SessionListPage implements OnInit {
  sesiones: ClSesion[] = []; // Arreglo para almacenar las sesiones

  constructor(
    private sessionService: SessionServiceService, // Inyectamos el servicio de sesión
    private alertController: AlertController // Inyectamos el AlertController para mostrar alertas
  ) { }

  ngOnInit() {
    this.getSesiones(); // Llama a la función para obtener las sesiones al iniciar el componente
  }

  // Obtener la lista de sesiones
  getSesiones(): void {
    this.sessionService.getSessions().subscribe(
      (data) => {
        this.sesiones = data; // Almacena los datos en el arreglo sesiones
      },
      (error) => {
        console.error('Error al obtener las sesiones', error); // Manejo de errores
      }
    );
  }

  // Mostrar alerta de confirmación antes de eliminar
  async confirmDelete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteSession(id); // Llama a la función para eliminar la sesión
          }
        }
      ]
    });

    await alert.present(); // Muestra la alerta
  }

  // Método para eliminar una sesión
  deleteSession(id: number): void {
    this.sessionService.deleteSession(id).subscribe(
      () => {
        console.log('Sesión eliminada con éxito'); // Mensaje en consola
        this.getSesiones(); // Vuelve a obtener la lista de sesiones después de eliminar
      },
      (error) => {
        console.error('Error al eliminar la sesión', error); // Manejo de errores
      }
    );
  }
}
