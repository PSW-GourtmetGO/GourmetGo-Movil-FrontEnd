import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecificoService {

  url = 'http://localhost:4500/api/Movil/especifico'
  constructor(private http: HttpClient) {
  }

  agregarCarrito(entidad:any): Observable<any> {
    return this.http.post(this.url + "/carrito",entidad)
  }
  obtenerCarrito(entidad:any): Observable<any> {
    return this.http.get(this.url + "/carrito?cliente="+entidad)
  }
  actualizarCarrito(entidad:any): Observable<any> {
    return this.http.put(this.url + "/carrito",entidad)
  }
  borrarCarrito(detalle:any): Observable<any> {
    return this.http.put(this.url + "/carritoDel",detalle)
  }

  obtenerHistorial(entidad:any): Observable<any> {
    return this.http.get(this.url + "/historial?cliente="+entidad)
  }
  obtenerEspecifico(entidad:any): Observable<any> {
    return this.http.get(this.url + "/especifico?id="+entidad)
  }
}
