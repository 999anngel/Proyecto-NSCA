import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback-service.service'; // Asegúrate de que esta ruta sea correcta
import { ClFeedback } from '../modelo/ClFeedback'; // Asegúrate de que la ruta sea correcta
import { SessionServiceService } from '../../sesion/session-service.service'; // Servicio de sesión
import { ClSesion } from '../../sesion/modelo/ClSesion'; // Modelo de sesión

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.page.html',
  styleUrls: ['./feedback-add.page.scss'],
})
export class FeedbackAddPage implements OnInit {
  feedbackForm!: FormGroup;
  feedbackList: ClFeedback[] = [];
  sesion: ClSesion | null = null; // Manejo de la sesión
  userRoleLink: string = '/login'; // Ruta predeterminada

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private feedbackService: FeedbackService,
    private router: Router,
    private sessionService: SessionServiceService, // Servicio de sesión
  ) {}

  ngOnInit() {
    // Define el formulario con campos requeridos
    this.feedbackForm = this.formBuilder.group({
      nombreCompleto: [null, Validators.required],
      calificacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: [null, Validators.required],
    });

    // Cargar la lista de feedback
    this.feedbackService.getFeedback().subscribe((feedback: ClFeedback[]) => {
      this.feedbackList = feedback;
    }, error => {
      console.error("Error al obtener la lista de feedback", error);
    });

    // Verificar el rol del usuario al iniciar
    this.checkUserRole();
  }

  // Verificar el rol del usuario y ajustar la navegación
  checkUserRole() {
    const idSesion = '1'; // Cambiar según cómo obtienes el ID de sesión
    this.sessionService.getSession(idSesion).subscribe({
      next: (sesion: ClSesion) => {
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
        console.error('Error al obtener la sesión:', err);
        this.userRoleLink = '/login';
      }
    });
  }

  async onFormSubmit() {
    // Verifica si el formulario es válido
    if (this.feedbackForm.invalid) {
      return;
    }

    // Genera un nuevo ID secuencial
    const nuevoId = this.feedbackList.length > 0 ? Math.max(...this.feedbackList.map(f => f.id)) + 1 : 1;

    const nuevoFeedback: ClFeedback = {
      id: nuevoId,
      nombreCompleto: this.feedbackForm.value.nombreCompleto,
      calificacion: this.feedbackForm.value.calificacion,
      comentario: this.feedbackForm.value.comentario,
      fecha: new Date(),
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.feedbackService.addFeedback(nuevoFeedback)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res == null) {
            return;
          }
          this.presentToast('Feedback enviado, muchas gracias');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log("Error al agregar feedback", err);
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