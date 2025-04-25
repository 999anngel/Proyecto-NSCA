import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { ClEmpleado } from '../modelo/ClEmpleado';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.page.html',
  styleUrls: ['./employee-edit.page.scss'],
})
export class EmployeeEditPage implements OnInit {
  employee: ClEmpleado = { 
    id: 0,
    nombre: '',
    cargo: '',
    salario: 0,
    departamento: '',
    genero: '',
    fechaIngreso: new Date(),
    email: '',
    telefono: '',
    imgPerfil: '',
    password: '' // Agregada la propiedad password
  };

  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, // Inyección del router para la redirección
    private toastController: ToastController
  ) {
    this.employeeForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      departamento: ['', Validators.required],
      genero: ['', Validators.required],
      fechaIngreso: [new Date().toISOString().substring(0, 10), Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      imgPerfil: [''],
      password: ['', Validators.required] // Agregada la propiedad password
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (data) => {
          this.employee = data; 
          this.employeeForm.patchValue(this.employee); 
        },
        error: (err) => {
          console.error('Error al obtener el empleado:', err);
        }
      });
    }
  }

  async updateEmployee() {
    this.employeeService.updateEmployee(this.employee.id, this.employeeForm.value).subscribe({
      next: async () => {
        await this.presentToast('Empleado actualizado correctamente.'); // Mensaje de éxito
        this.router.navigate(['/employee-list']); // Redirigir a la página de empleados
      },
      error: async (err) => {
        console.error('Error al actualizar el empleado:', err);
        await this.presentToast('Error al actualizar el empleado.'); // Mensaje de error
      }
    });
  }

  async deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe({
      next: async () => {
        await this.presentToast('Empleado eliminado correctamente.'); // Mensaje de éxito
        this.router.navigate(['/employee-list']); // Redirigir a la página de empleados
      },
      error: async (err) => {
        console.error('Error al eliminar el empleado:', err);
        await this.presentToast('Error al eliminar el empleado.'); // Mensaje de error
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/employee-list']); // Redirigir a la página de empleados
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
