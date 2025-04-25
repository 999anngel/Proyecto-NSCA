import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ClUsuario } from '../modelo/ClUsuario';
import { AlertController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit, ViewWillEnter {
  usuarios: ClUsuario[] = [];

  constructor(
    private userService: UserServiceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  // Called whenever the page is about to enter and become active
  ionViewWillEnter() {
    this.getUsuarios(); // Refresh the user list
  }

  // Obtener la lista de usuarios
  getUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  // Mostrar alerta de confirmación antes de eliminar
  async confirmDelete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para eliminar un usuario
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Usuario eliminado con éxito');
        this.getUsuarios(); // Vuelve a obtener la lista de usuarios después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }
}
