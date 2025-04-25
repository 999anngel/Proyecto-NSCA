import { Injectable } from '@angular/core';
import { ClVenta } from './modelo/ClVentas'; // Asegúrate de que este modelo esté definido correctamente
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Creamos Constantes que utilizaremos en el envío
const apiUrl = "http://localhost:3000/ventas"; // URL de la API para ventas
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {
  constructor(private http: HttpClient) { }

  // Método para agregar una nueva venta
  addVenta(venta: ClVenta): Observable<ClVenta> {
    const ventaConIdString = {
      ...venta,
      id: venta.id ? venta.id.toString() : undefined,
    };
    console.log("Res-api Enviando AddVenta: ", ventaConIdString);
    return this.http.post<ClVenta>(apiUrl, ventaConIdString, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las ventas
  getVentas(): Observable<ClVenta[]> {
    console.log("getVentas ()");
    return this.http.get<ClVenta[]>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una venta por ID
  getVenta(id: string): Observable<ClVenta> {
    console.log("getVenta ID:", id);
    return this.http.get<ClVenta>(`${apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una venta por ID
  deleteVenta(id: number): Observable<ClVenta> {
    return this.http.delete<ClVenta>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}
