import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marcas } from '../marcas/marcas.modelo';
import { Observable} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { }

  obtenerMarcas(){
    return this.http.get<Marcas[]>('http://127.0.0.1:4000/marcas/get_all')
  }

  

  new_marca(mimarca: Marcas): Observable<any>{
    const headers = {'Content-Type': 'application/Json'};

    return this.http.post<any>('http://127.0.0.1:4000/marcas/nuevaMarca', mimarca, {headers})
    .pipe(
      tap((res:any)=>{
        if(res.message == "marca insertado"){
          console.log("Servicio", res.message)
        }
      }),
      catchError(err => of(err.error.message))
    )
  }


  eliminar_marca(id:string | null): Observable<any>{
    const apiURL = 'http://127.0.0.1:4000';
    const url = `${apiURL}/marcas/eliminar/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(err =>{
        console.error('Error eliminando la marca:', err);
        return of(err);
      })

    )
  }

  obtenerMarcaporId(id: string): Observable<any> {
    const apiUrl = 'http://127.0.0.1:4000';
    const url = `${apiUrl}/marcas/porID/${id}`
    return this.http.get<any>(url);
  }

  actualizarMarca(marcaId:string, dato: Marcas){
    return this.http.put<any>(`http://127.0.0.1:4000/marcas/actualizar/${marcaId}`, dato)
      .pipe(
        tap((res: any) => {
          console.log("Marca actualizada:", res);  
          alert("Marca Actualizada")
        }),
        catchError(err => {
          console.error('Error al actualizar marca:', err);
          return of(err);
        })
      ); 
  }

}
