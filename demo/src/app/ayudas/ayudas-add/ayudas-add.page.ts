import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AyudasService } from '../ayudas-service'; // Asegúrate de que esta ruta sea correcta
import { ClAyudas } from '../model/ClAyudas'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-ayudas-add',
  templateUrl: './ayudas-add.page.html',
  styleUrls: ['./ayudas-add.page.scss'],
})
export class AyudasAddPage implements OnInit {
  ayudaForm!: FormGroup;
  ayudas: ClAyudas[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private ayudasService: AyudasService,
    private router: Router,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    // Define el formulario con campos requeridos
    this.ayudaForm = this.formBuilder.group({
      pregunta: [null, Validators.required],
      respuesta: [null, Validators.required],
    });

    // Cargar la lista de ayudas para obtener el nuevo ID
    this.ayudasService.getAllAyudas().subscribe((ayudas: ClAyudas[]) => {
      this.ayudas = ayudas;
    }, error => {
      console.error("Error al obtener la lista de ayudas", error);
    });
  }

  async onFormSubmit() {
    // Verifica si el formulario es válido
    if (this.ayudaForm.invalid) {
      return;
    }

    // Genera un nuevo ID secuencial como string
    const nuevoId = this.ayudas.length > 0 ? (parseInt(this.ayudas[this.ayudas.length - 1].id) + 1).toString() : "1";

    const nuevaAyuda: ClAyudas = {
      id: nuevoId,
      pregunta: this.ayudaForm.value.pregunta,
      respuesta: this.ayudaForm.value.respuesta,
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.ayudasService.createAyuda(nuevaAyuda)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res == null) {
            return;
          }
          this.presentToast('Ayuda agregada con éxito');
          this.router.navigate(['/ayudas']);
        },
        error: (err) => {
          console.log("Error al agregar ayuda", err);
          loading.dismiss();
        }
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast'
    });
    toast.present();
  }
}
