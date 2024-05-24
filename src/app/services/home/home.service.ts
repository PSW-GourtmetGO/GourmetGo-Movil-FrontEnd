import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://localhost:4500/api/Movil/general'
  constructor(private http:HttpClient) {
   }

  obtenerRestaurantes():Observable<any>{
    return this.http.get(this.url+"/restaurantes")
  }
  obtenerRestaurante(entidad:any):Observable<any>{
    return this.http.post(this.url+"/restaurantes",entidad)
  }
}
