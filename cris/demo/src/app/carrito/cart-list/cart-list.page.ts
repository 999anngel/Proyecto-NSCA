import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { ClCarrito } from '../modelo/ClCarrito';
import { AlertController } from '@ionic/angular';
import { ClSesion } from '../../sesion/modelo/ClSesion'; // Asegúrate de importar el modelo
import { SessionServiceService } from '../../sesion/session-service.service'; // Asegúrate de importar el servicio
import { UserServiceService } from '../../usuario/user-service.service'; // Asegúrate de importar el servicio de usuario
import { ClUsuario } from '../../usuario/modelo/ClUsuario'; // Asegúrate de importar el modelo de usuario
import { VentaServiceService } from '../../ventas/sales-service.service'; // Importar el servicio de ventas
import { ClVenta } from '../../ventas/modelo/ClVentas'; // Asegúrate de importar el modelo de venta
import { Observable } from 'rxjs';
import { RedirectCommand, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { ProductServiceService } from 'src/app/producto/product-service.service';
import { TransbankService } from '../../transbank/transbank-service';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.page.html',
  styleUrls: ['./cart-list.page.scss'],
})
export class CartListPage implements OnInit {
  private cartUrl = 'http://localhost:3000/cartitems'; // Reemplaza con la URL de tu API para el carrito
  carritoItems: ClCarrito[] = [];
  total: number = 0;
  userRoleLink: string = '/login';
  usuario: ClUsuario | null = null;
  opcionesMetodoPago: string[] = [];
  metodoPagoSeleccionado: string | null = null;
  mostrarAgregarMetodoPago: boolean = false;
  sesion: ClSesion | null = null;

  constructor(
    private cartService: CartServiceService,
    private sessionService: SessionServiceService,
    private userService: UserServiceService,
    private productService: ProductServiceService,
    private ventaService: VentaServiceService, // Inyección del servicio de ventas
    private alertController: AlertController,
    private http: HttpClient, // Inyección del servicio HttpClient
    private tr: TransbankService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCarritoItems();
    this.checkUserRole();
    this.loadUser();
  }


  // Obtener la lista de productos en el carrito
  getCarritoItems(): void {
    this.cartService.getCartItems().subscribe(
      (data) => {
        this.carritoItems = data;
        this.calculateTotal(); // Llama al método para calcular el total después de obtener los ítems
      },
      (error) => {
        console.error('Error al obtener los productos del carrito', error);
      }
    );
  }

  // Método para cargar el usuario
  loadUser(): void {
    const idSesion = '1'; // Cambia esto según la lógica de tu aplicación para obtener el ID de la sesión
    this.sessionService.getSession(idSesion).subscribe({
      next: (sesion: ClSesion) => {
        if (sesion && sesion.idUsuario) { // Asegúrate de que 'usuarioId' esté en el objeto
          this.userService.getUserById(sesion.idUsuario).subscribe(user => {
            if (user) {
              this.usuario = user; // Asigna el usuario al objeto
              console.log('Usuario:', this.usuario);
              this.cargarMetodosDePago(); // Carga los métodos de pago del usuario
            } else {
              console.error('Usuario no encontrado');
            }
          });
        } else {
          console.error('Sesión no válida o sin usuario asociado');
        }
      }
    });
  }

  // Método para cargar los métodos de pago disponibles
  cargarMetodosDePago(): void {
    this.mostrarAgregarMetodoPago = true; // Inicializa en verdadero
    this.opcionesMetodoPago = []; // Reinicia las opciones de método de pago

    if (this.usuario) {
      // Comprobar cada método de pago y agregarlo si existe
      if (this.usuario.metodoPago1) {
        this.opcionesMetodoPago.push(this.usuario.metodoPago1);
        this.mostrarAgregarMetodoPago = false; // Ocultar botón si hay al menos un método
      }
      if (this.usuario.metodoPago2) {
        this.opcionesMetodoPago.push(this.usuario.metodoPago2);
        this.mostrarAgregarMetodoPago = false; // Ocultar botón si hay al menos un método
      }
      if (this.usuario.metodoPago3) {
        this.opcionesMetodoPago.push(this.usuario.metodoPago3);
        this.mostrarAgregarMetodoPago = false; // Ocultar botón si hay al menos un método
      }
    }
  }


  // Método para calcular el total de los subtotales
  calculateTotal(): void {
    this.total = this.carritoItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }  

  // Mostrar alerta de confirmación antes de eliminar
  async confirmDelete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteItem(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para eliminar un producto del carrito
  deleteItem(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(
      () => {
        console.log('Producto eliminado con éxito del carrito');
        this.getCarritoItems(); // Vuelve a obtener la lista de productos después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el producto del carrito', error);
      }
    );
  }

  // Método para verificar el rol del usuario
  checkUserRole() {
    const idSesion = '1';
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
        if (err.status === 404) {
          console.log('No hay ninguna sesión activa.');
          this.userRoleLink = '/login';
        } else {
          console.error('Error al obtener sesión:', err);
          this.userRoleLink = '/login';
        }
      }
    });
  }

  increaseQuantity(id: number): void {
    this.cartService.incrementCartItem(id).subscribe(
      () => {
        console.log('Cantidad incrementada correctamente');
        this.getCarritoItems(); // Reobtiene los items para actualizar la vista
      },
      (error) => {
        console.error('Error al incrementar la cantidad', error);
      }
    );
  }

  decreaseQuantity(id: number): void {
    this.cartService.decrementCartItem(id).subscribe(
      () => {
        console.log('Cantidad decrementada correctamente');
        this.getCarritoItems(); // Reobtiene los items para actualizar la vista
      },
      (error) => {
        console.error('Error al disminuir la cantidad', error);
      }
    );
  }
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  finalizarCompra(): void {
    if (!this.metodoPagoSeleccionado) {
      this.showAlert('Selecciona un método de pago antes de continuar.');
      return;
    }

    const venta: ClVenta = new ClVenta({
      idUsuario: this.usuario ? this.usuario.id : 0,
      productos: this.carritoItems.map(item => ({
        id: item.idProducto,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: this.total,
      metodoPago: this.metodoPagoSeleccionado,
      fecha: new Date()
    });

    this.ventaService.addVenta(venta).subscribe(
      (respuesta) => {
        console.log('Venta registrada con éxito:', respuesta);
        this.showAlert('Compra finalizada con éxito.');

        this.carritoItems.forEach(item => {
          this.productService.updateProductStockAndSales(item.idProducto, item.cantidad).subscribe(
            (updateResp) => {
              console.log(`Stock y ventas actualizados para el producto: ${item.nombre}`, updateResp);
            },
            (error) => {
              console.error(`Error al actualizar el stock y ventas del producto ${item.nombre}`, error);
            }
          );
        });

        // Limpiar el carrito
        this.cartService.deleteAllCartItems().subscribe(() => {
          console.log('Carrito limpiado con éxito.');
          this.getCarritoItems(); // Refrescar la lista de ítems (vacía)
        });
      },
      (error) => {
        console.error('Error al registrar la venta', error);
        this.showAlert('Ocurrió un error al finalizar la compra. Intenta de nuevo.');
      }
    );
  }
  

  pagar(): void {
    // Aquí puedes pasar los datos necesarios como buy_order y session_id
    const buyOrder = 'ordenCompra12345678';  // ID único para la compra
    const sessionId = 'sesion' + (this.usuario ? this.usuario.id : 'sesion123456');  // Usar ID de usuario o valor por defecto
    const amount = this.total;  // Total de la compra
    const returnUrl = 'http://localhost:8200/retornopagar';  // URL de retorno después del pago
  
    // Datos que se enviarán al backend en Flask para obtener el token_ws
    const data = {
      buy_order: buyOrder,
      session_id: sessionId,
      amount: amount,
      return_url: returnUrl
    };
  
    // Realiza la llamada HTTP al backend para obtener el token de Transbank
    this.http.post('http://localhost:5000/pagar', data).subscribe({
      next: (response: any) => {
        // Redirige al usuario a la URL de Transbank
        if (response.url) {
          window.location.href = response.url + "?token_ws=" + response.token;
        }
      },
      error: (error) => {
        console.error('Error al procesar el pago', error);
        this.showAlert('Ocurrió un error al procesar el pago. Intenta nuevamente.');
      }
    });
  }
  

}
