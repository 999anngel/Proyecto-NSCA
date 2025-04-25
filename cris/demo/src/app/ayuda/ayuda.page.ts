import { Component, OnInit } from '@angular/core';
import { ClSesion } from '../sesion/modelo/ClSesion'; // Importar el modelo de sesión
import { SessionServiceService } from '../sesion/session-service.service'; // Importar el servicio de sesión

import { AyudasService } from '../ayudas/ayudas-service';
import { ClAyudas } from '../ayudas/model/ClAyudas';
import { AlertController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  sesion: ClSesion | null = null;
  userRoleLink: string = '/login'; // Enlace predeterminado
  ayudas: ClAyudas[] = [];

  constructor(
    private ayudasService: AyudasService,
    private sessionService: SessionServiceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAyudas();
    this.checkUserRole(); // Verificar el rol del usuario al iniciar
  }

  // Called whenever the page is about to enter and become active
  ionViewWillEnter() {
    this.getAyudas(); // Refresh the ayuda list
  }

  // Obtener la lista de ayudas
  getAyudas(): void {
    this.ayudasService.getAllAyudas().subscribe(
      (data) => {
        this.ayudas = data;
      },
      (error) => {
        console.error('Error al obtener las ayudas', error);
      }
    );
  }

  // Método para verificar el rol del usuario
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
}
