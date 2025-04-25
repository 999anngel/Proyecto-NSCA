import { Injectable } from '@angular/core';
import { ClEmpleado } from './modelo/ClEmpleado';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/empleados";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  // Injectamos HttpClient, para poder consular una página producto
  constructor(private http: HttpClient) { }

  // Controla y enviará un mensaje a consola para todos los errores
  // ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿  singo de pregunta al revez
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error("handleError Harrys",error); // log to console instead
  //     return of(result as T);
  //   };
  // }

  // Método Agregar producto, y devuelve un observable del tipo Producto
  // Debe ser un Observable si deses suscribir este método en otro lado
  addEmployee(empleado: ClEmpleado): Observable<ClEmpleado> {
    // Convertir los IDs a string
    const empleadoConIdString = {
      ...empleado,
      id: empleado.id ? empleado.id.toString() : undefined,
      // Si hay otros campos que son números y necesitan conversión, agrégales aquí
    };
  
    console.log("Res-api Enviando AddEmpleado : ", empleadoConIdString);
    
    return this.http.post<ClEmpleado>(apiUrl, empleadoConIdString, httpOptions).pipe(
      tap((empleado: ClEmpleado) => console.log('added employee w/:', empleado)),
      catchError(this.handleError<ClEmpleado>('addEmployee'))
    );
  }
  


  // Obtenemos todos los Productos
  getEmployees(): Observable<ClEmpleado[]> {
    console.log("getEmployees ()");
    return this.http.get<ClEmpleado[]>(apiUrl)
    // .pipe(
    //   tap(heroes => console.log('fetched products')),
    //   catchError(this.handleError('getProducts', []))
    // );
  }

  //  Obtener un Producto
  getEmployee(id: String): Observable<ClEmpleado> {
    //const url = '${apiUrl}/${id}';
    //return this.http.get<Producto>(url).pipe(
    console.log("getEmployee ID:" + id);
    return this.http.get<ClEmpleado>(apiUrl + "/" + id)
    // .pipe(
    //   tap(_ => console.log('fetched product id=${id}')),
    //   catchError(this.handleError<ClProducto>('getProduct id=${id}'))
    // );
  }

  deleteEmployee(id: number): Observable<ClEmpleado> {
    //const url = '${apiUrl}/${id}';
    //return this.http.delete<Producto>(url, httpOptions).pipe(
    return this.http.delete<ClEmpleado>(apiUrl + "/" + id, httpOptions)
      // .pipe(
      //   tap(_ => console.log('deleted product id=${id}')),
      //   catchError(this.handleError<ClProducto>('deleteProduct'))
      // );
  }

  // Actualizar el producto por medio de PUT
  updateEmployee(id: number, empleado: ClEmpleado): Observable<ClEmpleado> {
    return this.http.put<ClEmpleado>(apiUrl + "/" + id, empleado, httpOptions)
      // .pipe(
      //   tap(_ => console.log('updated product id=${id}')),
      //   catchError(this.handleError<any>('updateProduct'))
      // );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // Puedes implementar un manejo de errores más elaborado aquí
      console.error(`Error en ${operation}:`, error.message); // Log a la consola
      return of(result as T); // Devuelve un resultado vacío en caso de error
    };
  }
  
}