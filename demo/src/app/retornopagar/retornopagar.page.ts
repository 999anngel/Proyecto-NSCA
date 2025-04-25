import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-retornopagar',
  templateUrl: './retornopagar.page.html',
  styleUrls: ['./retornopagar.page.scss'],
})
export class RetornopagarPage implements OnInit {
  status: 'success' | 'failure' | 'pending' | 'error' = 'pending';  // Inicializamos el estado como pendiente
  token_ws: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Obtener el token_ws de la URL usando ActivatedRoute
    this.route.queryParams.subscribe(params => {
      this.token_ws = params['token_ws'];  // Aquí estamos accediendo al token_ws de la URL

      if (this.token_ws) {
        // Solo se puede reaccionar al estado de la transacción en función de lo que se recibe
        // Aquí debes decidir cómo se maneja la lógica dependiendo de si hay parámetros adicionales (e.g., estado)
        
        // Como no estamos verificando el estado del pago con el backend, podemos asumir que
        // el estado de la transacción es "pendiente" o asumir que el pago ha sido procesado con éxito
        // y simplemente mostrar el resultado directamente.
        
        this.status = 'success';  // Asumimos que el pago fue exitoso (se podría modificar si es necesario)
      } else {
        this.showAlert('No se recibió el token de la transacción. Intentá nuevamente.');
        this.status = 'error';
      }
    });
  }

  // Mostrar una alerta
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}