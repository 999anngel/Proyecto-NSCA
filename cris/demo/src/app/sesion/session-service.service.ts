import { Injectable } from '@angular/core';
import { ClSesion } from './modelo/ClSesion'; // Asegúrate de que este modelo esté definido correctamente
import { Observable, throwError, of } from 'rxjs'; // Importamos 'of' para retornar un Observable vacío en caso de 404
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// URL de la API para gestionar sesiones
const apiUrl = "http://localhost:3000/sesiones"; 
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  constructor(private http: HttpClient) {}

  // Método para agregar una nueva sesión
  addSession(sesion: ClSesion): Observable<ClSesion> {
    const sesionConIdString = {
      ...sesion,
      id: sesion.id ? sesion.id.toString() : undefined, 
    };

    console.log("Res-api Enviando AddSession: ", sesionConIdString);
    
    return this.http.post<ClSesion>(apiUrl, sesionConIdString, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener todas las sesiones
  getSessions(): Observable<ClSesion[]> {
    console.log("getSessions()");
    return this.http.get<ClSesion[]>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener una sesión por ID
  getSession(id: string): Observable<ClSesion> {
    console.log("getSession ID:", id);
    return this.http.get<ClSesion>(`${apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 ) {
          console.log('No se encontró ninguna sesión, no hay sesión iniciada.');
          // Retornar un observable vacío, ya que no es un error crítico
          return of(null as unknown as ClSesion);
        } else {
          // Otros errores siguen siendo críticos
          return this.handleError(error);
        }
      })
    );
  }

  // Método para manejar errores de la API
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }

  // Método para eliminar una sesión
  deleteSession(id: number): Observable<ClSesion> {
    return this.http.delete<ClSesion>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar una sesión
  updateSession(id: number, session: ClSesion): Observable<ClSesion> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<ClSesion>(url, session, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
