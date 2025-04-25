import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClProducto } from '../modelo/ClProducto';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  productForm!: FormGroup;
  ClProductos: ClProducto[] = []; // Asegúrate de que esta variable esté correctamente inicializada
  producto: ClProducto;
  productos: ClProducto[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router,
  ) {
    // Inicializa el producto en el constructor
    const nuevoId = this.ClProductos.length > 0 ? Math.max(...this.ClProductos.map(p => p.id)) + 1 : 1;

    this.producto = {
      id: nuevoId,
      nombre: '',
      descripcion: '',
      precio: null,
      stock: null,
      categoria: '',
      genero: '',
      color: '',
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      ventas: 0,
    };
  }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.productForm = this.formBuilder.group({
      prod_name: [null, Validators.required],
      prod_desc: [null, Validators.required],
      prod_price: [null, Validators.required],
      prod_stock: [null, Validators.required],
      prod_categoria: [null, Validators.required],
      prod_genero: [null, Validators.required],
      prod_color: [null, Validators.required],
      prod_img1: [null, Validators.required],
      prod_img2: [null, Validators.required],
      prod_img3: [null, Validators.required],
      prod_img4: [null, Validators.required],
      ventas: [null],
    });

    this.restApi.getProducts().subscribe((productos: ClProducto[]) => {
      this.productos = productos;
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Product ADD");

    const nuevoId = this.productos.length > 0 ? Math.max(...this.productos.map(u => u.id)) + 1 : 1;


    const nuevoProducto: ClProducto = {
      id: nuevoId, // Asigna el nuevo ID
      nombre : this.productForm.value.prod_name,
      descripcion : this.productForm.value.prod_desc,
      precio : this.productForm.value.prod_price,
      stock : this.productForm.value.prod_stock,
      categoria : this.productForm.value.prod_categoria,
      genero: this.productForm.value.prod_genero,
      color:  this.productForm.value.prod_color,
      img1: this.productForm.value.prod_img1,
      img2: this.productForm.value.prod_img2,
      img3: this.productForm.value.prod_img3,
      img4: this.productForm.value.prod_img4,
      ventas: 0,
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addProduct(nuevoProducto)
      .subscribe({
        next: (res) => {
          console.log("Next addProduct Page", res);
          loading.dismiss();
          if (res == null) {
            console.log("No se agregó el producto, respuesta nula");
            return;
          }
          console.log("Producto agregado con éxito, redirigiendo...");
          this.router.navigate(['/product-list']);
        },
        error: (err) => {
          console.log("Error al agregar producto", err);
          loading.dismiss();
        }
      });

    console.log("Fin de la función onFormSubmit");
  }
}
