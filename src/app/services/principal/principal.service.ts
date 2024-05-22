import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  url = 'http://localhost:4500/api/Movil/login'
  constructor(private http:HttpClient) {
   }

  register(entidad:any):Observable<any>{
    return this.http.post(this.url+"/register",entidad)
  }

  login(entidad:any):Observable<any>{
    return this.http.post(this.url+"/login",entidad)
  }

  olvido(entidad:any):Observable<any>{
    return this.http.post(this.url+"/olvido",entidad)
  }
}
