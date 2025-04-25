import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductServiceService } from '../producto/product-service.service'; // Asegúrate de importar el servicio
import { ClProducto } from '../producto/modelo/ClProducto'; // Asegúrate de importar el modelo
import { ClSesion } from '../sesion/modelo/ClSesion'; // Importar el modelo de sesión
import { SessionServiceService } from '../sesion/session-service.service'; // Importar el servicio de sesión

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit, OnDestroy {

  productos: ClProducto[] = [];
  imageChangeInterval: any;

  // Sesión y navegación basada en rol
  sesion: ClSesion | null = null;
  userRoleLink: string = '/login';

  constructor(
    private restApi: ProductServiceService,
    private loadingController: LoadingController,
    private sessionService: SessionServiceService // Inyectar el servicio de sesión
  ) {}

  ngOnInit() {
    this.getProducts();
    this.checkUserRole(); // Llamar para obtener el rol del usuario
  }

  ngOnDestroy() {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.restApi.getProducts().subscribe({
      next: (res) => {
        this.productos = res;
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        loading.dismiss();
      }
    });
  }

  checkUserRole() {
    const idSesion = '1'; // Aquí debes cambiar según cómo obtienes el ID de sesión
    this.sessionService.getSession(idSesion).subscribe({
      next: (sesion: ClSesion) => {
        console.log('Sesión obtenida:', sesion);
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
