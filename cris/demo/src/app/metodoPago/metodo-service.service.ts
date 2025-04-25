import { Injectable } from '@angular/core';
import { ClPago } from './modelo/ClPago'; // Asegúrate de que este modelo esté definido correctamente
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Creamos constantes que utilizaremos en el envío
const apiUrl = "http://localhost:3000/pagos"; // URL de la API para métodos de pago
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class MetodoServiceService {
  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo método de pago
  addMetodo(pago: ClPago): Observable<ClPago> {
    const pagoConIdString = {
      ...pago,
      id: pago.id ? pago.id.toString() : undefined,
      // Si tienes otros campos que son números y quieres convertirlos, agrégales aquí
    };
  
    console.log("Res-api Enviando AddMetodo: ", pagoConIdString);
    
    return this.http.post<ClPago>(apiUrl, pagoConIdString, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para obtener todos los métodos de pago
  getMetodos(): Observable<ClPago[]> {
    console.log("getMetodos ()");
    return this.http.get<ClPago[]>(apiUrl).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para obtener un método de pago por ID
  getMetodo(id: string): Observable<ClPago> {
    console.log("getMetodo ID:", id); // Log para verificar el ID
    return this.http.get<ClPago>(`${apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para eliminar un método de pago
  deleteMetodo(id: number): Observable<ClPago> {
    return this.http.delete<ClPago>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para actualizar un método de pago
  updateMetodo(id: number, pago: ClPago): Observable<ClPago> {
    const url = `${apiUrl}/${id}`; // Ajusta la URL según sea necesario
    return this.http.put<ClPago>(url, pago, httpOptions).pipe( // Agregar httpOptions aquí
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para manejar errores de la API
  private handleError(error: HttpErrorResponse) {
    // Puedes implementar un manejo de errores más elaborado aquí
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}
