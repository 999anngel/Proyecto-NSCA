import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../usuario/user-service.service';
import { ClUsuario } from '../usuario/modelo/ClUsuario';
import { EmployeeServiceService } from '../empleado/employee-service.service'; // Import Employee service
import { ClEmpleado } from '../empleado/modelo/ClEmpleado'; // Import Employee model
import { SessionServiceService } from '../sesion/session-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion';

@Component({
  selector: 'app-cuenta-admin',
  templateUrl: './cuenta-admin.page.html',
  styleUrls: ['./cuenta-admin.page.scss'],
})
export class CuentaAdminPage implements OnInit {
  usuarioId: number | null = null;
  usuario: ClUsuario | null = null;
  empleado: ClEmpleado | null = null; // Add employee object
  sesion: ClSesion | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,
    private employeeService: EmployeeServiceService, // Inject Employee service
    private sessionService: SessionServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idParam = params['id'];

      if (idParam) {
        this.usuarioId = +idParam; // Convert to number
        this.loadUserOrEmployee(); // Load either user or employee
      } else {
        console.error('Usuario/Empleado ID no disponible');
      }
    });
  }

  loadUserOrEmployee() {
    // Check the session to determine if it's a user or an employee
    this.sessionService.getSession('1').subscribe(sesion => {
      this.sesion = sesion;
      if (sesion.rol === 'usuario') {
        this.loadUser();
      } else if (sesion.rol === 'empleado') {
        this.loadEmployee();
      } else {
        console.error('Rol no reconocido');
      }
    });
  }

  loadUser() {
    if (this.usuarioId) {
      this.userService.getUserById(this.usuarioId).subscribe(user => {
        if (user) {
          this.usuario = user;
          console.log('Usuario:', this.usuario);
        } else {
          console.error('Usuario no encontrado');
        }
      });
    } else {
      console.error('ID de usuario inválido');
    }
  }

  loadEmployee() {
    if (this.usuarioId) {
      this.employeeService.getEmployee(this.usuarioId.toString()).subscribe(employee => {
        if (employee) {
          this.empleado = employee;
          console.log('Empleado:', this.empleado);
        } else {
          console.error('Empleado no encontrado');
        }
      });
    } else {
      console.error('ID de empleado inválido');
    }
  }

  // Método para eliminar la sesión
  deleteSession(sessionId: number) {
    this.sessionService.deleteSession(sessionId).subscribe({
      next: () => {
        console.log('Sesión eliminada con éxito');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al eliminar la sesión:', err);
      }
    });
  }
}
