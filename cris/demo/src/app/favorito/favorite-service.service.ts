import { Injectable } from '@angular/core';
import { ClFavorito } from './modelo/ClFavorito';  // Cambié ClProducto por ClFavorito

// Importamos las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/favoritos";  // Cambié productos por favoritos
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {
  apiUrl: any;  // Cambié ProductServiceService por FavoriteServiceService
  // Injectamos HttpClient, para poder consultar una página
  constructor(private http: HttpClient) { }

  // Método Agregar favorito, y devuelve un observable del tipo Favorito
  // Debe ser un Observable si deseas suscribir este método en otro lado
  addFavorite(favorito: ClFavorito): Observable<ClFavorito> {
    // Convertir los IDs a string
    const favoritoConIdString = {
      ...favorito,
      id: favorito.id ? favorito.id.toString() : undefined,
      // Si hay otros campos que son números y necesitan conversión, agrégales aquí
    };
  
    console.log("Res-api Enviando AddFavorito : ", favoritoConIdString);
    
    return this.http.post<ClFavorito>(apiUrl, favoritoConIdString, httpOptions).pipe(
      tap((favorito: ClFavorito) => console.log('added favorite w/:', favorito)),
      catchError(this.handleError<ClFavorito>('addFavorite'))
    );
  }
  
  
  // Manejo de errores genérico
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error
      return of(result as T); // Devolvemos un resultado vacío
    };
  }
  

  // Obtenemos todos los Favoritos
  getFavorites(): Observable<ClFavorito[]> {  // Cambié getProducts por getFavorites y ClProducto[] por ClFavorito[]
    console.log("getFavorites ()");
    return this.http.get<ClFavorito[]>(apiUrl)  // Cambié ClProducto[] por ClFavorito[]
    // .pipe(
    //   tap(favorites => console.log('fetched favorites')),  // Cambié products por favorites
    //   catchError(this.handleError('getFavorites', []))  // Cambié getProducts por getFavorites
    // );
  }

  // Obtener un Favorito
  getFavorite(id: String): Observable<ClFavorito> {  // Cambié getProduct por getFavorite y ClProducto por ClFavorito
    console.log("getFavorite ID:" + id);  // Cambié Product por Favorite
    return this.http.get<ClFavorito>(apiUrl + "/" + id)  // Cambié ClProducto por ClFavorito
    // .pipe(
    //   tap(_ => console.log('fetched favorite id=${id}')),  // Cambié product por favorite
    //   catchError(this.handleError<ClFavorito>('getFavorite id=${id}'))  // Cambié getProduct por getFavorite
    // );
  }

  // Eliminar un Favorito
  deleteFavorite(id: number): Observable<ClFavorito> {  // Cambié deleteProduct por deleteFavorite y ClProducto por ClFavorito
    return this.http.delete<ClFavorito>(apiUrl + "/" + id, httpOptions)  // Cambié ClProducto por ClFavorito
    // .pipe(
    //   tap(_ => console.log('deleted favorite id=${id}')),  // Cambié product por favorite
    //   catchError(this.handleError<ClFavorito>('deleteFavorite'))  // Cambié deleteProduct por deleteFavorite
    // );
  }

  // Actualizar el favorito por medio de PUT
  updateFavorite(id: number, favorito: ClFavorito): Observable<ClFavorito> {  // Cambié updateProduct por updateFavorite y ClProducto por ClFavorito
    return this.http.put<ClFavorito>(apiUrl + "/" + id, favorito, httpOptions)  // Cambié ClProducto por ClFavorito y producto por favorito
    // .pipe(
    //   tap(_ => console.log('updated favorite id=${id}')),  // Cambié product por favorite
    //   catchError(this.handleError<any>('updateFavorite'))  // Cambié updateProduct por updateFavorite
    // );
  }
  eliminarFavorito(id: number) {
    return this.http.delete(`${this.apiUrl}/favoritos/${id}`);
  }
}