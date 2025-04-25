import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AyudasService } from '../ayudas-service'; // Asegúrate de que esta ruta sea correcta
import { ClAyudas } from '../model/ClAyudas'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-ayudas-edit', // Cambiado a app-ayudas-edit
  templateUrl: './ayudas-edit.page.html', // Cambiado a ayudas-edit.page.html
  styleUrls: ['./ayudas-edit.page.scss'],
})
export class AyudasEditPage implements OnInit { // Cambiado a AyudasEditPage
  ayuda: ClAyudas = { id: '', pregunta: '', respuesta: '' }; // Asegúrate de que el tipo sea correcto

  constructor(
    private route: ActivatedRoute,
    private ayudasService: AyudasService,
    private router: Router
  ) {}

  ngOnInit() {
    const ayudaId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la ayuda de la ruta
    if (ayudaId) {
      this.loadAyuda(ayudaId); // Cargar la ayuda si hay un ID
    }
  }

  loadAyuda(id: string) {
    this.ayudasService.getAyuda(id).subscribe(
      (data: ClAyudas) => {
        this.ayuda = data; // Asignar los datos recuperados al objeto ayuda
      },
      (error) => {
        console.error('Error al cargar la ayuda:', error);
      }
    );
  }

  updateAyuda() {
    this.ayudasService.updateAyuda(this.ayuda.id, this.ayuda).subscribe(
      (updatedAyuda) => {
        console.log('Ayuda actualizada:', updatedAyuda);
        this.router.navigate(['/ayudas-list']); // Redirigir a la lista de ayudas
      },
      (error) => {
        console.error('Error al actualizar la ayuda:', error);
      }
    );
  }
}
