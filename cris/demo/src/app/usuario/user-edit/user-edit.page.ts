import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { ClUsuario } from '../modelo/ClUsuario';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  usuario: ClUsuario = { id: 0, nombre: '', apellido: '', correo: '', contrasena: '' ,metodoPago1:'',metodoPago2:'',metodoPago3:''};

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router // Inyectar el Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); // Obtener el ID del usuario de la ruta
    if (userId) {
      this.loadUser(userId); // Cargar el usuario si hay un ID
    }
  }

  loadUser(id: string) {
    // Asegúrate de que el id sea un string, ya que se pasa desde la URL
    this.userService.getUser(id).subscribe(
      (data: ClUsuario) => {
        this.usuario = data; // Asignar los datos recuperados al objeto usuario
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.usuario.id, this.usuario).subscribe(
      (updatedUser) => {
        console.log('Usuario actualizado:', updatedUser);
        this.router.navigate(['/user-list']); // Redirigir a la lista de usuarios
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
