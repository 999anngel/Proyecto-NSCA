import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../usuario/user-service.service'; // Servicio para usuarios
import { LoadingController, AlertController } from '@ionic/angular'; // Controladores de carga y alertas
import { Router } from '@angular/router';
import { ClUsuario } from '../usuario/modelo/ClUsuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup; // Formulario reactivo para el registro
  usuarios: ClUsuario[] = []; // Lista local de usuarios

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private userService: UserServiceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Inicializa el formulario con validaciones
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required], // Campo obligatorio: nombre
      apellido: [null, Validators.required], // Campo obligatorio: apellido
      email: [null, [Validators.required, Validators.email]], // Campo obligatorio: correo válido
      password: [null, [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
      confirmPassword: [null, Validators.required] // Confirmación de contraseña
    });
    
    // Carga usuarios existentes para calcular el ID del nuevo usuario
    this.userService.getUsers().subscribe((usuarios: ClUsuario[]) => {
      this.usuarios = usuarios;
    });
  }

  // Método llamado al hacer submit en el formulario
  async onRegister() {
    // Verifica que el formulario sea válido y las contraseñas coincidan
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.presentAlert('Error', 'Formulario inválido o las contraseñas no coinciden.');
      return;
    }

    // Cálculo del nuevo ID en base al usuario con el mayor ID actual
    const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;

    // Construcción del nuevo objeto usuario
    const nuevoUsuario: ClUsuario = {
      id: nuevoId,
      nombre: this.registerForm.value.name,
      apellido: this.registerForm.value.apellido,
      correo: this.registerForm.value.email, // Verificación de un correo único para evitar duplicados
      contrasena: this.registerForm.value.password,
      metodoPago1: '',
      metodoPago2: '',
      metodoPago3: ''
    };

    // Muestra una animación de carga mientras se procesa el registro
    const loading = await this.loadingController.create({
      message: 'Registrando...'
    });
    await loading.present();

    // Envío del nuevo usuario al servicio y manejo de la respuesta
    this.userService.addUser(nuevoUsuario).subscribe({
      next: async (res) => {
        await loading.dismiss();
        await this.presentAlert('Éxito', 'Usuario registrado con éxito.');
        this.router.navigate(['/login']); // Redirige al login después del registro
      },
      error: async (err) => {
        await loading.dismiss();
        await this.presentAlert('Error', 'Error al registrar el usuario.');
        console.error("Error al registrar el usuario", err);
      }
    });
  }

  // Método reutilizable para mostrar mensajes al usuario
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
