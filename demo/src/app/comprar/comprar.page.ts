import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../producto/product-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FavoriteServiceService } from '../favorito/favorite-service.service';
import { ClFavorito } from '../favorito/modelo/ClFavorito';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClProducto } from '../producto/modelo/ClProducto';
import { ClCarrito } from '../carrito/modelo/ClCarrito';
import { CartServiceService } from '../carrito/cart-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion';
import { SessionServiceService } from '../sesion/session-service.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.page.html',
  styleUrls: ['./comprar.page.scss'],
})
export class ComprarPage implements OnInit {
  productoId: number | null = null;
  producto: ClProducto | null = null;
  favoriteForm: FormGroup;
  carritoForm: FormGroup;
  favoritos: ClFavorito[] = [];
  carritoItems: ClCarrito[] = [];
  userSessionData: any;
  userId: number = 0;
  sesion: ClSesion | null = null; // Sesión del usuario
  userRoleLink: string = ''; // Link basado en el rol del usuario


  images: string[] = [];
  currentImageIndex: number = 0;
  currentImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private favoriteService: FavoriteServiceService,
    private cartService: CartServiceService, // Cambié el nombre para seguir las convenciones
    private sessionService: SessionServiceService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private productService: ProductServiceService,
  ) {
    this.favoriteForm = this.formBuilder.group({
      id_producto: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      imagen_producto: ['', Validators.required]
    });

    this.carritoForm = this.formBuilder.group({
      idProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      img: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      idUsuario: [null, Validators.required] // Asegúrate de que el campo idUsuario esté aquí
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.productoId = +idParam;

      if (this.productoId) {
        this.productService.getProductById(this.productoId).subscribe(product => {
          if (product) {
            this.producto = product;
            this.images = [
              "../assets/img/" + this.producto.img1,
              "../assets/img/" + this.producto.img2,
              "../assets/img/" + this.producto.img3,
              "../assets/img/" + this.producto.img4
            ];
            this.currentImage = this.images[this.currentImageIndex];
            console.log('Producto:', this.producto);

            this.favoriteForm.patchValue({
              id_producto: this.producto.id,
              nombre_producto: this.producto.nombre,
              imagen_producto: this.producto.img1
            });

            this.carritoForm.patchValue({
              idProducto: this.producto.id,
              nombre: this.producto.nombre,
              precio: this.producto.precio,
              img: this.producto.img1
            });
          } else {
            console.error('Producto no encontrado');
          }
        });
      } else {
        console.error('ID de producto inválido');
      }
    } else {
      console.error('Producto ID no disponible');
    }

    this.favoriteService.getFavorites().subscribe((favoritos: ClFavorito[]) => {
      this.favoritos = favoritos;
    });
    this.cartService.getCartItems().subscribe((carritoItems: ClCarrito[]) => {
      this.carritoItems = carritoItems;
    });

    this.getSession(); // Cambia la lógica para obtener la sesión aquí
  }

  async getSession() {
    const idSesion = '1'; // Cambia esto según la lógica de tu aplicación
    this.sessionService.getSession(idSesion).subscribe({
      next: async (sesion: ClSesion) => {
        console.log('Sesión obtenida:', sesion);
        if (sesion && 'idUsuario' in sesion) {
          this.userId = sesion.idUsuario; // Guarda el idUsuario en la propiedad
          this.carritoForm.patchValue({ idUsuario: this.userId }); // Asigna el idUsuario directamente en el formulario
        } else {
          this.userId = 0; // Maneja el caso donde no hay sesión
          this.carritoForm.patchValue({ idUsuario: null });
          await this.presentLoginAlert(); // Muestra la alerta si no hay sesión
        }
      },
      error: async (error) => {
        console.error('Error al obtener la sesión:', error);
        this.userId = 0; // Maneja el error asignando null
        this.carritoForm.patchValue({ idUsuario: null });
        await this.presentLoginAlert(); // Muestra la alerta si hay error al obtener la sesión
      }
    });
  }

  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Iniciar sesión',
      message: 'Debe iniciar sesión para añadir productos al carrito.',
      buttons: ['Ok'],
    });
  
    await alert.present();
  }  

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1;
    }
    this.currentImage = this.images[this.currentImageIndex];
  }

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    this.currentImage = this.images[this.currentImageIndex];
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async presentAlert2(message: string) {
    const alert = await this.alertController.create({
      header: 'Ya añadido!!',
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async onFormSubmit() {
    console.log("onFormSubmit del ComprarPage");

    if (this.favoriteForm.valid) {
      const productoId = this.favoriteForm.value.id_producto;

      const productoYaAgregado = this.favoritos.find(f => f.id_producto === productoId);

      if (productoYaAgregado) {
        await this.presentAlert2('Este producto ya está en tus favoritos.');
        return;
      }

      const nuevoId = this.favoritos.length > 0 ? Math.max(...this.favoritos.map(f => f.id)) + 1 : 1;

      const favorito: ClFavorito = {
        id: nuevoId,
        id_producto: this.favoriteForm.value.id_producto,
        nombre_producto: this.favoriteForm.value.nombre_producto,
        imagen_producto: this.favoriteForm.value.imagen_producto
      };

      console.log('Favorito a agregar:', favorito);

      const loading = await this.loadingController.create({
        message: 'Agregando a favoritos...'
      });
      await loading.present();

      this.favoriteService.addFavorite(favorito).subscribe(
        async (response) => {
          console.log('Producto añadido a favoritos:', response);
          await loading.dismiss();
          await this.presentAlert('Producto agregado a favoritos con éxito.');
          this.favoritos.push(favorito);
        },
        async (error) => {
          console.error('Error al agregar a favoritos:', error);
          await loading.dismiss();
          await this.presentAlert('No se pudo agregar el producto a favoritos. Intente nuevamente.');
        }
      );
    } else {
      await this.presentAlert('No se pudo agregar el producto a favoritos. Verifica los datos.');
    }
  }

  async onCartFormSubmit() {
    console.log("onCartFormSubmit del ComprarPage");

    if (this.carritoForm.valid) {
      const productoId = this.carritoForm.value.idProducto;

      console.log('Estado actual del carrito:', this.carritoItems);
      console.log('ID del producto a añadir:', productoId);

      const productoExistente = this.carritoItems.find(c => c.idProducto === productoId);

      if (productoExistente) {
        console.log('Producto existente encontrado:', productoExistente);
        console.log('Cantidad a añadir:', this.carritoForm.value.cantidad);

        // Actualiza la cantidad y el subtotal
        productoExistente.cantidad += this.carritoForm.value.cantidad;
        productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;

        console.log('Nueva cantidad del producto:', productoExistente.cantidad);
        console.log('Nuevo subtotal del producto:', productoExistente.subtotal);

        const loading = await this.loadingController.create({
          message: 'Actualizando producto en el carrito...'
        });
        await loading.present();

        console.log('Llamando a updateCartItem con ID:', productoExistente.id);
        console.log('Objeto a actualizar:', productoExistente);

        this.cartService.updateCartItem(productoExistente.id, productoExistente).subscribe(
          async (response) => {
            console.log('Producto actualizado en el carrito:', response);
            await loading.dismiss();
            await this.presentAlert('Producto actualizado en el carrito con éxito.');
          },
          async (error) => {
            console.error('Error al actualizar el carrito:', error);
            await loading.dismiss();
            await this.presentAlert('No se pudo actualizar el producto en el carrito. Intente nuevamente.');
          }
        );
      } else {
        const nuevoCId = this.carritoItems.length > 0 ? Math.max(...this.carritoItems.map(c => c.id)) + 1 : 1;

        const carritoItem: ClCarrito = {
          id: nuevoCId, // Generar un nuevo ID único para el carrito
          idUsuario: this.userId,
          idProducto: this.carritoForm.value.idProducto,
          nombre: this.carritoForm.value.nombre,
          precio: this.carritoForm.value.precio,
          cantidad: this.carritoForm.value.cantidad,
          img: this.carritoForm.value.img,
          subtotal: this.carritoForm.value.precio * this.carritoForm.value.cantidad,
          fechaCreacion: new Date()
        };

        console.log('Nuevo producto a añadir al carrito:', carritoItem);

        const loading = await this.loadingController.create({
          message: 'Añadiendo al carrito...'
        });
        await loading.present();

        this.cartService.addCartItem(carritoItem).subscribe(
          async (response) => {
            console.log('Producto añadido al carrito:', response);
            await loading.dismiss();
            await this.presentAlert('Producto añadido al carrito con éxito.');
            this.carritoItems.push(carritoItem);
            console.log('Estado actualizado del carrito:', this.carritoItems);
          },
          async (error) => {
            console.error('Error al añadir al carrito:', error);
            await loading.dismiss();
            await this.presentAlert('No se pudo añadir el producto al carrito. Intente nuevamente.');
          }
        );
      }
    } else {
      console.error('El formulario del carrito no es válido:', this.carritoForm.errors);
      await this.presentAlert('Verifica los datos del carrito antes de continuar.');
    }
  }

  setUserRoleLink() {
    if (this.sesion?.rol === 'admin') {
      this.userRoleLink = '/admin';
    } else if (this.sesion?.rol === 'usuario') {
      this.userRoleLink = `/cuenta/${this.sesion.idUsuario}`;
    } else {
      this.userRoleLink = '/login'; // Ruta por defecto
    }
  }
  
}
