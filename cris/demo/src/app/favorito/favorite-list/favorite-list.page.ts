import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClFavorito } from '../modelo/ClFavorito';

import { FavoriteServiceService } from '../favorite-service.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.page.html',
  styleUrls: ['./favorite-list.page.scss'],
})
export class FavoriteListPage implements OnInit {
  // Creamos la Variable para el Html
  favoritos: ClFavorito[] = [];

  constructor(public restApi: FavoriteServiceService,
              public loadingController: LoadingController,
              public router: Router) { }

  ngOnInit() {
    this.getFavorites();
  }

  // Método que rescatara los favoritos
  async getFavorites() {
    console.log("Entrando :getFavorites");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando Favoritos...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getFavorites() // Asume que este método devuelve los productos favoritos
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
          // Si funciona asigno el resultado al arreglo favoritos
          this.favoritos = res;
          console.log("thisFavoritos:", this.favoritos);
          loading.dismiss();
        },
        complete: () => { },
        error: (err) => {
          // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      });
  }
}
