import { Component, OnInit } from '@angular/core';
import { AyudasService } from '../ayudas-service';
import { ClAyudas } from '../model/ClAyudas';
import { AlertController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-ayudas-list',
  templateUrl: './ayudas-list.page.html',
  styleUrls: ['./ayudas-list.page.scss'],
})
export class AyudasListPage implements OnInit, ViewWillEnter {
  ayudas: ClAyudas[] = [];

  constructor(
    private ayudasService: AyudasService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAyudas();
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

  // Mostrar alerta de confirmación antes de eliminar
  async confirmDelete(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta ayuda?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteAyuda(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para eliminar una ayuda
  deleteAyuda(id: string): void {
    this.ayudasService.deleteAyuda(id).subscribe(
      () => {
        console.log('Ayuda eliminada con éxito');
        this.getAyudas(); // Vuelve a obtener la lista de ayudas después de eliminar
      },
      (error) => {
        console.error('Error al eliminar la ayuda', error);
      }
    );
  }
}
