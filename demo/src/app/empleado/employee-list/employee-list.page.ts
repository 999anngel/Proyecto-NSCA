import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ClEmpleado } from '../modelo/ClEmpleado'; // Ruta correcta del modelo
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {
  employees: ClEmpleado[] = []; // Define la propiedad 'employees'

  constructor(
    public employeeService: EmployeeServiceService,
    private alertController: AlertController // Inyecta AlertController
  ) {}

  ngOnInit() {
    this.getEmployees(); // Llama a la función para cargar los empleados
  }

  // Obtener la lista de empleados
  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: ClEmpleado[]) => {
        this.employees = data; // Asigna la lista de empleados
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  // Mostrar alerta de confirmación antes de eliminar un empleado
  async confirmDelete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este empleado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteEmployee(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Eliminar empleado por ID
  deleteEmployee(id: number): void {
    console.log('Intentando eliminar el empleado con ID:', id); // Agrega este log para verificar el ID
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        console.log('Empleado eliminado con éxito');
        this.getEmployees(); // Vuelve a obtener la lista de empleados después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el empleado', error);
      }
    );
  }
}
