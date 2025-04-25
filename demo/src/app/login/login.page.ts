import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../usuario/user-service.service';
import { EmployeeServiceService } from '../empleado/employee-service.service';
import { ClUsuario } from '../usuario/modelo/ClUsuario';
import { ClEmpleado } from '../empleado/modelo/ClEmpleado';
import { SessionServiceService } from '../sesion/session-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion';
import { LoadingController, ToastController } from '@ionic/angular'; // Importamos el LoadingController y ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  sesion: ClSesion | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private employeeService: EmployeeServiceService,
    private sessionService: SessionServiceService,
    private loadingController: LoadingController,
    private toastController: ToastController // Inyectamos el ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      translucent: true, // Hace el fondo del toast semi-transparente
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado');
          },
        },
      ],
    });
    await toast.present();
  }

  async onLogin() {
    const correoControl = this.loginForm.get('correo');
    const contrasenaControl = this.loginForm.get('contrasena');

    if (correoControl && contrasenaControl) {
      const correo = correoControl.value;
      const contrasena = contrasenaControl.value;

      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();

      this.employeeService.getEmployees().subscribe(employees => {
        const empleado = employees.find((empleado: ClEmpleado) => empleado.email === correo && empleado.password === contrasena);

        if (empleado) {
          const nuevaSesion: ClSesion = {
            id: 1,
            idUsuario: empleado.id,
            rol: 'empleado'
          };

          this.sessionService.addSession(nuevaSesion).subscribe({
            next: async (res) => {
              loading.dismiss();
              await this.presentToast('Sesión iniciada');
              this.router.navigate([`/admin/${empleado.id}`]);
            },
            error: (err) => {
              loading.dismiss();
              console.error('Error al agregar sesión:', err);
            }
          });
        } else {
          this.userService.getUsers().subscribe(users => {
            const usuario = users.find((usuario: ClUsuario) => usuario.correo === correo && usuario.contrasena === contrasena);

            if (usuario) {
              const nuevaSesion: ClSesion = {
                id: 1,
                idUsuario: usuario.id,
                rol: 'usuario'
              };

              this.sessionService.addSession(nuevaSesion).subscribe({
                next: async (res) => {
                  loading.dismiss();
                  await this.presentToast('Sesión iniciada');
                  this.router.navigate([`/cuenta/${usuario.id}`]);
                },
                error: (err) => {
                  loading.dismiss();
                  console.error('Error al agregar sesión:', err);
                }
              });
            } else {
              loading.dismiss();
              alert('Correo o contraseña incorrectos');
            }
          }, error => {
            loading.dismiss();
            console.error('Error al obtener usuarios:', error);
          });
        }
      }, error => {
        loading.dismiss();
        console.error('Error al obtener empleados:', error);
      });
    } else {
      alert('Formulario no válido');
    }
  }
}
