import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { ClProducto } from '../modelo/ClProducto';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  product: ClProducto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    genero: '',
    color: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    ventas:0
  };

  productForm: FormGroup;

  constructor(
    private productService: ProductServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.productForm = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      precio: [0],
      cantidad: [0],
      categoria: [''],
      genero: [''],
      color: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (data) => {
          this.product = data;
          this.productForm.patchValue(this.product);
        },
        error: (err) => {
          console.error('Error al obtener el producto:', err);
        }
      });
    }
  }

  async updateProduct() {
    this.productService.updateProduct(this.product.id, this.productForm.value).subscribe({
      next: async () => {
        await this.presentToast('Producto actualizado correctamente.');
        this.router.navigate(['/product-list']);
      },
      error: async (err) => {
        console.error('Error al actualizar el producto:', err);
        await this.presentToast('Error al actualizar el producto.');
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/product-list']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
