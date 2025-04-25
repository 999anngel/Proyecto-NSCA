import { Injectable } from '@angular/core';
import { ClProducto } from './modelo/ClProducto';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';


// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/productos";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  // Injectamos HttpClient, para poder consular una página
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
  
  addProduct(producto: ClProducto): Observable<ClProducto> {
    // Convertir los IDs a string
    const productoConIdString = {
      ...producto,
      id: producto.id ? producto.id.toString() : undefined,
      // Si hay otros campos que son números y necesitan conversión, agrégales aquí
    };
  
    console.log("Res-api Enviando AddProduct: ", productoConIdString);
    
    return this.http.post<ClProducto>(apiUrl, productoConIdString, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }  

  // Obtenemos todos los Productos
  getProducts(): Observable<ClProducto[]> {
    console.log("getProducts ()");
    return this.http.get<ClProducto[]>(apiUrl)
    // .pipe(
    //   tap(heroes => console.log('fetched products')),
    //   catchError(this.handleError('getProducts', []))
    // );
  }

  //  Obtener un Producto
  getProduct(id: String): Observable<ClProducto> {
    //const url = '${apiUrl}/${id}';
    //return this.http.get<Producto>(url).pipe(
    console.log("getProduct ID:" + id);
    return this.http.get<ClProducto>(apiUrl + "/" + id)
    // .pipe(
    //   tap(_ => console.log('fetched product id=${id}')),
    //   catchError(this.handleError<ClProducto>('getProduct id=${id}'))
    // );
  }

  getProductById(productId: number): Observable<ClProducto | undefined> {
    console.log("getProductById ID:", productId);
    return this.http.get<ClProducto>(`${apiUrl}/${productId}`).pipe(
      // Aquí puedes manejar el error si el producto no existe
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return of(undefined); // Retorna undefined si hay un error
      })
    );
  }

  deleteProduct(id: number): Observable<ClProducto> {
    //const url = '${apiUrl}/${id}';
    //return this.http.delete<Producto>(url, httpOptions).pipe(
    return this.http.delete<ClProducto>(apiUrl + "/" + id, httpOptions)
      // .pipe(
      //   tap(_ => console.log('deleted product id=${id}')),
      //   catchError(this.handleError<ClProducto>('deleteProduct'))
      // );
  }

  // Actualizar el producto por medio de PUT
  updateProduct(id: number, producto: ClProducto): Observable<ClProducto> {
    return this.http.put<ClProducto>(apiUrl + "/" + id, producto, httpOptions)
      // .pipe(
      //   tap(_ => console.log('updated product id=${id}')),
      //   catchError(this.handleError<any>('updateProduct'))
      // );
  }

  updateStockAndSales(productId: number, quantity: number): Observable<ClProducto | undefined> {
    // First, get the product by its ID
    return this.getProductById(productId).pipe(
      map(product => {
        if (product) {
          // Ensure stock is defined and is a number
          if (product.stock !== null && product.stock !== undefined && product.stock >= quantity) {
            // Update stock and ventas
            product.stock -= quantity;
            product.ventas += quantity;
  
            console.log(`Updating product: ${productId}, stock: ${product.stock}, ventas: ${product.ventas}`);
  
            // Return the observable from updateProduct instead of subscribing here
            return product;  // Return updated product locally
          } else {
            console.error('Not enough stock available or invalid stock value');
            return undefined; // Not enough stock
          }
        } else {
          console.error('Product not found');
          return undefined; // Product not found
        }
      }),
      // Chain the updateProduct call after confirming valid product and stock
      switchMap((product: ClProducto | undefined) => product ? this.updateProduct(productId, product) : of(undefined)),
      catchError(error => {
        console.error('Error fetching or updating product:', error);
        return of(undefined);
      })
    );
  }

  updateMultipleProductsStockAndSales(products: { id: number, cantidad: number }[]): Observable<(ClProducto | undefined)[]> {
    const observables: Observable<ClProducto | undefined>[] = [];
  
    products.forEach(product => {
      // Por cada producto en la lista, actualiza su stock y ventas
      observables.push(this.updateStockAndSales(product.id, product.cantidad));
    });
  
    // Usamos forkJoin para ejecutar todas las actualizaciones de stock y ventas en paralelo
    return forkJoin(observables).pipe(
      catchError(error => {
        console.error('Error updating stock and sales for multiple products:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }
  
  updateProductStockAndSales(productId: number, cantidadVendida: number): Observable<any> {
    return this.http.get(`http://localhost:3000/productos/${productId}`).pipe(
      switchMap((producto: any) => {
        const nuevasVentas = producto.ventas + cantidadVendida;
        const nuevoStock = producto.stock - cantidadVendida;
  
        // Asegúrate de que no se vendan más productos de los que hay en stock
        if (nuevoStock < 0) {
          throw new Error('Stock insuficiente');
        }
  
        return this.http.put(`http://localhost:3000/productos/${productId}`, {
          ...producto,
          ventas: nuevasVentas,
          stock: nuevoStock
        });
      })
    );
  }
  
  

  private handleError(error: HttpErrorResponse) {
    // Puedes implementar un manejo de errores más elaborado aquí
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}