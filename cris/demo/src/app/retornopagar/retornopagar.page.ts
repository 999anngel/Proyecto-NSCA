import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importamos HttpClient y HttpParams
import { environment } from 'src/environments/environment'; // Asegúrate de tener configurado tu entorno

@Component({
  selector: 'app-retornopagar',
  templateUrl: './retornopagar.page.html',
  styleUrls: ['./retornopagar.page.scss'],
})
export class RetornopagarPage implements OnInit {
  status: 'success' | 'failure' | 'error' = 'failure';  // Inicializamos el estado como 'failure' para mostrar el error inicialmente
  token_ws: string | null = null;
  buy_order: string | null = null;
  authorization_code: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private http: HttpClient  // Inyectamos HttpClient para hacer la solicitud HTTP
  ) { }

  ngOnInit() {
    // Obtener el token_ws de la URL usando ActivatedRoute
    console.log('ngOnInit: Iniciando el proceso de obtención de parámetros de la URL...');
    this.route.queryParams.subscribe(params => {
      this.token_ws = params['token_ws'];  // Aquí estamos accediendo al token_ws de la URL
      console.log('ngOnInit: Parámetro token_ws recibido:', this.token_ws);

      if (this.token_ws) {
        console.log('ngOnInit: Token recibido, verificando estado...');
        // Verificamos el estado del pago con el backend
        this.verifyPaymentStatus(this.token_ws);
      } else {
        console.log('ngOnInit: No se recibió el token_ws, mostrando error.');
        this.showAlert('No se recibió el token de la transacción. Intentá nuevamente.');
        this.status = 'error';
      }
    });
  }

  // Verificamos el estado del pago consultando al backend (ruta /retornopagar)
  verifyPaymentStatus(token: string) {
    console.log('verifyPaymentStatus: Verificando el estado del pago con el token:', token);

    const apiUrl = 'http://localhost:5000/retornopagar';  // Asegúrate de que la URL sea correcta
    const params = new HttpParams().set('token_ws', token);

    this.http.get(apiUrl, { params })
      .subscribe(
        (response: any) => {
          console.log('verifyPaymentStatus: Respuesta de la API:', response);

          // Guardar la información necesaria para la captura
          if (response.status === 'success') {
            this.status = 'success';
            this.buy_order = response.data.buy_order; // Almacenar buy_order
            this.authorization_code = response.data.authorization_code; // Almacenar authorization_code
            this.showAlert('Pago exitoso');
            
            // Realizamos la captura
            this.captureTransaction();
          } else if (response.status === 'failure') {
            this.status = 'failure';
            this.showAlert('El pago falló. Por favor intenta nuevamente.');
          } else if (response.status === 'pending') {
            this.status = 'failure';  // Si es 'pending', podemos asumir que el pago no fue exitoso
            this.showAlert('El pago está pendiente. Intenta nuevamente más tarde.');
          }
        },
        (error) => {
          console.error('verifyPaymentStatus: Error al verificar el estado:', error);
          this.status = 'error';
          this.showAlert('Error al verificar el estado de la transacción.');
        }
      );
  }

  // Método para capturar la transacción
  captureTransaction() {
    if (this.token_ws && this.buy_order && this.authorization_code) {
      const apiUrl = 'https://webpay3g.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/' + this.token_ws + '/capture';
      const headers = {
        'Tbk-Api-Key-Id': '597055555540', // Tu API Key
        'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', // Tu API Secret
        'Content-Type': 'application/json',
      };

      const body = {
        buy_order: this.buy_order,
        authorization_code: this.authorization_code,
        capture_amount: 1000 // El monto que deseas capturar
      };

      this.http.put(apiUrl, body, { headers })
        .subscribe(
          (response: any) => {
            console.log('captureTransaction: Respuesta de la API de captura:', response);
            if (response.response_code === 0) {
              this.showAlert('Captura exitosa. Monto capturado: ' + response.captured_amount);
            } else {
              this.showAlert('Error al capturar el pago. Código de respuesta: ' + response.response_code);
            }
          },
          (error) => {
            console.error('captureTransaction: Error al realizar la captura:', error);
            this.showAlert('Error al capturar la transacción.');
          }
        );
    } else {
      console.error('captureTransaction: Falta información para la captura');
      this.showAlert('Falta información para realizar la captura.');
    }
  }

  // Método para mostrar alertas
  async showAlert(message: string) {
    console.log('showAlert: Mostrando alerta con el mensaje:', message);
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
