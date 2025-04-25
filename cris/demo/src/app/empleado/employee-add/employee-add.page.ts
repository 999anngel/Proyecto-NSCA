import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClEmpleado } from '../modelo/ClEmpleado';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.page.html',
  styleUrls: ['./employee-add.page.scss'],
})
export class EmployeeAddPage implements OnInit {
  employeeForm!: FormGroup;
  ClEmpleados: ClEmpleado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: EmployeeServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('Entrando a EmployeeAddPage');

    // Especificamos que todos los campos son obligatorios
    this.employeeForm = this.formBuilder.group({
      emp_name: [null, Validators.required],
      emp_position: [null, Validators.required],
      emp_salary: [null, Validators.required],
      emp_department: [null, Validators.required],
      emp_gender: [null, Validators.required],
      emp_hireDate: [null, Validators.required],
      emp_email: [null, [Validators.required, Validators.email]],
      emp_phone: [null],
      emp_profileImg: [null],
      emp_password: [null, Validators.required], // Agrega el campo de contraseña
    });

    // Obtén la lista de empleados para determinar el nuevo ID
    this.restApi.getEmployees().subscribe((empleados: ClEmpleado[]) => {
      this.ClEmpleados = empleados;
    });
  }

  async onFormSubmit() {
    console.log('onFormSubmit del Employee ADD');

    // Genera un nuevo ID basado en los empleados existentes
    const nuevoId = this.ClEmpleados.length > 0 ? Math.max(...this.ClEmpleados.map(e => e.id)) + 1 : 1;

    // Asigna los valores del formulario al nuevo objeto empleado
    const nuevoEmpleado: ClEmpleado = {
      id: nuevoId, // Asigna el nuevo ID
      nombre: this.employeeForm.value.emp_name,
      cargo: this.employeeForm.value.emp_position,
      salario: this.employeeForm.value.emp_salary,
      departamento: this.employeeForm.value.emp_department,
      genero: this.employeeForm.value.emp_gender,
      fechaIngreso: this.employeeForm.value.emp_hireDate,
      email: this.employeeForm.value.emp_email,
      telefono: this.employeeForm.value.emp_phone,
      imgPerfil: this.employeeForm.value.emp_profileImg,
      password: this.employeeForm.value.emp_password, // Asigna la contraseña
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.restApi.addEmployee(nuevoEmpleado).subscribe({
      next: (res) => {
        console.log('Empleado agregado con éxito', res);
        loading.dismiss();
        if (res == null) {
          console.log('No se agregó el empleado, respuesta nula');
          return;
        }
        this.router.navigate(['/employee-list']);
      },
      error: (err) => {
        console.log('Error al agregar empleado', err);
        loading.dismiss();
      },
    });

    console.log('Fin de la función onFormSubmit');
  }
}
