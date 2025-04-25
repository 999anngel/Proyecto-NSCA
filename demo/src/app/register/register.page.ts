import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../usuario/user-service.service'; // Servicio para usuarios
import { LoadingController, AlertController } from '@ionic/angular'; // Importamos AlertController
import { Router } from '@angular/router';
import { ClUsuario } from '../usuario/modelo/ClUsuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  usuarios: ClUsuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private userService: UserServiceService,
    private router: Router,
    private alertController: AlertController // Inyectamos AlertController
  ) {}

  ngOnInit() {
    // Inicializa el formulario de registro con el campo apellido
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      apellido: [null, Validators.required], // Campo para el apellido
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    });
    
    // Obtiene la lista de usuarios para determinar el nuevo ID
    this.userService.getUsers().subscribe((usuarios: ClUsuario[]) => {
      this.usuarios = usuarios;
    });
  }

  async onRegister() {
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.presentAlert('Error', 'Formulario inválido o las contraseñas no coinciden.');
      return; // Manejo básico de errores
    }

    // Genera un nuevo ID
    const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;

    // Crea un nuevo usuario con el nuevo ID y el campo apellido
    const nuevoUsuario: ClUsuario = {
      id: nuevoId, // Asigna el nuevo ID
      nombre: this.registerForm.value.name,
      apellido: this.registerForm.value.apellido, // Agrega el apellido del formulario
      correo: this.registerForm.value.email,
      contrasena: this.registerForm.value.password,
      metodoPago1: '',
      metodoPago2: '',
      metodoPago3: ''
    };

    const loading = await this.loadingController.create({
      message: 'Registrando...'
    });
    await loading.present();

    this.userService.addUser(nuevoUsuario).subscribe({
      next: async (res) => {
        await loading.dismiss();
        await this.presentAlert('Éxito', 'Usuario registrado con éxito.'); // Mostrar alerta de éxito
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: async (err) => {
        await loading.dismiss();
        await this.presentAlert('Error', 'Error al registrar el usuario.'); // Mostrar alerta de error
        console.error("Error al registrar el usuario", err);
      }
    });
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}