import { Injectable } from '@angular/core';
import { ClUsuario } from './modelo/ClUsuario'; // Asegúrate de que este modelo esté definido correctamente
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'; // Importar switchMap aquí
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Creamos Constantes que utilizaremos en el envío
const apiUrl = "http://localhost:3000/usuarios"; // URL de la API
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo usuario
  addUser(usuario: ClUsuario): Observable<ClUsuario> {
    const usuarioConIdString = {
      ...usuario,
      id: usuario.id ? usuario.id.toString() : undefined,
    };
    console.log("Res-api Enviando AddUsuario: ", usuarioConIdString);
    return this.http.post<ClUsuario>(apiUrl, usuarioConIdString, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<ClUsuario[]> {
    console.log("getUsers ()");
    return this.http.get<ClUsuario[]>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUser(id: string): Observable<ClUsuario> {
    console.log("getUser ID:", id);
    return this.http.get<ClUsuario>(`${apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<ClUsuario> {
    return this.http.get<ClUsuario>(`${apiUrl}/${id}`);
  }

  deleteUser(id: number): Observable<ClUsuario> {
    return this.http.delete<ClUsuario>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, usuario: ClUsuario): Observable<ClUsuario> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<ClUsuario>(url, usuario, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Nuevo método para eliminar un método de pago de un usuario
  deletePaymentMethod(userId: number, numeroTarjeta: string): Observable<ClUsuario> {
    return this.getUserById(userId).pipe(
      catchError(this.handleError),
      switchMap((usuario: ClUsuario) => {
        // Verificar cuál método coincide con el número de tarjeta
        if (usuario.metodoPago1 === numeroTarjeta) {
          usuario.metodoPago1 = '';
        } else if (usuario.metodoPago2 === numeroTarjeta) {
          usuario.metodoPago2 = '';
        } else if (usuario.metodoPago3 === numeroTarjeta) {
          usuario.metodoPago3 = '';
        } else {
          return throwError('No se encontró un método de pago coincidente.');
        }
        // Actualizar el usuario con los cambios
        return this.updateUser(userId, usuario);
      })
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}
