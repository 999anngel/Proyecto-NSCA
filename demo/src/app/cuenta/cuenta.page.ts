import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../usuario/user-service.service';
import { ClUsuario } from '../usuario/modelo/ClUsuario';
import { SessionServiceService } from '../sesion/session-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion';
import { AlertController, ToastController } from '@ionic/angular'; // Importa AlertController y ToastController

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  usuarioId: number | null = null;
  usuario: ClUsuario | null = null;
  sesion: ClSesion | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,
    private sessionService: SessionServiceService,
    private alertController: AlertController, // Inyecta AlertController
    private toastController: ToastController  // Inyecta ToastController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idParam = params['id'];

      if (idParam) {
        this.usuarioId = +idParam; // Convierte el ID a número
        this.loadUser(); // Carga el usuario cada vez que se navega a esta página
      } else {
        console.error('Usuario ID no disponible');
      }
    });
  }

  loadUser() {
    if (this.usuarioId) {
      this.userService.getUserById(this.usuarioId).subscribe(user => {
        if (user) {
          this.usuario = user;
          console.log('Usuario:', this.usuario);
        } else {
          console.error('Usuario no encontrado');
        }
      });
    } else {
      console.error('ID de usuario inválido');
    }
  }

  // Método para mostrar el cuadro de confirmación
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.deleteSession(1); // Llama al método para eliminar la sesión
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      translucent: true, // Hace el fondo del toast semi-transparente
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          },
        },
      ],
    });
    await toast.present();
  }

  // Método para eliminar la sesión
  deleteSession(sessionId: number) {
    this.sessionService.deleteSession(sessionId).subscribe({
      next: async () => {
        console.log('Sesión eliminada con éxito');
        this.router.navigate(['/']); // Redirige a la página principal

        // Muestra un toast de éxito
        const toast = await this.toastController.create({
          message: 'Sesión cerrada correctamente',
          duration: 3000,
          position: 'top',
          translucent: true, // Hace el fondo del toast semi-transparente
          buttons: [
            {
              text: 'Cerrar',
              role: 'cancel',
              handler: () => {
                console.log('Toast cerrado');
              },
            },
          ],
        });
        toast.present();
      },
      error: async (err) => {
        console.error('Error al eliminar la sesión:', err);

        // Muestra un toast de error
        const toast = await this.toastController.create({
          message: 'Error al cerrar la sesión',
          duration: 3000,
          position: 'top',
          translucent: true, // Hace el fondo del toast semi-transparente
          buttons: [
            {
              text: 'Cerrar',
              role: 'cancel',
              handler: () => {
                console.log('Toast cerrado');
              },
            },
          ],
        });
        toast.present();
      }
    });
  }
}