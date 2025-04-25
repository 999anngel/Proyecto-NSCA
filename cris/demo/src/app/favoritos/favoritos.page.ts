import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClFavorito } from '../favorito/modelo/ClFavorito';
import { FavoriteServiceService } from '../favorito/favorite-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion'; // Importar el modelo de sesión
import { SessionServiceService } from '../sesion/session-service.service'; // Importar el servicio de sesión

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, ViewWillEnter {
  favoritos: ClFavorito[] = [];
  sesion: ClSesion | null = null;
  userRoleLink: string = '/login'; // Enlace predeterminado

  constructor(
    public restApi: FavoriteServiceService,
    public loadingController: LoadingController,
    public router: Router,
    private alertController: AlertController,
    private sessionService: SessionServiceService // Inyectar el servicio de sesión
  ) {}

  ngOnInit() {
    this.getFavorites();
    this.checkUserRole(); // Verificar el rol del usuario al iniciar
  }

  // Se ejecuta cada vez que la página está por entrar y activarse
  ionViewWillEnter() {
    this.getFavorites(); // Actualizar la lista de favoritos
  }

  // Método que rescatará los favoritos
  async getFavorites() {
    console.log('Entrando :getFavorites');
    const loading = await this.loadingController.create({
      message: 'Cargando Favoritos...',
    });
    await loading.present();

    await this.restApi.getFavorites().subscribe({
      next: (res) => {
        this.favoritos = res;
        loading.dismiss();
      },
      error: (err) => {
        console.log('Error:', err);
        loading.dismiss();
      },
    });
  }

  // Nueva función para eliminar un favorito
  async eliminarFavorito(id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar favorito',
      message: '¿Estás seguro de que deseas eliminar este producto de tus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Eliminando favorito...',
            });
            await loading.present();

            this.restApi.deleteFavorite(id).subscribe({
              next: () => {
                this.favoritos = this.favoritos.filter((favorito) => favorito.id !== id);
                loading.dismiss();
              },
              error: (err) => {
                console.log('Error eliminando favorito:', err);
                loading.dismiss();
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para verificar el rol del usuario
  checkUserRole() {
    const idSesion = '1'; // Cambiar según cómo obtienes el ID de sesión
    this.sessionService.getSession(idSesion).subscribe({
      next: (sesion: ClSesion) => {
        this.sesion = sesion;
        if (sesion && 'rol' in sesion) {
          if (sesion.rol === 'empleado') {
            this.userRoleLink = `/admin/${sesion.idUsuario}`;
          } else if (sesion.rol === 'usuario') {
            this.userRoleLink = `/cuenta/${sesion.idUsuario}`;
          } else {
            this.userRoleLink = '/login';
          }
        } else {
          this.userRoleLink = '/login';
        }
      },
      error: (err) => {
        console.error('Error al obtener la sesión:', err);
        this.userRoleLink = '/login';
      }
    });
  }
}
