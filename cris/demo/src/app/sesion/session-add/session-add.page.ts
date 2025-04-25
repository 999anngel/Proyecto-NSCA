import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClSesion } from '../modelo/ClSesion'; // Asegúrate de que este modelo esté definido correctamente
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionServiceService } from '../session-service.service'; // Servicio para sesiones

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.page.html',
  styleUrls: ['./session-add.page.scss'],
})
export class SessionAddPage implements OnInit {
  sesionForm!: FormGroup;
  sesiones: ClSesion[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: SessionServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Especifica que todos los campos son obligatorios
    this.sesionForm = this.formBuilder.group({
      idUsuario: [null, Validators.required],
      rol: [null, Validators.required],
      // Agrega otros campos que necesites según ClSesion
    });

    // Obtiene la lista de sesiones para determinar el nuevo ID
    this.restApi.getSessions().subscribe((sesiones: ClSesion[]) => {
      this.sesiones = sesiones;
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Session ADD");

    // Genera un nuevo ID

    // Crea una nueva sesión con el nuevo ID
    const nuevaSesion: ClSesion = {
      id: this.sesionForm.value.idUsuario, // Asigna el nuevo ID
      idUsuario: this.sesionForm.value.idUsuario,
      rol: this.sesionForm.value.rol,
      // Agrega otros campos según sea necesario
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addSession(nuevaSesion)
      .subscribe({
        next: (res) => {
          console.log("Next AddSession Page", res);
          loading.dismiss();
          if (res == null) {
            console.log("No se agregó la sesión, respuesta nula");
            return;
          }
          console.log("Sesión agregada con éxito, redirigiendo...");
          this.router.navigate(['/session-list']); // Asegúrate de tener una ruta adecuada
        },
        error: (err) => {
          console.log("Error al agregar sesión", err);
          loading.dismiss();
        }
      });

    console.log("Fin de la función onFormSubmit");
  }
}
