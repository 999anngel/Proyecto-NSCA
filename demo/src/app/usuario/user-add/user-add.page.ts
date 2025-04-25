import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClUsuario } from '../modelo/ClUsuario';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service'; // Servicio para usuarios

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {
  usuarioForm!: FormGroup;
  usuarios: ClUsuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: UserServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Especifica que todos los campos son obligatorios
    this.usuarioForm = this.formBuilder.group({
      user_nombre: [null, Validators.required],
      user_apellido: [null, Validators.required],
      user_correo: [null, [Validators.required, Validators.email]],
      user_contrasena: [null, [Validators.required, Validators.minLength(6)]],
    });

    // Obtiene la lista de usuarios para determinar el nuevo ID
    this.restApi.getUsers().subscribe((usuarios: ClUsuario[]) => {
      this.usuarios = usuarios;
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del User ADD");

    // Genera un nuevo ID
    const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;

    // Crea un nuevo usuario con el nuevo ID
    const nuevoUsuario: ClUsuario = {
      id: nuevoId, // Asigna el nuevo ID
      nombre: this.usuarioForm.value.user_nombre,
      apellido: this.usuarioForm.value.user_apellido,
      correo: this.usuarioForm.value.user_correo,
      contrasena: this.usuarioForm.value.user_contrasena,
      metodoPago1:'',
      metodoPago2:'',
      metodoPago3:''
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addUser(nuevoUsuario)
      .subscribe({
        next: (res) => {
          console.log("Next AddUser Page", res);
          loading.dismiss();
          if (res == null) {
            console.log("No se agregó el usuario, respuesta nula");
            return;
          }
          console.log("Usuario agregado con éxito, redirigiendo...");
          this.router.navigate(['/user-list']);
        },
        error: (err) => {
          console.log("Error al agregar usuario", err);
          loading.dismiss();
        }
      });

    console.log("Fin de la función onFormSubmit");
  }
}
