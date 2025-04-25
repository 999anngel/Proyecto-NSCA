import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ClFeedback } from './modelo/ClFeedback'; // Asegúrate de que la ruta sea correcta

// URL de la API
const apiUrl = "http://localhost:3000/feedbacks"; 
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  // Método para obtener la lista de feedback
  getFeedback(): Observable<ClFeedback[]> {
    return this.http.get<ClFeedback[]>(apiUrl, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para agregar un nuevo feedback
  addFeedback(feedback: ClFeedback): Observable<ClFeedback> {
    // Convertir el ID a string
    const feedbackConIdString = {
      ...feedback,
      id: feedback.id !== null && feedback.id !== undefined ? feedback.id.toString() : undefined,
      // Si tienes otros campos que son números y quieres convertirlos, agrégales aquí
    };

    console.log("Enviando feedback:", feedbackConIdString);
    
    return this.http.post<ClFeedback>(apiUrl, feedbackConIdString, httpOptions).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para manejar errores de la API
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error.message);
    return throwError('Error en la API, intenta de nuevo más tarde.');
  }
}
