import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductServiceService } from '../producto/product-service.service'; // Asegúrate de importar el servicio
import { ClProducto } from '../producto/modelo/ClProducto'; // Asegúrate de importar el modelo
import { ClSesion } from '../sesion/modelo/ClSesion'; // Importar el modelo de sesión
import { SessionServiceService } from '../sesion/session-service.service'; // Importar el servicio de sesión

@Component({
  selector: 'app-Deportivo-unisex',
  templateUrl: './Deportivo-unisex.page.html',
  styleUrls: ['./Deportivo-unisex.page.scss'],
})
export class DeportivoUnisexPage implements OnInit {
  
  productosFiltrados: ClProducto[] = [];
  sesion: ClSesion | null = null;
  userRoleLink: string = '/login';

  constructor(
    private restApi: ProductServiceService,
    private loadingController: LoadingController,
    private sessionService: SessionServiceService // Inyectar el servicio de sesión
  ) {}

  ngOnInit() {
    this.getProducts();  // Llamar al método para obtener productos
    this.checkUserRole(); // Llamar a la función para verificar el rol del usuario
  }

  // Método para obtener la lista de productos y filtrar por género
  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.restApi.getProducts().subscribe({
      next: (res) => {
        // Filtrar productos por el género 'Deportivo'
        this.productosFiltrados = res.filter((producto: ClProducto) => producto.categoria === 'Deportivo'
        );
        loading.dismiss();
      },
      error: (err) => {
        console.log('Error:', err);
        loading.dismiss();
      }
    });
  }

  // Método para verificar el rol del usuario en la sesión
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

  // Métodos adicionales para la gestión de productos
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
