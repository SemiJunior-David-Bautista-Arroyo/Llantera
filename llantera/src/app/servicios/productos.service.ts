import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../productos/productos.modelo';
import { Observable} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private ruta: Router) { }

  obtenerProductos(){
    return this.http.get<Productos[]>('http://127.0.0.1:4000/productos/get_all')
  }
  
  new_product(miProd:Productos): Observable<any>{
    const headers = {'Content-Type': 'application/json'};

    return this.http.post<any>('http://127.0.0.1:4000/productos/nuevoProd',miProd,{headers})
    .pipe(
      tap((res:any)=>{
        if (res.message == "producto insertado"){
          console.log("Servicio", res.message)
        }
      }),
      catchError(err => of(err.error.message))
      )
  }

  eliminar_prod(id:string | null): Observable<any>{
    const apiURL = 'http://127.0.0.1:4000';
    const url = `${apiURL}/productos/eliminar/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(err => {
        console.error('Errror eliminando producto:', err);
        return of(err);
      })
    )
  }

  obtenerProductoPorId(id: string): Observable<any> {
    const apiUrl = 'http://127.0.0.1:4000';
    const url = `${apiUrl}/productos/porID/${id}`
    return this.http.get<any>(url);
  }

  actualizarproducto(productId:string, datos: Productos){
    return this.http.put<any>(`http://127.0.0.1:4000/productos/actualizar/${productId}`, datos)
      .pipe(
        tap((res: any) => {
          console.log("Producto actualizado:", res);  
          alert("Producto Actualizado")
        }),
        catchError(err => {
          console.error('Error al actualizar producto:', err);
          return of(err);
        })
      ); 
  }


}
