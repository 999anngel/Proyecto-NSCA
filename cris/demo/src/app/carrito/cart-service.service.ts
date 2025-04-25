import { Injectable } from '@angular/core';
import { ClCarrito } from './modelo/ClCarrito'; 
import { Observable, throwError, of, forkJoin } from 'rxjs'; 
import { catchError, switchMap, map } from 'rxjs/operators'; // Import map here
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://localhost:3000/cartitems"; 
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  // Define la propiedad carritoItems si estás almacenando los productos en el cliente (localmente)
  carritoItems: ClCarrito[] = [];

  constructor(private http: HttpClient) { }

  // Método para agregar un nuevo producto al carrito
  addCartItem(cartItem: ClCarrito): Observable<ClCarrito> {
    // Convertir los IDs a string
    const cartItemConIdString = {
      ...cartItem,
      id: cartItem.id ? cartItem.id.toString() : undefined,
      // Si hay otros campos que son números y necesitan conversión, agrégales aquí
    };

    console.log("Res-api Enviando AddCartItem: ", cartItemConIdString);
    
    return this.http.post<ClCarrito>(apiUrl, cartItemConIdString, httpOptions).pipe(
      catchError(this.handleError<ClCarrito>('addCartItem')) // Manejo de errores
    );
  }

  // Método para obtener todos los elementos del carrito
  getCartItems(): Observable<ClCarrito[]> {
    console.log("getCartItems ()");
    return this.http.get<ClCarrito[]>(apiUrl).pipe(
      catchError(this.handleError<ClCarrito[]>('getCartItems', [])) // Manejo de errores
    );
  }

  // Método para obtener un elemento del carrito por ID
  getCartItem(id: number): Observable<ClCarrito> {
    console.log("getCartItem ID:", id); // Log para verificar el ID
    return this.http.get<ClCarrito>(`${apiUrl}/${id}`).pipe(
      catchError(this.handleError<ClCarrito>('getCartItem')) // Manejo de errores
    );
  }

  // Método para eliminar un elemento del carrito
  deleteCartItem(id: number): Observable<ClCarrito> {
    return this.http.delete<ClCarrito>(`${apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError<ClCarrito>('deleteCartItem')) // Manejo de errores
    );
  }

  // Método para actualizar un elemento del carrito
  updateCartItem(id: number, cartItem: ClCarrito): Observable<ClCarrito> {
    const url = `${apiUrl}/${id}`; // Ajusta la URL según sea necesario
    return this.http.put<ClCarrito>(url, cartItem, httpOptions).pipe(
      catchError(this.handleError<ClCarrito>('updateCartItem')) // Manejo de errores
    );
  }

  // Añadir o actualizar el producto en el carrito
  addOrUpdateCartItem(newItem: ClCarrito): Observable<ClCarrito[]> {
    const existingItem = this.carritoItems.find(item => item.idProducto === newItem.idProducto);
  
    if (existingItem) {
      // Actualizar la cantidad
      existingItem.cantidad += newItem.cantidad;
    } else {
      // Si no existe, agregarlo como un nuevo producto
      this.carritoItems.push(newItem);
    }
  
    // Actualizar el subtotal basándose en la cantidad y el precio
    this.carritoItems.forEach(item => {
      item.subtotal = item.precio * item.cantidad; // Recalcular el subtotal
    });
  
    return of(this.carritoItems); // 'of' crea un observable a partir de carritoItems
  }
  

  // Método para manejar errores de la API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`Error en ${operation}:`, error.message);
      return throwError('Error en la API, intenta de nuevo más tarde.');
    };
  }

  // Método para incrementar la cantidad de un elemento en el carrito
  incrementCartItem(id: number): Observable<ClCarrito> {
    return this.getCartItem(id).pipe(
        // Se obtiene el elemento existente y se incrementa la cantidad
        switchMap(cartItem => {
            cartItem.cantidad += 1; // Incrementa la cantidad
            cartItem.subtotal = cartItem.precio * cartItem.cantidad; // Recalcula el subtotal
            return this.updateCartItem(id, cartItem); // Actualiza el elemento en el carrito
        }),
        catchError(this.handleError<ClCarrito>('incrementCartItem'))
    );
  }
  
  // Método para disminuir la cantidad de un elemento en el carrito
  decrementCartItem(id: number): Observable<ClCarrito> {
    return this.getCartItem(id).pipe(
        // Se obtiene el elemento existente y se decrementa la cantidad
        switchMap(cartItem => {
            if (cartItem.cantidad > 1) {
                cartItem.cantidad -= 1; // Decrementa la cantidad solo si es mayor a 1
                cartItem.subtotal = cartItem.precio * cartItem.cantidad; // Recalcula el subtotal
                return this.updateCartItem(id, cartItem); // Actualiza el elemento en el carrito
            } else {
                return this.deleteCartItem(id); // Si la cantidad es 1, lo elimina
            }
        }),
        catchError(this.handleError<ClCarrito>('decrementCartItem'))
    );
  }

  deleteAllCartItems(): Observable<void> {
    return this.getCartItems().pipe(  // First, get all the cart items
      switchMap((cartItems: ClCarrito[]) => { // Ensure the correct type
        const deleteRequests: Observable<void>[] = cartItems.map((item) =>
          this.http.delete<void>(`${apiUrl}/${item.id}`, httpOptions)  // Corrected URL
        );

        if (deleteRequests.length === 0) {
          // If there are no items to delete, return an empty observable
          return of(void 0);
        }

        return forkJoin(deleteRequests).pipe(
          map(() => void 0)  // Map the result to `void`
        );
      }),
      catchError(this.handleError<void>('deleteAllCartItems'))  // Handle errors
    );
  }

  

}
