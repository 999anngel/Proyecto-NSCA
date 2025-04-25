import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClAyudas } from './model/ClAyudas'; // Asegúrate de que esta ruta sea correcta

const apiUrl = 'http://localhost:3000/ayudas'; // Reemplaza con tu URL real
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AyudasService {
  constructor(private http: HttpClient) {}

  // Método para agregar una nueva ayuda
  createAyuda(ayuda: ClAyudas): Observable<ClAyudas> {
    // Convertir el ID a string
    const ayudaConIdString = {
      ...ayuda,
      id: ayuda.id ? ayuda.id.toString() : undefined // Asegúrate de que `ayuda.id` esté definido
    };

    console.log("Enviando ayuda:", ayudaConIdString);
    
    return this.http.post<ClAyudas>(apiUrl, ayudaConIdString, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para obtener todas las ayudas
  getAllAyudas(): Observable<ClAyudas[]> {
    return this.http.get<ClAyudas[]>(apiUrl, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para obtener una ayuda por ID
  getAyuda(id: string): Observable<ClAyudas> { // Cambiado a getAyuda
    return this.http.get<ClAyudas>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para actualizar una ayuda
  updateAyuda(id: string, ayuda: ClAyudas): Observable<ClAyudas> {
    return this.http.put<ClAyudas>(`${apiUrl}/${id}`, ayuda, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para eliminar una ayuda
  deleteAyuda(id: string): Observable<ClAyudas> {
    return this.http.delete<ClAyudas>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para manejar errores de la API
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}
