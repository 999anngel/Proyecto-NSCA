import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,map } from 'rxjs';

const apiUrl = 'http://localhost:5000/pagar'; // Reemplaza con tu URL real
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class TransbankService {
  constructor(private http: HttpClient) {}

  getToken(idTransaccion:any){
        return this.http.post<any>(apiUrl, idTransaccion, httpOptions)
        .pipe(map((data:any)=>{
            console.log(data)
            return data}))
  }
}
