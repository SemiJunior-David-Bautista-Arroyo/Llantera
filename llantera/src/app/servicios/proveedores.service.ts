import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../proveedores/proveedores.modelo';
import { Observable, catchError, tap, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  obtenerProveedores(){
    return this.http.get<Proveedores[]>('http://127.0.0.1:4000/proveedores/get_all')
  }

  new_prov(miprov: Proveedores):Observable<any>{
    const headers = {'Content-Type': 'application/Json'};
    
    return this.http.post<any>('http://127.0.0.1:4000/proveedores/nuevoProv', miprov, {headers})
    .pipe(
      tap((res:any)=>{
        if(res.message == "proveedor insertado"){
          console.log("Servicio", res.message);
        }
      }),
      catchError(err => of(err.error.message))
    )
  }

  eliminar_prov(id:string | null): Observable<any>{
    const apiURL = 'http://127.0.0.1:4000';
    const url = `${apiURL}/proveedores/eliminar/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(err =>{
        console.error('Error eliminando proveedor:', err);
        return of(err);
      })

    )
  }

  obtenerProveporId(id: string): Observable<any> {
    const apiUrl = 'http://127.0.0.1:4000';
    const url = `${apiUrl}/proveedores/porID/${id}`
    return this.http.get<any>(url);
  }

  actualizarprov(provId:string, datos: Proveedores){
    return this.http.put<any>(`http://127.0.0.1:4000/proveedores/actualizar/${provId}`, datos)
      .pipe(
        tap((res: any) => {
          console.log("Proveedor actualizado:", res);  
          alert("Proveedor Actualizado")
        }),
        catchError(err => {
          console.error('Error al actualizar proveedor:', err);
          return of(err);
        })
      ); 
  }

}
