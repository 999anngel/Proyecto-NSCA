import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importar NavController para redirigir
import { ClUsuario } from '../usuario/modelo/ClUsuario';
import { UserServiceService } from '../usuario/user-service.service';
import { MetodoServiceService } from '../metodoPago/metodo-service.service';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Component({
  selector: 'app-ver-tarjeta',
  templateUrl: './ver-tarjeta.page.html',
  styleUrls: ['./ver-tarjeta.page.scss'],
})
export class VerTarjetaPage implements OnInit {
  user: ClUsuario | null = null;
  tarjetaDetalles: any = null;
  nombreBanco: string | null = null; // Variable para almacenar el nombre del banco

  // Mapa de BIN a banco
  private binBancoMap: { [key: string]: string } = {
    '424242': 'Visa',
    '434559': 'Visa',
    '453214': 'Visa',
    '510510': 'Mastercard',
    '523456': 'Mastercard',
    '540400': 'Mastercard',
    '340000': 'American Express',
    '378282': 'American Express',
    '601100': 'Discover',
    '601112': 'Discover',
    '300000': 'Diners Club',
    '305693': 'Diners Club',
    '353011': 'JCB',
    '356800': 'JCB',
  };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController, // Inyectar NavController
    private userService: UserServiceService,
    private pagosService: MetodoServiceService,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.obtenerDetallesTarjeta();
    this.obtenerUsuario();
  }

  obtenerDetallesTarjeta() {
    const numeroTarjeta = this.route.snapshot.paramMap.get('numeroTarjeta');
    this.pagosService.getMetodos().subscribe((pagos: any[]) => {
      const pagoEncontrado = pagos.find(pago => pago.numeroTarjeta === numeroTarjeta);
      if (pagoEncontrado) {
        this.tarjetaDetalles = pagoEncontrado;
        this.obtenerNombreBanco(pagoEncontrado.numeroTarjeta);
      } else {
        console.error('No se encontró la tarjeta con el número:', numeroTarjeta);
      }
    }, (error) => {
      console.error('Error al obtener los pagos:', error);
    });
  }

  obtenerUsuario() {
    const idUsuario = this.route.snapshot.paramMap.get('id');
    if (idUsuario) {
      this.userService.getUser(idUsuario).subscribe((usuario: ClUsuario) => {
        this.user = usuario;
      }, (error) => {
        console.error('Error al obtener el usuario:', error);
      });
    } else {
      console.error('ID de usuario no disponible');
    }
  }

  obtenerNombreBanco(numeroTarjeta: string) {
    const bin = numeroTarjeta.replace(/\s/g, '').substring(0, 6);
    this.nombreBanco = this.binBancoMap[bin] || 'Banco desconocido';
  }

  // Método para confirmar la eliminación con una alerta
  async confirmarEliminacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarjeta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarTarjeta(this.tarjetaDetalles.numeroTarjeta); // Llamar al método de eliminación
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarTarjeta(numeroTarjeta: string) {
    if (!this.user) {
      console.error('ID de usuario no disponible');
      return;
    }

    this.pagosService.getMetodos().subscribe((pagos: any[]) => {
      const tarjetaEncontrada = pagos.find(pago => pago.numeroTarjeta === numeroTarjeta && pago.id === this.tarjetaDetalles.id);

      if (tarjetaEncontrada) {
        if (this.user) {
          if (this.user.metodoPago1 === numeroTarjeta) {
            this.user.metodoPago1 = '';
          } else if (this.user.metodoPago2 === numeroTarjeta) {
            this.user.metodoPago2 = '';
          } else if (this.user.metodoPago3 === numeroTarjeta) {
            this.user.metodoPago3 = '';
          }

          // Actualizar el usuario en el servicio
          this.userService.updateUser(this.user.id, this.user).subscribe(() => {
            console.log('Método de pago eliminado correctamente');
          }, (error) => {
            console.error('Error al actualizar el usuario:', error);
          });
        }

        // Eliminar la tarjeta de pagos
        this.pagosService.deleteMetodo(tarjetaEncontrada.id).subscribe(() => {
          console.log('Tarjeta eliminada correctamente');
          this.navCtrl.navigateForward(`/cuenta/${this.user?.id}`); // Redirigir a la página de cuenta
        }, (error) => {
          console.error('Error al eliminar la tarjeta:', error);
        });
      } else {
        console.error('No se encontró la tarjeta con el número:', numeroTarjeta);
      }
    }, (error) => {
      console.error('Error al obtener los pagos:', error);
    });
  }
}
