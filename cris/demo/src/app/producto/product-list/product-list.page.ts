import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClProducto } from '../modelo/ClProducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit, ViewWillEnter {
  productos: ClProducto[] = [];

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  // Called whenever the page is about to enter and become active
  ionViewWillEnter() {
    this.getProducts(); // Refresh the product list
  }

  async getProducts() {
    console.log("Entrando :getProducts");
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    await this.restApi.getProducts().subscribe({
      next: (res) => {
        console.log("Res:", res);
        this.productos = res;
        loading.dismiss();
      },
      error: (err) => {
        console.log("Err:", err);
        loading.dismiss();
      }
    });
  }

  async confirmDelete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteProduct(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProduct(id: number): void {
    this.restApi.deleteProduct(id).subscribe(
      () => {
        console.log('Producto eliminado con éxito');
        this.getProducts(); // Refresh the product list after deletion
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
}
