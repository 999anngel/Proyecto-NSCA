import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClPago } from '../modelo/ClPago';
import { LoadingController, AlertController } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute para obtener el ID de la ruta
import { MetodoServiceService } from '../metodo-service.service'; 
import { UserServiceService } from '../../usuario/user-service.service'; // Servicio para usuarios
import { ClUsuario } from '../../usuario/modelo/ClUsuario'; // Modelo de usuario

@Component({
  selector: 'app-metodo-add',
  templateUrl: './metodo-add.page.html',
  styleUrls: ['./metodo-add.page.scss'],
})
export class MetodoAddPage implements OnInit {
  metodoForm!: FormGroup;
  pagos: ClPago[] = [];
  userId!: number; // ID del usuario
  usuario!: ClUsuario; // Objeto del usuario
  idUsuario: number | null = null; // Agrega esta línea


  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private restApi: MetodoServiceService,
    private userService: UserServiceService, // Servicio de usuario añadido
    private router: Router,
    private route: ActivatedRoute // Para obtener el parámetro de la ruta
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.userId = +this.route.snapshot.paramMap.get('id')!; // Convierte el ID a número
    this.loadUser(); // Cargar los datos del usuario

    // Especifica que todos los campos son obligatorios
    this.metodoForm = this.formBuilder.group({
      numeroTarjeta: [null, [Validators.required, Validators.pattern('^\\d{4}(?: \\d{4}){3}$')]], // Validación con espacios
      fechaVencimiento: [null, [Validators.required, this.validateExpiryDate.bind(this)]], 
      cvv: [null, [Validators.required, Validators.pattern('[0-9]{3}')]],
      nombreTitular: [null, Validators.required],
      numeroDocumento: [null, [Validators.required, Validators.pattern('^\\d{1,2}\\.\\d{3}\\.\\d{3}[-][0-9kK]$')]], 
      email: [null, [Validators.required, Validators.email]]
    });

    // Obtiene la lista de métodos de pago para determinar el nuevo ID
    this.restApi.getMetodos().subscribe((pagos: ClPago[]) => {
      this.pagos = pagos;
    });

    this.route.params.subscribe(params => {
      this.idUsuario = +params['id']; // Usa el '+' para convertir a número
    });
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe(
      (user: ClUsuario) => {
        this.usuario = user;
      },
      (error) => {
        console.error("Error al cargar el usuario:", error);
      }
    );
  }

  // Función de formato para la fecha de vencimiento
  formatExpiryDate(event: any) {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 4) {
      input = input.slice(0, 4); 
    }
    let formatted = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    event.target.value = formatted;
    this.metodoForm.patchValue({ fechaVencimiento: formatted });
  }

  // Validación personalizada para fecha de vencimiento
  validateExpiryDate(control: any) {
    const currentYear = new Date().getFullYear() % 100; 
    const currentMonth = new Date().getMonth() + 1;

    const value = control.value;
    
    if (!value || value.length !== 5) {
      return { invalidExpiryDate: true };
    }

    const [enteredMonth, enteredYear] = value.split('/').map(Number);

    if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
      return { invalidExpiryDate: true };
    }

    if (enteredMonth < 1 || enteredMonth > 12) {
      return { invalidExpiryDate: true };
    }

    return null;
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Metodo ADD");

    // Genera un nuevo ID para el método de pago
    const nuevoId = this.pagos.length > 0 ? Math.max(...this.pagos.map(p => p.id)) + 1 : 1;

    // Crea un nuevo método de pago con el nuevo ID
    const nuevoPago: ClPago = {
      id: nuevoId, 
      numeroTarjeta: this.metodoForm.value.numeroTarjeta, 
      fechaVencimiento: this.metodoForm.value.fechaVencimiento,
      cvv: this.metodoForm.value.cvv,
      nombreTitular: this.metodoForm.value.nombreTitular,
      numeroDocumento: this.metodoForm.value.numeroDocumento,
      email: this.metodoForm.value.email
    };

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addMetodo(nuevoPago).subscribe({
      next: async (res: ClPago) => {  
        console.log("Método de pago agregado con éxito", res);

        // Añadir método de pago al usuario en el campo disponible
        if (!this.usuario.metodoPago1) {
          this.usuario.metodoPago1 = nuevoPago.numeroTarjeta;
        } else if (!this.usuario.metodoPago2) {
          this.usuario.metodoPago2 = nuevoPago.numeroTarjeta;
        } else if (!this.usuario.metodoPago3) {
          this.usuario.metodoPago3 = nuevoPago.numeroTarjeta;
        } else {
          await loading.dismiss();
          await this.showErrorAlert('Ya tienes tres métodos de pago guardados.');
          return;
        }

        // Actualiza el usuario con el nuevo método de pago
        this.userService.updateUser(this.usuario.id, this.usuario).subscribe({
          next: async () => {
            await loading.dismiss();
            this.router.navigate(['/cuenta', this.idUsuario]);
          },
          error: async (err) => {
            console.log("Error al actualizar el usuario", err);
            await loading.dismiss();
            this.showErrorAlert('Error al actualizar el usuario.');
          }
        });
      },
      error: async (err: any) => {  
        console.log("Error al agregar método de pago", err);
        await loading.dismiss();
        this.showErrorAlert();  
      }
    });

    console.log("Fin de la función onFormSubmit");
  }

  async showErrorAlert(message: string = 'No se pudo agregar el método de pago. Intenta de nuevo más tarde.') {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '').slice(0, 16); 
    let formatted = input.replace(/(\d{4})/g, '$1 ').trim(); 
    if (formatted.length > 19) { 
      formatted = formatted.slice(0, 19);
    }
    event.target.value = formatted;
    this.metodoForm.patchValue({ numeroTarjeta: formatted.trim() });
  }

  formatDocumento(event: any) {
    let input = event.target.value.replace(/\D/g, '').slice(0, 9); 
    let formatted = input.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, '$1.$2.$3-$4');
    event.target.value = formatted;
    this.metodoForm.patchValue({ numeroDocumento: formatted });
  }

  formatCvv(event: any) {
    let input = event.target.value.replace(/\D/g, '').slice(0, 3); 
    event.target.value = input;
    this.metodoForm.patchValue({ cvv: input });
  }
}
