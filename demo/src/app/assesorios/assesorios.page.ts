import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductServiceService } from '../producto/product-service.service'; // Importar el servicio de productos
import { ClProducto } from '../producto/modelo/ClProducto'; // Importar el modelo de producto
import { ClSesion } from '../sesion/modelo/ClSesion'; // Importar el modelo de sesión
import { SessionServiceService } from '../sesion/session-service.service'; // Importar el servicio de sesión

@Component({
  selector: 'app-assesorios',
  templateUrl: './assesorios.page.html',
  styleUrls: ['./assesorios.page.scss'],
})
export class AssesoriosPage implements OnInit {
  // Variable para almacenar los productos filtrados
  productosFiltrados: ClProducto[] = [];
  sesion: ClSesion | null = null;
  userRoleLink: string = '/login'; // Enlace predeterminado

  constructor(
    private restApi: ProductServiceService,
    private loadingController: LoadingController,
    private sessionService: SessionServiceService // Inyectar el servicio de sesión
  ) {}

  ngOnInit() {
    this.getProducts(); // Cargar los productos al iniciar la página
    this.checkUserRole(); // Verificar el rol del usuario
  }

  // Método para obtener la lista de productos y filtrar por categoría
  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.restApi.getProducts().subscribe({
      next: (res) => {
        // Filtrar productos por la categoría 'Accesorios'
        this.productosFiltrados = res.filter((producto: ClProducto) => producto.categoria === 'Accesorios');
        loading.dismiss();
      },
      error: (err) => {
        console.log('Error:', err);
        loading.dismiss();
      }
    });
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

  // Métodos adicionales (si es necesario)
  navigateToProductoDetail(item: ClProducto) {
    console.log('Navegar a detalle del producto:', item);
  }

  editProducto(item: ClProducto) {
    console.log('Editar producto:', item);
  }

  saveProducto(item: ClProducto) {
    console.log('Guardar producto:', item);
  }

  removeProducto(item: ClProducto) {
    console.log('Eliminar producto:', item);
  }
}
