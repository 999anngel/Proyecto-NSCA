import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ProductServiceService } from '../producto/product-service.service'; // Asegúrate de importar el servicio
import { ClProducto } from '../producto/modelo/ClProducto'; // Asegúrate de importar el modelo
import { ClSesion } from '../sesion/modelo/ClSesion'; // Asegúrate de importar el modelo
import { SessionServiceService } from '../sesion/session-service.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  
  images: string[] = [
    'assets/img/portada.png',
    'assets/img/portada1.png',
    'assets/img/portada2.png',
  ];

  currentImageIndex: number = 0;
  currentImage: string = this.images[this.currentImageIndex];
  imageChangeInterval: any;

  productosDestacados: ClProducto[] = [];
  productos: ClProducto[] = [];
  sesion: ClSesion | null = null;

  userRoleLink: string = '/login';

  constructor(
    private restApi: ProductServiceService,
    private sessionService: SessionServiceService, 
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.startImageChange();
    this.getProducts();
    this.loadProductos();
  }

  ionViewWillEnter() {
    this.checkUserRole(); 
  }

  ngOnDestroy() {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Cargando productos...',
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

  startImageChange() {
    this.imageChangeInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex < this.images.length - 1) ? this.currentImageIndex + 1 : 0;
    this.changeImage();
  }

  changeImage() {
    this.currentImage = this.images[this.currentImageIndex];
  }

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

  ionViewDidEnter() {
    const videoElements = document.querySelectorAll('video');  // Select all video elements
    videoElements.forEach(video => {
      video.muted = true;  // Ensure the video is muted
      video.play().catch((err) => {
        console.error('Error starting video playback:', err);
      });
    });
  }
  
  loadProductos(): void {
    this.restApi.getProducts().subscribe((data: ClProducto[]) => {
      // Ordenar los productos por ventas de mayor a menor
      this.productosDestacados = data.sort((a, b) => b.ventas - a.ventas);
    });
  }
}
